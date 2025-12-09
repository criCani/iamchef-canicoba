import type { IIngredient } from "../types/types";
import '../styles/SelectedItem.css';

type SelectedIngredientProps = {
  id: string;
  ingredient: IIngredient;
  handleRemove: (ing: IIngredient) => void;
};

// Chip ingrediente selezionato: offre rimozione immediata (UX rapida nella composizione).
const SelectedIngredient = ({ id, ingredient, handleRemove }: SelectedIngredientProps) => {
  return (
    <span id={id} className="selected-item">
      <span className="selected-item__name">{ingredient.name}</span>
      <button
        onClick={() => handleRemove(ingredient)}
        className="selected-item__remove-btn"
        aria-label={`Rimuovi ${ingredient.name}`}
      >
        ✕
      </button>
    </span>
  );
};

export default SelectedIngredient;
