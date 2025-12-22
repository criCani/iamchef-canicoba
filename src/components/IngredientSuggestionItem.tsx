import type { IIngredient } from "../types/types";
import '../styles/components/IngredientSuggestionItem.css';
import IconifyIcon from '../utils/IconifyIcon';

type IngredientSuggestionItemProps = {
  ingredient: IIngredient;
  handleClick: (ing: IIngredient) => void;
};

const IngredientSuggestionItem = ({ ingredient, handleClick }: IngredientSuggestionItemProps) => {
  return (
    <button
      type="button"
      onClick={() => handleClick(ingredient)}
      className="suggest-item"
      aria-label={`Aggiungi ${ingredient.name}`}
    >
      <span className="suggest-item__icon" aria-hidden="true">
        <IconifyIcon icon="mdi:salt" aria-hidden={true} />
      </span>
      <span className="suggest-item__name">{ingredient.name}</span>
    </button>
  );
};

export default IngredientSuggestionItem;