import { useEffect, useState } from 'react';
import type { IIngredient } from '../types/types';
import './SearchBar.css';
import { useDebounce } from '../hooks/useDebounce';
import { getIngredientsUrl, useApi } from '../hooks/useApi';
import SuggestionsList from './SuggestionsList';

interface SearchBarProps {
  handleSuggestClick: (ing: IIngredient) => void;
}

const SearchBar = ({ handleSuggestClick }: SearchBarProps) => {
  // Stato che contiene il testo scritto dall’utente nella searchbar
  const [searchTermIng, setSearchTermIng] = useState<string>("");

  // API - start
  const [stateURL, setStateURL] = useState<string>("");
  const debouncedSearchingIng = useDebounce(searchTermIng, 300);

  const { data: filteredIngredients, loading, error } = useApi<IIngredient[]>(stateURL);
  
  useEffect(() => {
    // Se c'è del testo da cercare
    if (debouncedSearchingIng) {
      // Fai la chiamata API solo ora (dopo 300ms di pausa nella digitazione)
      // TODO: Inserire il filtro degli ingredienti
      setStateURL(getIngredientsUrl(debouncedSearchingIng));
    }
  }, [debouncedSearchingIng])
  // API - end

  const handleClick = (ing: IIngredient) => {
    handleSuggestClick(ing);
    setSearchTermIng("");
  };

  return (
    <div className="search-container">
      <div>
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          placeholder="Search ingredients..."
          className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder:text-gray-400"
          value={searchTermIng}
          onChange={(e) => setSearchTermIng(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 mt-2">Errore: {error}</p>}

      {/* Messaggio di caricamento mentre aspetto la risposta */}
      {loading && <p>Caricamento...</p>}
      
      {/* Se l’utente sta digitando, mostro i suggerimenti filtrati */}
      {filteredIngredients && (
        <SuggestionsList
          ingredients={filteredIngredients}
          handleClick={handleClick}
        />
      )}
    </div>
  );
};

export default SearchBar;