import type { IIngredient } from "../types/types";
import SelectedIngredientBadge from "./SelectedIngredientBadge";
import '../styles/components/SelectedIngredients.css';
import IconifyIcon from '../utils/IconifyIcon';

type SelectedIngredientsProps = {
  ingredients: IIngredient[];
  handleRemove: (ing: IIngredient) => void;
};

const SelectedIngredients = ({ ingredients, handleRemove }: SelectedIngredientsProps) => {
  if (ingredients.length === 0) return null;

  return (
    <div className="selected-list">
      <h3 className="selected-list__title">
        <span className="selected-list__icon">
          <IconifyIcon icon="mdi:playlist-check" width="1.3em" height="1.3em" aria-hidden={true} />
        </span>
        <span className="selected-list__title-text">Ingredienti Selezionati</span>
        <span
          className="selected-list__count"
          aria-label={`${ingredients.length} ingredienti selezionati`}
        >
          {ingredients.length}
        </span>
      </h3>
      <div className="selected-list__items">
        {ingredients.map((ingredient, index) => (
          <SelectedIngredientBadge 
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

export default SelectedIngredients;