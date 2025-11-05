import type { Recipe } from '../types/types';
import './RecipeCard.css';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  return (
    <div className="recipe-card" onClick={() => onClick(recipe)}>
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <div className="recipe-info">
        <span className="recipe-time">Ready in {recipe.readyInMinutes} minutes</span>
        {recipe.cheap && <span className="recipe-cheap">Budget-friendly!</span>}
      </div>
    </div>
  );
};

export default RecipeCard;