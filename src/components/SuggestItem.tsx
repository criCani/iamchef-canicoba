import type { IIngredient } from "../types/types";
import '../styles/SuggestItem.css';

type SuggestItemProps = {
  ingredient: IIngredient;
  handleClick: (ing: IIngredient) => void;
};

// Singolo suggerimento cliccabile: nessuna logica interna per semplicità / riusabilità.
const SuggestItem = ({ ingredient, handleClick }: SuggestItemProps) => {
  return (
    <div
      onClick={() => handleClick(ingredient)}
      className="suggest-item"
    >
      <span className="suggest-item__icon">🧂</span>
      <span className="suggest-item__name">{ingredient.name}</span>
    </div>
  );
};

export default SuggestItem;