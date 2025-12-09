import type { IIngredient } from "../types/types";
import SelectedItem from "./SelectedItem";
import '../styles/SelectedList.css';

type SelectedListProps = {
  ingredients: IIngredient[];
  handleRemove: (ing: IIngredient) => void;
};

const SelectedList = ({ ingredients, handleRemove }: SelectedListProps) => {
  if (ingredients.length === 0) return null;

  return (
    <div className="selected-list">
      <h3 className="selected-list__title">
        <span className="selected-list__icon">🧂</span>
        Ingredienti Selezionati ({ingredients.length})
      </h3>
      <div className="selected-list__items">
        {ingredients.map((ingredient, index) => (
          <SelectedItem 
            key={index.toString()}
            id={index.toString()} 
            ingredient={ingredient} 
            handleRemove={handleRemove} 
          />
        ))}
      </div>
    </div>
  );
};

export default SelectedList;