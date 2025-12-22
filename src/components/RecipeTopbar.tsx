import '../styles/components/RecipeTopbar.css';
import IconifyIcon from '../utils/IconifyIcon';

type RecipeTopbarProps = {
  onBack: () => void;
  onNewSearch: () => void;
};

export const RecipeTopbar = ({ onBack, onNewSearch }: RecipeTopbarProps) => {
  return (
    <div className="full-recipe__topbar">
      <button
        type="button"
        onClick={onBack}
        className="full-recipe__action-btn full-recipe__action-btn--back"
        title="Torna indietro"
      >
        <span className="full-recipe__action-icon"><IconifyIcon icon="mdi:arrow-left" width="1.3em" height="1.3em" aria-hidden={true} /></span>
        <span className="full-recipe__action-text">Indietro</span>
      </button>
      <button
        type="button"
        onClick={onNewSearch}
        className="full-recipe__action-btn full-recipe__action-btn--search"
        title="Nuova ricerca"
      >
        <span className="full-recipe__action-icon"><IconifyIcon icon="mdi:magnify" width="1.3em" height="1.3em" aria-hidden={true} /></span>
        <span className="full-recipe__action-text">Nuova Ricerca</span>
      </button>
    </div>
  );
};

export default RecipeTopbar;
