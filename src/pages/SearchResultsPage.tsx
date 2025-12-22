import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import RecipeCard from "../components/RecipeCard";
import { ScrollSection } from "../components/ScrollSection";
import IngredientSearchBar from "../components/IngredientSearchBar";
import SelectedIngredients from "../components/SelectedIngredients";
import SearchResultsActions from "../components/SearchResultsActions";
import type { IIngredient, IRecipeByIng, IRecipeDetails } from "../types/types";
import { getRecipeInformationUrl, getRecipesByIngredientsUrl } from '../hooks/useApi';
import useModeStore from '../store/useModeStore';
import { useRecipes } from '../contexts/RecipesContext';
import { getMockDataForUrl, simulateNetworkDelay } from '../mock/mockService';
import '../styles/pages/SearchResultsPage.css';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const mode = useModeStore((s) => s.mode);
  const { recipes, searchIngredients, setRecipes, setSearchIngredients } = useRecipes();
  
  // Recupera ingredienti dalla query string (per display)
  const ingredientsFromUrl = searchParams.get('ingredients') ?? searchIngredients;
  const baseIngredients = ingredientsFromUrl
    ? ingredientsFromUrl.split(',').map((item) => item.trim()).filter(Boolean)
    : [];
  
  // Indice ricetta corrente (navigazione tra risultati)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedIng, setSelectedIng] = useState<IIngredient[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Popola i pill iniziali con gli ingredienti della query (removibili)
    // Determina se mostrare il pulsante "Aggiorna ricette"
    const showUpdateBtn = (() => {
      // Selezionati
      const selectedNames = selectedIng.map(ing => ing.name);
      // Ingredienti base dalla ricerca
      if (baseIngredients.length === 0) return false;
      // Se sono stati aggiunti altri ingredienti
      if (selectedNames.length > baseIngredients.length) return true;
      // Se l'ingrediente rimanente è diverso da quello della ricerca
      if (selectedNames.length === 1 && (baseIngredients.length === 1 && selectedNames[0] !== baseIngredients[0])) return true;
      // Se sono stati rimossi ingredienti e la lista è diversa
      if (selectedNames.length !== baseIngredients.length) return true;
      // Se l'ordine o i nomi sono diversi
      if (selectedNames.some((name, i) => name !== baseIngredients[i])) return true;
      return false;
    })();
  useEffect(() => {
    if (selectedIng.length === 0 && baseIngredients.length > 0) {
      setSelectedIng(baseIngredients.map((name, idx) => ({ id: idx, name, image: '' })));
    }
  }, [baseIngredients, selectedIng.length]);

  // Reset index quando cambiano le ricette, ma ripristina se tornando da dettaglio
  useEffect(() => {
    const state = location.state as { preservedIndex?: number } | null;
    if (state?.preservedIndex !== undefined) {
      setCurrentIndex(state.preservedIndex);
      // Pulisci lo state per evitare di ripristinarlo di nuovo
      window.history.replaceState({}, document.title);
    } else {
      setCurrentIndex(0);
    }
  }, [recipes]);

  // Se non ci sono ricette, torna alla home
  useEffect(() => {
    if (recipes.length === 0) {
      navigate('/', { replace: true });
    }
  }, [recipes, navigate]);

  // Click su ricetta: fetch dettagli e naviga a /recipe/:id
  const handleRecipeDetailsClick = async (recipe: IRecipeByIng) => {
    try {
      const url = getRecipeInformationUrl(recipe.id);
      
      let json: IRecipeDetails;
      
      if (mode === 'mock') {
        await simulateNetworkDelay(300);
        json = getMockDataForUrl(url) as IRecipeDetails;
      } else {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        json = (await resp.json()) as IRecipeDetails;
      }
      
      // Naviga a rotta dinamica /recipe/:recipeId, preservando l'indice corrente
      navigate(`/recipe/${recipe.id}`, {
        state: { 
          recipeData: json,
          fromResults: true,
          currentIndex: currentIndex
        }
      });
    } catch (e) {
      console.error('Errore dettagli ricetta:', e);
    }
  };

  // Torna alla homepage
  const goToHomepage = () => {
    navigate('/');
  };

  const handleSuggestClick = (ing: IIngredient) => {
    if (selectedIng.some(item => item.id === ing.id)) return;
    setSelectedIng(prev => [...prev, ing]);
  };

  const handleBadgeRemove = (ing: IIngredient) => {
    setSelectedIng(prev => {
      const updated = prev.filter(item => item.id !== ing.id);
      if (updated.length === 0) {
        navigate('/', { replace: true });
      }
      return updated;
    });
  };

  const getActiveIngredients = (): IIngredient[] => {
    if (selectedIng.length > 0) return selectedIng;
    return baseIngredients.map((name, idx) => ({ id: idx, name, image: '' }));
  };

  const handleSearchClick = async () => {
    const ingredientsList = getActiveIngredients();
    if (ingredientsList.length === 0) {
      goToHomepage();
      return;
    }

    setIsRefreshing(true);

    try {
      const url = getRecipesByIngredientsUrl(ingredientsList, { ranking: 1, ignorePantry: true });
      let json: IRecipeByIng[];

      if (mode === 'mock') {
        await simulateNetworkDelay(300);
        json = getMockDataForUrl(url) as IRecipeByIng[];
      } else {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        json = (await resp.json()) as IRecipeByIng[];
      }

      if (Array.isArray(json) && json.length > 0) {
        const ingredientNames = ingredientsList.map(ing => ing.name).join(',');
        setRecipes(json);
        setSearchIngredients(ingredientNames);
        setCurrentIndex(0);
        navigate(`/results?ingredients=${encodeURIComponent(ingredientNames)}`);
        setSelectedIng(ingredientsList);
      }
    } catch (e) {
      console.error('Errore aggiornamento ricette:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSetCurrentIndex = (index: number) => {
    setCurrentIndex(index);
  };

  if (recipes.length === 0) {
    return null; // Verrà fatto redirect dalla useEffect
  }

  return (
    <main className="search-results" id="recipe-card-container">
      <section className="search-results__search-panel">
        <div className="search-results__searchbar">
          <IngredientSearchBar handleSuggestClick={handleSuggestClick} />
        </div>

        <SelectedIngredients 
          ingredients={selectedIng} 
          handleRemove={handleBadgeRemove}
        />

        <SearchResultsActions
          showUpdate={showUpdateBtn}
          isRefreshing={isRefreshing}
          onUpdate={handleSearchClick}
          onNewSearch={goToHomepage}
        />
      </section>

      <section className="search-results__card">
        <RecipeCard 
          recipe={recipes[currentIndex]} 
          onClickDetails={handleRecipeDetailsClick} 
        />
      </section>

      <div className="search-results__navigation">
        <ScrollSection
          currentIndex={currentIndex} 
          maxIndex={recipes.length - 1} 
          setCurrentIndex={handleSetCurrentIndex}
        />
      </div>
    </main>
  );
}

export default SearchResultsPage;
