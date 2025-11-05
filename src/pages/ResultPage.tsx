import type { Recipe } from '../types/types';
import './ResultPage.css';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import IngredientPill from '../components/IngredientPill';

interface ResultPageProps {
  recipes: Recipe[];
  onRecipeSelect: (recipe: Recipe) => void;
  selectedIngredients: string[];
  setSelectedIngredients: (ingredients: string[]) => void;
  onSearch: (ingredients: string[]) => void;
  onBack: () => void;
}

const ResultPage = ({ recipes, onRecipeSelect, selectedIngredients, setSelectedIngredients, onSearch, onBack }: ResultPageProps) => {
  const handleRemove = (ingredient: string) => {
    const newList = selectedIngredients.filter(i => i !== ingredient);
    setSelectedIngredients(newList);
  };
  return (
    <div className="results-container">
      <button className="back-button" onClick={onBack}>Back to Home</button>

      <SearchBar
        onSearch={onSearch}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />

      <div className="selected-ingredients-list">
        {selectedIngredients.length > 0 ? (
          selectedIngredients.map((ing, i) => (
            <IngredientPill key={i} ingredient={ing} onRemove={() => handleRemove(ing)} />
          ))
        ) : (
          <p className="muted-text">No ingredients selected</p>
        )}
      </div>

      <div className="recipes-grid">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={onRecipeSelect}
            selectedIngredients={selectedIngredients}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultPage;