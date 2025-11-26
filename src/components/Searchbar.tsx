import { useEffect, useState } from "react";
import { type IIngredient } from "../types/types";
import SuggestList from "./SuggestList";
import { useDebounce } from "../hooks/useDebounce";
import { getIngredientsUrl, useApi } from "../hooks/useApi";
import '../styles/Searchbar.css';

// Componente di ricerca ingredienti con debounce lato client per ridurre chiamate API.
type SearchbarProps = {
  handleSuggestClick: (ing: IIngredient) => void
}
const SearchBar = ({ handleSuggestClick }: SearchbarProps) => {
  // Stato focus usato solo per effetti visivi (non influenza la logica di ricerca)
  const [isFocused, setIsFocused] = useState(false);
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
  }, [debouncedSearchingIng]) // Dipende da debouncedQuery, non da query!

  // Selezione di un ingrediente: passa al parent e resetta input per feedback immediato.
  const handleClick = (ing: IIngredient) => {
    handleSuggestClick(ing);
    setSearchingIng("");
  };

  // JSX del componente: barra di ricerca + suggerimenti condizionali
  return (
    <>
      <div className="searchbar-wrapper">
        <div className={`searchbar-focus-effect ${isFocused ? 'focused' : 'unfocused'}`} />
        <div className={`searchbar-container ${isFocused ? 'focused' : ''}`}>
          <input
            type="text"
            name="search-bar"
            id="search-bar"
            placeholder="Search ingredients"
            className="searchbar-input"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={searchingIng}
            onChange={(e) => setSearchingIng(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="searchbar-error">Error: {error}</p>}
      {loading && <p>Loading...</p>}
      
      {filteredIngredients && searchingIng  && (
        <SuggestList
          ingredients={filteredIngredients}
          handleClick={handleClick}
        />
      )}
    </>
  );
};

export default SearchBar;
