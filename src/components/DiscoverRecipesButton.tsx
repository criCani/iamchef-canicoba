import type { IIngredient } from "../types/types";
import '../styles/components/DiscoverRecipesButton.css';
import IconifyIcon from '../utils/IconifyIcon';

type DiscoverRecipesButtonProps = {
  ingredients: IIngredient[];
  onSearchClick: () => void;
  isDiscover: boolean;
};

const DiscoverRecipesButton = ({ ingredients, onSearchClick, isDiscover }: DiscoverRecipesButtonProps) => {
  return (
    <button 
      className="discover-btn"
      onClick={onSearchClick}
      tabIndex={ingredients && ingredients.length > 0 ? 0 : -1}
      aria-hidden={!(ingredients && ingredients.length > 0)}
      disabled={isDiscover}
    >
      {isDiscover ? (
        <span className="discover-btn__spinner">
          <IconifyIcon icon="mdi:loading" width="1.3em" height="1.3em" aria-hidden={true} />
        </span>
      ) : (
        <>
          <span className="discover-btn__icon">
            <IconifyIcon icon="mdi:magnify" width="1.3em" height="1.3em" aria-hidden={true} />
          </span>
          <span className="discover-btn__text">Scopri Ricette</span>
        </>
      )}
    </button>
  );
};

export default DiscoverRecipesButton;