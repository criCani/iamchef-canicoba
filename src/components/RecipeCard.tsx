import type { IRecipeByIng } from '../types/types';
import './RecipeCard.css';

interface RecipeCardProps {
  recipe: IRecipeByIng;
  onClick: (recipe: IRecipeByIng) => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  return (
    <div className="recipe-card" onClick={() => onClick(recipe)}>
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <div className="recipe-ingredients">
        <div className="have-ingredients">At your disposal:
          <span>{recipe.usedIngredientCount}</span>
          <span className="accent-pill-small">{recipe.usedIngredientCount}</span>
        </div>
        <div className="missing-count">{recipe.missedIngredientCount} Missing ingredient{recipe.missedIngredientCount !== 1 ? 's' : ''}
          <span className="accent-pill-small">{recipe.missedIngredientCount}</span>
        </div>
      </div>
      <button
        className="view-recipe-btn"
        onClick={(e) => { e.stopPropagation(); onClick(recipe); }}
        aria-label={`View ${recipe.title}`}
      >
        View full recipe!
      </button>
    </div>
  );
};

export default RecipeCard;