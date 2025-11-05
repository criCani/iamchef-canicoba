import { useState } from 'react';
import type { Recipe } from './types/types';
import Home from './pages/Home';
import ResultPage from './pages/ResultPage';
import FullRecipe from './pages/FullRecipe';
import recipes from './data/recipes.json';

const recipesData: Recipe[] = recipes as Recipe[];

const App = () => {
  const [page, setPage] = useState<'home' | 'results' | 'full'>('home');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleSearch = (ingredients: string[]) => {
    setSelectedIngredients(ingredients);
    if (ingredients.length > 0) {
      setPage('results');
    }
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setPage('full');
  };

  const filteredRecipes = recipesData.filter((recipe: Recipe) => 
    selectedIngredients.some(ingredient =>
      recipe.extendedIngredients.some(
        (recipeIngredient) => recipeIngredient.name.toLowerCase().includes(ingredient.toLowerCase())
      )
    )
  );

  return (
    <div>
      {page === 'home' && (
        <Home
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
          onSearch={handleSearch}
        />
      )}
      
      {page === 'results' && (
        <ResultPage
          recipes={filteredRecipes}
          onRecipeSelect={handleRecipeSelect}
          selectedIngredients={selectedIngredients}
          onBack={() => {
            setSelectedIngredients([]);
            setPage('home');
          }}
        />
      )}
      
      {page === 'full' && selectedRecipe && (
        <FullRecipe
          recipe={selectedRecipe}
          onBack={() => setPage('results')}
        />
      )}
    </div>
  );
};

export default App;