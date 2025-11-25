import type { IIngredient } from "../types/types"
import '../styles/DiscoverRecipeBtn.css';

type DiscoverRecipeBtnProps = {
    ingredients: IIngredient[],
    onSearchClick: () => void
    isDiscover: boolean
}

const DiscoverRecipeBtn = ({ ingredients, onSearchClick, isDiscover }: DiscoverRecipeBtnProps) => {
  if (!ingredients || ingredients.length == 0) {
    return null
  }

  return (
    <button 
      className={`discover-recipe-btn ${isDiscover ? "active" : "inactive"}`}
      onClick={onSearchClick}
    >
        {isDiscover ? "..." : "🔍"}
    </button>
  )
}

export default DiscoverRecipeBtn