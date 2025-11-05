interface IngredientListProps {
  suggestions: string[];
  onSelect: (ingredient: string) => void;
}

const IngredientList = ({ suggestions, onSelect }: IngredientListProps) => {
  return (
    <div>
      {suggestions.map((ingredient, index) => (
        <div key={index} onClick={() => onSelect(ingredient)}>
          {ingredient}
        </div>
      ))}
    </div>
  );
};

export default IngredientList;