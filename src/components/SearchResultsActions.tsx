import '../styles/components/SearchResultsActions.css';

type Props = {
  showUpdate: boolean;
  isRefreshing: boolean;
  onUpdate: () => void;
  onNewSearch: () => void;
};

export const SearchResultsActions = ({ showUpdate, isRefreshing, onUpdate, onNewSearch }: Props) => {
  return (
    <div className={`search-results__actions${showUpdate ? '' : ' search-results__actions--single'}`}>
      {showUpdate && (
        <button 
          className="search-results__action-btn search-results__action-btn--primary"
          onClick={onUpdate}
          disabled={isRefreshing}
        >
          {isRefreshing ? 'Aggiorno...' : 'Aggiorna ricette'}
        </button>
      )}
      <button 
        className="search-results__action-btn search-results__action-btn--ghost"
        onClick={onNewSearch}
        type="button"
      >
        Nuova ricerca
      </button>
    </div>
  );
};

export default SearchResultsActions;
