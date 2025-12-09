import { useEffect, useState } from "react";
import { type IIngredient } from "../types/types";
import SuggestList from "./SuggestList";
import { useDebounce } from "../hooks/useDebounce";
import { getIngredientsUrl, useApi } from "../hooks/useApi";
import '../styles/Searchbar.css';

// Componente di ricerca ingredienti con debounce lato client per ridurre chiamate API.
type SearchbarProps = {
  handleSuggestClick: (ing: IIngredient) => void;
};

const SearchBar = ({ handleSuggestClick }: SearchbarProps) => {
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
    <>
      <div className="searchbar">
        <div className="searchbar__icon">🔍</div>
        <div className="searchbar__input-wrapper"> 
          <input
            type="text"
            name="search-bar"
            id="search-bar"
            placeholder="Cerca ingredienti..."
            className="searchbar__input"
            value={searchingIng}
            onChange={(e) => setSearchingIng(e.target.value)}
          />
        </div>
        {filteredIngredients && searchingIng  && (
          <SuggestList
            ingredients={filteredIngredients}
            handleClick={handleClick}
          />
        )}
      </div>

      {error && <p className="searchbar__error">Errore: {error}</p>}
      {loading && <p className="searchbar__loading">Caricamento...</p>}
    </>
  );
};

export default SearchBar;
