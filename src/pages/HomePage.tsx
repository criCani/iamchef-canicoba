import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { IIngredient, IRecipeByIng } from "../types/types";
import IngredientSearchBar from "../components/IngredientSearchBar";
import SelectedIngredients from "../components/SelectedIngredients";
import DiscoverRecipesButton from "../components/DiscoverRecipesButton";
import { getRecipesByIngredientsUrl } from '../hooks/useApi';
import useModeStore from '../store/useModeStore';
import { useRecipes } from '../contexts/RecipesContext';
import { getMockDataForUrl, simulateNetworkDelay } from '../mock/mockService';
import '../styles/pages/HomePage.css';
import IconifyIcon from '../utils/IconifyIcon';

const HomePage = () => {
  const navigate = useNavigate();
  const mode = useModeStore((s) => s.mode);
  const { setRecipes, setSearchIngredients } = useRecipes();
  
  // Ingredienti selezionati dall'utente
  const [selectedIng, setSelectedIng] = useState<IIngredient[]>([]);
  // Stato loading per bottone discover
  const [isDiscover, setIsDiscover] = useState<boolean>(false);

  // Aggiunge ingrediente evitando duplicati
  const handleSuggestClick = (ing: IIngredient) => {
    if (selectedIng.some(item => item.id === ing.id)) {
      return;
    }
    setSelectedIng(prev => [...prev, ing]);
  };

  // Rimuove ingrediente selezionato
  const handleBadgeRemove = (ing: IIngredient) => {
    setSelectedIng(prev => prev.filter(item => item.id !== ing.id));
  };

  // Ricerca ricette e naviga a /results con query string
  const handleSearchClick = async () => {
    setIsDiscover(true);

    try {
      const url = getRecipesByIngredientsUrl(selectedIng, { ranking: 1, ignorePantry: true });
      
      let json: IRecipeByIng[];
      
      if (mode === 'mock') {
        // Modalità mock: usa dati simulati
        await simulateNetworkDelay(300);
        json = getMockDataForUrl(url) as IRecipeByIng[];
      } else {
        // Modalità API: chiamata reale
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        json = (await resp.json()) as IRecipeByIng[];
      }
      
      if (Array.isArray(json) && json.length > 0) {
        // Salva ricette nel context (persistono durante navigazione)
        const ingredientNames = selectedIng.map(ing => ing.name).join(',');
        setRecipes(json);
        setSearchIngredients(ingredientNames);
        
        // Naviga a /results con query string
        navigate(`/results?ingredients=${encodeURIComponent(ingredientNames)}`);
      } else {
        console.warn('Nessun risultato trovato per gli ingredienti selezionati');
      }
    } catch (e) {
      console.error('Errore chiamata ricette per ingredienti:', e);
    } finally {
      setIsDiscover(false);
    }
  };

  return (
    <div className="home-page">
      <section className="home-page__hero">
        <span className="home-page__hero-icon"><IconifyIcon icon="mdi:pot" width="2.75em" height="2.75em" aria-hidden={true} /></span>
        <h1 className="home-page__title">
          Quali ingredienti abbiamo a disposizione?
        </h1>
        <p className="home-page__subtitle">Cerca, aggiungi e avvia subito la scoperta di ricette.</p>
      </section>
      
      <section className="home-page__search-card">
        <div className="home-page__searchbar"> 
          <IngredientSearchBar handleSuggestClick={handleSuggestClick} />
        </div>

        <SelectedIngredients 
          ingredients={selectedIng} 
          handleRemove={handleBadgeRemove} 
        />

        {selectedIng.length === 0 && (
          <div className="home-page__empty-state">
            <span className="home-page__empty-icon" aria-hidden="true"><IconifyIcon icon="mdi:silverware-fork-knife" width="2.75em" height="2.75em" aria-hidden={true} /></span>
            <p className="home-page__helper">Aggiungi almeno un ingrediente per sbloccare il tasto ricerca.</p>
          </div>
        )}
      </section>

      {selectedIng.length > 0 && (
        <div className="home-page__floating-cta">
          <DiscoverRecipesButton 
            ingredients={selectedIng} 
            onSearchClick={handleSearchClick} 
            isDiscover={isDiscover}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;