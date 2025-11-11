import type { IRecipe, IRecipeByIngredients } from '../types/types';
import './RecipeCard.css';

interface RecipeCardProps {
  recipe: IRecipe | IRecipeByIngredients;
  onClick: (recipe: IRecipe | IRecipeByIngredients) => void;
  selectedIngredients?: string[];
}

const RecipeCard = ({ recipe, onClick, selectedIngredients = [] }: RecipeCardProps) => {
  const isRecipeByIngredients = (r: any): r is IRecipeByIngredients => (
    r && Array.isArray(r.usedIngredients) && (typeof r.missedIngredientCount === 'number' || Array.isArray(r.missedIngredients))
  );

  const isBy = isRecipeByIngredients(recipe);

  let have: string[] = [];
  let missing = 0;

  if (isBy) {
    have = recipe.usedIngredients.map(i => (i.name || '').toLowerCase());
    missing = typeof recipe.missedIngredientCount === 'number'
      ? recipe.missedIngredientCount
      : (recipe.missedIngredients || []).length;
  } else {
    // Fallback to original logic for full recipe objects
    const recipeIngredientNames = (recipe.extendedIngredients || []).map(i => i.name.toLowerCase());
    have = recipeIngredientNames.filter(name => selectedIngredients.includes(name));
    missing = recipeIngredientNames.length - have.length;
  }
  return (
    <div className="recipe-card" onClick={() => onClick(recipe)}>
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <div className="recipe-info">
        <span className="recipe-time">⏱ {!isBy && (recipe as IRecipe).readyInMinutes ? `${(recipe as IRecipe).readyInMinutes} min` : '–'}</span>
        <span className="recipe-servings">🍽 { !isBy ? ((recipe as any).servings ?? '–') : '–' }</span>
      </div>
      <div className="recipe-ingredients">
        <div className="have-ingredients">Your ingredients: <span className="accent-pill-small">{have.join(', ') || 'none'}</span></div>
        <div className="missing-count">{missing} missing ingredient{missing !== 1 ? 's' : ''}</div>
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