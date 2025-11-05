import './IngredientList.css';

interface IngredientListProps {
  suggestions: string[];
  onSelect: (ingredient: string) => void;
}

const IngredientList = ({ suggestions, onSelect }: IngredientListProps) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="ingredient-list">
      {suggestions.map((ingredient, index) => (
        <div
          key={index}
          className="ingredient-item"
          onClick={() => onSelect(ingredient)}
        >
          {ingredient}
        </div>
      ))}
    </div>
  );
};

export default IngredientList;
