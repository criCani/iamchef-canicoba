import type { IIngredient } from "../types/types";
import SuggestItem from "./SuggestItem";
import '../styles/SuggestList.css';

type SuggestListProps = {
  ingredients: IIngredient[];
  handleClick: (ing: IIngredient) => void;
};

// Lista suggerimenti: delega il click al parent senza gestire stato interno.
const SuggestList = ({ ingredients, handleClick }: SuggestListProps) => {
  return (
    <div className="suggest-list">
      {ingredients.map((ingredient) => (
        <SuggestItem key={ingredient.name} ingredient={ingredient} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default SuggestList;