import type { IIngredient } from "../types/types";
import '../styles/SelectedItem.css';

type SelectedIngredientProps = {
  id: string,
  ingredient: IIngredient,
  handleRemove: (ing: IIngredient) => void
}

// Chip ingrediente selezionato: offre rimozione immediata (UX rapida nella composizione).
const SelectedIngredient = ({ id, ingredient, handleRemove }: SelectedIngredientProps) => {
    return (
        <span id={id} className="selected-item">
          {ingredient.name}

          <button
            onClick={() => handleRemove(ingredient)}
            className="selected-item-button"
            aria-label={`Rimuovi ${ingredient}`}
          >
            ✕
          </button>

        </span>
    );
};

export default SelectedIngredient;
