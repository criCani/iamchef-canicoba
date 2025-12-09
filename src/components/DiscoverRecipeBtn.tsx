import type { IIngredient } from "../types/types";
import '../styles/DiscoverRecipeBtn.css';

type DiscoverRecipeBtnProps = {
  ingredients: IIngredient[];
  onSearchClick: () => void;
  isDiscover: boolean;
};

const DiscoverRecipeBtn = ({ ingredients, onSearchClick, isDiscover }: DiscoverRecipeBtnProps) => {
  return (
    <button 
      className="discover-btn"
      onClick={onSearchClick}
      tabIndex={ingredients && ingredients.length > 0 ? 0 : -1}
      aria-hidden={!(ingredients && ingredients.length > 0)}
      disabled={isDiscover}
    >
      {isDiscover ? (
        <span className="discover-btn__spinner">⏳</span>
      ) : (
        <>
          <span className="discover-btn__icon">🔍</span>
          <span className="discover-btn__text">Scopri Ricette</span>
        </>
      )}
    </button>
  );
};

export default DiscoverRecipeBtn;