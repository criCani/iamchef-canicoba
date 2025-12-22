import type { IIngredient } from "../types/types";
import IngredientSuggestionItem from "./IngredientSuggestionItem";
import '../styles/components/IngredientSuggestions.css';

type IngredientSuggestionsProps = {
  ingredients: IIngredient[];
  handleClick: (ing: IIngredient) => void;
};

const IngredientSuggestions = ({ ingredients, handleClick }: IngredientSuggestionsProps) => {
  return (
    <div className="suggest-list">
      {ingredients.map((ingredient) => (
        <IngredientSuggestionItem key={ingredient.name} ingredient={ingredient} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default IngredientSuggestions;