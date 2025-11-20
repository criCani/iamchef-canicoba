import type { IIngredient } from "../types/types"

type SuggestionsItemProps ={
    ingredient: IIngredient,
    handleClick: (ing: IIngredient) => void
}

const SuggestionsItem = ({ ingredient, handleClick }: SuggestionsItemProps) => {
  return (
    <div
      onClick={() => handleClick(ingredient)}>
        <h1>{ingredient.name}</h1>
    </div>
  )
}

export default SuggestionsItem;