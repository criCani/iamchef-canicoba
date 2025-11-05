import './IngredientPill.css';

interface IngredientPillProps {
  ingredient: string;
  onRemove: (ingredient: string) => void;
}

const IngredientPill = ({ ingredient, onRemove }: IngredientPillProps) => {
  return (
    <span className="ingredient-pill">
      {ingredient}
      <button onClick={() => onRemove(ingredient)}>x</button>
    </span>
  );
};

export default IngredientPill;