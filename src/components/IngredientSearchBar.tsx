import { useEffect, useState } from "react";
import { type IIngredient } from "../types/types";
import IngredientSuggestions from "./IngredientSuggestions";
import { useDebounce } from "../hooks/useDebounce";
import { getIngredientsUrl, useApi } from "../hooks/useApi";
import '../styles/components/IngredientSearchBar.css';
import IconifyIcon from '../utils/IconifyIcon';

type IngredientSearchBarProps = {
  handleSuggestClick: (ing: IIngredient) => void;
};

const IngredientSearchBar = ({ handleSuggestClick }: IngredientSearchBarProps) => {
  // Stato focus usato solo per effetti visivi (non influenza la logica di ricerca)
  // ...existing code...
  // Testo corrente digitato dall'utente
  const [searchingIng, setSearchingIng] = useState<string>("");
  const [stateURL, setStateURL] = useState<string>("");
  const debouncedSearchingIng = useDebounce(searchingIng, 300);

  const { data: filteredIngredients, loading, error } = useApi<IIngredient[]>(stateURL);
  
  // Effetto attivato solo al termine della digitazione (debounced) per evitare spam richieste.
  useEffect(() => {
    if (debouncedSearchingIng) {
      setStateURL(getIngredientsUrl(debouncedSearchingIng));
    }
  }, [debouncedSearchingIng]); // Dipende da debouncedQuery, non da query!

  // Selezione di un ingrediente: passa al parent e resetta input per feedback immediato.
  const handleClick = (ing: IIngredient) => {
    handleSuggestClick(ing);
    setSearchingIng("");
  };

  // JSX del componente: barra di ricerca + suggerimenti condizionali
  return (
    <div className="searchbar-wrapper">
      <div className="searchbar">
        <div className="searchbar__icon"><IconifyIcon icon="mdi:magnify" width="1.3em" height="1.3em" aria-hidden={true} /></div>
        <div className="searchbar__input-wrapper"> 
          <input
            type="text"
            name="search-bar"
            id="search-bar"
            placeholder="Cerca ingredienti..."
            className="searchbar__input"
            value={searchingIng}
            onChange={(e) => setSearchingIng(e.target.value)}
            aria-label="Cerca ingredienti"
            aria-describedby={error ? "search-error" : loading ? "search-loading" : undefined}
          />
        </div>
        {filteredIngredients && searchingIng  && (
          <IngredientSuggestions
            ingredients={filteredIngredients}
            handleClick={handleClick}
          />
        )}
      </div>

      {error && <p id="search-error" className="searchbar__error" role="alert">⚠️ Errore: {error}</p>}
      {loading && <p id="search-loading" className="searchbar__loading" aria-live="polite">⏳ Caricamento...</p>}
    </div>
  );
};

export default IngredientSearchBar;
