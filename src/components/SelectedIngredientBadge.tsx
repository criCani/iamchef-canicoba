import type { IIngredient } from "../types/types";
import '../styles/components/SelectedIngredientBadge.css';

type SelectedIngredientBadgeProps = {
  id: string;
  ingredient: IIngredient;
  handleRemove: (ing: IIngredient) => void;
};

const SelectedIngredientBadge = ({ id, ingredient, handleRemove }: SelectedIngredientBadgeProps) => {
  return (
    <span
      id={id}
      className="selected-item"
      onClick={() => handleRemove(ingredient)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleRemove(ingredient);
        }
      }}
      aria-label={`Rimuovi ${ingredient.name}`}
    >
      <span className="selected-item__name">{ingredient.name}</span>
    </span>
  );
};

export default SelectedIngredientBadge;
