import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import RecipeCard from "../components/RecipeCard";
import { ScrollBtnSection } from "../components/ScrollBtnSection";
import SearchBar from "../components/Searchbar";
import SelectedList from "../components/SelectedList";
import type { IIngredient, IRecipeByIng, IRecipeDetails } from "../types/types";
import { getRecipeInformationUrl, getRecipesByIngredientsUrl } from '../hooks/useApi';
import useModeStore from '../store/useModeStore';
import { useRecipes } from '../contexts/RecipesContext';
import { getMockDataForUrl, simulateNetworkDelay } from '../mock/mockService';
import '../styles/SearchResults.css';

/**
 * SearchResults - Pagina risultati ricerca ricette
 * 
 * Utilizzo React Router:
 * - useSearchParams: legge ingredienti dalla query string (?ingredients=tomato,cheese)
 * - useNavigate: navigazione verso dettaglio ricetta con parametro dinamico
 * 
 * Utilizzo Context:
 * - RecipesContext: recupera ricette salvate dal context (persistono durante navigazione)
 * 
 * Query String:
 * - ingredients: lista ingredienti separati da virgola (visibile nella URL)
 * 
 * Flusso:
 * 1. Recupera ricette dal context
 * 2. Mostra query string con ingredienti cercati
 * 3. Permette scroll tra ricette (currentIndex come state locale)
 * 4. Click su ricetta → fetch dettagli → navigate a /recipe/:id
 */

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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

  // Reset index quando cambiano le ricette
  useEffect(() => {
    setCurrentIndex(0);
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
      
      // Naviga a rotta dinamica /recipe/:recipeId
      navigate(`/recipe/${recipe.id}`, {
        state: { 
          recipeData: json,
          fromResults: true
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
    setSelectedIng(prev => prev.filter(item => item.id !== ing.id));
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
        setSelectedIng([]);
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
      <section className="search-results__hero">
        <div className="search-results__pill">🍴 {recipes.length} ricette</div>
        <p className="search-results__subtitle">Per {ingredientsFromUrl || 'gli ingredienti scelti'}</p>
        {baseIngredients.length > 0 && (
          <div className="search-results__chips">
            {baseIngredients.map((item, idx) => (
              <span key={idx} className="search-results__chip">{item}</span>
            ))}
          </div>
        )}
      </section>

      <section className="search-results__search-panel">
        <div className="search-results__searchbar">
          <SearchBar handleSuggestClick={handleSuggestClick} />
        </div>

        <SelectedList 
          ingredients={selectedIng} 
          handleRemove={handleBadgeRemove}
        />

        <div className="search-results__actions">
          <button 
            className="search-results__action-btn search-results__action-btn--primary"
            onClick={handleSearchClick}
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Aggiorno...' : 'Aggiorna ricette'}
          </button>
          <button 
            className="search-results__action-btn search-results__action-btn--ghost"
            onClick={goToHomepage}
            type="button"
          >
            Nuova ricerca
          </button>
        </div>
      </section>

      <section className="search-results__card">
        <div className="search-results__status">
          <span className="search-results__index">{currentIndex + 1}/{recipes.length}</span>
          <div className="search-results__dots" aria-label="Seleziona ricetta">
            {recipes.map((_, idx) => (
              <button
                key={idx}
                className={`search-results__dot ${idx === currentIndex ? 'search-results__dot--active' : ''}`}
                onClick={() => handleSetCurrentIndex(idx)}
                aria-label={`Vai alla ricetta ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <RecipeCard 
          recipe={recipes[currentIndex]} 
          onClickDetails={handleRecipeDetailsClick} 
        />
      </section>

      <div className="search-results__navigation">
        <ScrollBtnSection
          currentIndex={currentIndex} 
          maxIndex={recipes.length - 1} 
          setCurrentIndex={handleSetCurrentIndex}
          goToHomepage={goToHomepage}
        />
      </div>
    </main>
  );
}

export default SearchResults;
