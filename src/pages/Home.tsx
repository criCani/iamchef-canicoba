import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { IIngredient, IRecipeByIng } from "../types/types";
import SearchBar from "../components/Searchbar";
import SelectedList from "../components/SelectedList";
import DiscoverRecipeBtn from "../components/DiscoverRecipeBtn";
import { getRecipesByIngredientsUrl } from '../hooks/useApi';
import useModeStore from '../store/useModeStore';
import { useRecipes } from '../contexts/RecipesContext';
import { getMockDataForUrl, simulateNetworkDelay } from '../mock/mockService';
import '../styles/Home.css';

/**
 * Home Page - Selezione ingredienti e ricerca ricette
 * 
 * Utilizzo React Router:
 * - useNavigate: navigazione programmatica verso /results con query string
 * - Query String: passa ingredienti selezionati nella URL come parametri
 * 
 * Utilizzo Context:
 * - RecipesContext: salva ricette nel context per mantenerle durante navigazione
 * 
 * Flusso:
 * 1. Utente seleziona ingredienti
 * 2. Clicca "Discover Recipes"
 * 3. Fetch ricette da API/Mock
 * 4. Salva ricette nel context
 * 5. Navigate a /results?ingredients=tomato,cheese
 */

const Home = () => {
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
      <div className="home-page__hero">
        <span className="home-page__hero-icon">🥘</span>
        <h1 className="home-page__title">
          Quali ingredienti abbiamo a disposizione?
        </h1>
      </div>
      
      <div className="home-page__search-section">
        <div className="home-page__searchbar"> 
          <SearchBar handleSuggestClick={handleSuggestClick} />
        </div>
        {selectedIng.length > 0 && (
          <DiscoverRecipeBtn 
            ingredients={selectedIng} 
            onSearchClick={handleSearchClick} 
            isDiscover={isDiscover}
          />
        )}
      </div>

      <SelectedList 
        ingredients={selectedIng} 
        handleRemove={handleBadgeRemove} 
      />
    </div>
  );
};

export default Home;