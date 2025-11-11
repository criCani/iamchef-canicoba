import type { IRecipe } from '../types/types';
import './FullRecipe.css';

interface FullRecipeProps {
  recipe: IRecipe;
  onBack: () => void;
}

const FullRecipe = ({ recipe, onBack }: FullRecipeProps) => {
  return (
    <div className="full-recipe">
      <button className="back-button" onClick={onBack}>Back to Results</button>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      
      <div className="recipe-details">
        <p>Ready in {recipe.readyInMinutes} minutes</p>
        {recipe.cheap && <p className="recipe-cheap">Budget-friendly recipe!</p>}
      </div>

      <div className="recipe-ingredients">
        <h2>Ingredients</h2>
        <ul>
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="recipe-instructions">
        <h2>Instructions</h2>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default FullRecipe;