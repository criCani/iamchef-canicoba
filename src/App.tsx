import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import ResultPage from './pages/ResultPage';
import FullRecipe from './pages/FullRecipe';
import type { IRecipeDetails, IRecipeByIng } from './types/types';
import './components/Layout.css';
import recipes from './data/recipes.json';

const recipesData: IRecipeDetails[] = recipes as IRecipeDetails[];

const App = () => {
  const [page, setPage] = useState<'home' | 'results' | 'full'>('home');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipeDetails | null>(null);

  const handleSearch = (ingredients: string[]) => {
    setSelectedIngredients(ingredients);
    if (ingredients.length > 0) {
      setPage('results');
    }
  };

  const handleRecipeSelect = (recipe: IRecipeDetails | IRecipeByIng) => {
    if ('extendedIngredients' in recipe) {
      setSelectedRecipe(recipe as IRecipeDetails);
      setPage('full');
      return;
    }
    console.warn('Selected recipe does not contain full details (IRecipe). Consider fetching by id:', (recipe as any).id);
  };

  const filteredRecipes = recipesData.filter((recipe: IRecipeDetails) =>
    selectedIngredients.some(ingredient =>
      recipe.extendedIngredients.some(
        (recipeIngredient) => recipeIngredient.name.toLowerCase().includes(ingredient.toLowerCase())
      )
    )
  );

  return (
    <div className="app-layout">
      <Header />
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
          setSelectedIngredients={setSelectedIngredients}
          onSearch={handleSearch}
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