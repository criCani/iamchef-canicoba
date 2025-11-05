import type { Recipe } from '../types/types';
import './ResultPage.css';
import RecipeCard from '../components/RecipeCard';

interface ResultPageProps {
  recipes: Recipe[];
  onRecipeSelect: (recipe: Recipe) => void;
  selectedIngredients: string[];
  onBack: () => void;
}

const ResultPage = ({ recipes, onRecipeSelect, selectedIngredients, onBack }: ResultPageProps) => {
  return (
    <div className="results-container">
      <button className="back-button" onClick={onBack}>Back to Home</button>
      <h2 className="results-title">Recipes with your ingredients:</h2>
      <div className="selected-ingredients-list">
        <h3>Selected Ingredients:</h3>
        <p>{selectedIngredients.join(', ')}</p>
      </div>
      <div className="recipes-grid">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={onRecipeSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultPage;