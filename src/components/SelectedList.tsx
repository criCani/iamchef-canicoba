import type { IIngredient } from "../types/types"
import SelectedItem from "./SelectedItem"
import '../styles/SelectedItem.css';

type SelectedListProps = {
    ingredients: IIngredient[],
    handleRemove: (ing: IIngredient) => void
}

const SelectedList = ({ ingredients, handleRemove }: SelectedListProps) => {
  return (
    <div className="selected-list">
    {ingredients.map((ingredient, index) => (
        <SelectedItem 
            key={index.toString()}
            id={index.toString()} 
            ingredient={ingredient} 
            handleRemove={handleRemove} />
    ))}
    </div>

  )
}

export default SelectedList