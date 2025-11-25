import type { IIngredient } from "../types/types"
import '../styles/SelectedItem.css';

type SuggestItemProps = {
  ingredient: IIngredient,
  handleClick: (ing: IIngredient) => void
}

// Singolo suggerimento cliccabile: nessuna logica interna per semplicità / riusabilità.
const SuggestItem = ({ ingredient, handleClick }: SuggestItemProps) => {
  return (
    <div
      onClick={() => handleClick(ingredient)} 
      className="suggest-item">
        <h1>{ingredient.name}</h1>
    </div>
  )
}

export default SuggestItem