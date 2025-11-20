import type { IIngredient } from '../types/types';
import './IngredientPill.css';

interface IngredientPillProps {
  id: string,
  ingredient: IIngredient,
  handleRemove: (ing: IIngredient) => void
}

const IngredientPill = ({ id, ingredient, handleRemove }: IngredientPillProps) => {
  return (
    <span
      id={id}>
      {ingredient.name}
      
      <button
        onClick={() => handleRemove(ingredient)}>
        <p>X</p>
      </button>
    </span>
  );
};

export default IngredientPill;