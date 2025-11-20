import type { IIngredient } from "../types/types"
import IngredientPill from "./IngredientPill"

type SelectedListProps = {
    ingredients: IIngredient[],
    handleRemove: (ing: IIngredient) => void
}

const SelectedList = ({ ingredients, handleRemove }: SelectedListProps) => {
  return (
    <div>
    {ingredients.map((ingredient, index) => (
        <IngredientPill 
            key={index.toString()}
            id={index.toString()}
            ingredient={ingredient} 
            handleRemove={handleRemove} />
    ))}
    </div>

  )
}

export default SelectedList