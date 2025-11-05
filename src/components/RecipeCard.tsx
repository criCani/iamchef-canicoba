import type { Recipe } from '../types/types';
import './RecipeCard.css';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  selectedIngredients?: string[];
}

const RecipeCard = ({ recipe, onClick, selectedIngredients = [] }: RecipeCardProps) => {
  // compute how many ingredients user has vs missing
  const recipeIngredientNames = recipe.extendedIngredients.map(i => i.name.toLowerCase());
  const have = recipeIngredientNames.filter(name => selectedIngredients.includes(name));
  const missing = recipeIngredientNames.length - have.length;
  return (
    <div className="recipe-card" onClick={() => onClick(recipe)}>
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p className="recipe-summary">{(recipe as any).summary || recipe.instructions || ''}</p>
      <div className="recipe-info">
        <span className="recipe-time">⏱ {recipe.readyInMinutes} min</span>
        <span className="recipe-servings">🍽 { (recipe as any).servings ?? '–' }</span>
      </div>
      <div className="recipe-ingredients">
        <div className="have-ingredients">Your ingredients: <span className="accent-pill-small">{have.join(', ') || 'none'}</span></div>
        <div className="missing-count">{missing} missing ingredients</div>
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