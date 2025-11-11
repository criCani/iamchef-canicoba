import React from "react";
import Header from "../components/Header";
import Home from "./Home";
import ResultPage from "./ResultPage";
import FullRecipe from "./FullRecipe";
import type { IRecipe, IRecipeByIngredients } from "../types/types";
import './Layout.css';

interface LayoutProps {
  page: 'home' | 'results' | 'full';
  setPage: (page: 'home' | 'results' | 'full') => void;
  selectedIngredients: string[];
  setSelectedIngredients: (ingredients: string[]) => void;
  selectedRecipe: IRecipe | null;
  setSelectedRecipe: (recipe: IRecipe | null) => void;
  recipesData: IRecipe[];
}

const Layout: React.FC<LayoutProps> = ({
  page,
  setPage,
  selectedIngredients,
  setSelectedIngredients,
  selectedRecipe,
  setSelectedRecipe,
  recipesData,
}) => {
  // Handler per la ricerca
  const handleSearch = (ingredients: string[]) => {
    setSelectedIngredients(ingredients);
    if (ingredients.length > 0) {
      setPage('results');
    }
  };

  // Handler per selezione ricetta
  const handleRecipeSelect = (recipe: IRecipe | IRecipeByIngredients) => {
    if ('extendedIngredients' in recipe) {
      setSelectedRecipe(recipe as IRecipe);
      setPage('full');
      return;
    }
    console.warn('Selected recipe does not contain full details (IRecipe). Consider fetching by id:', recipe.id);
  };

  // Filtra le ricette in base agli ingredienti selezionati
  const filteredRecipes = recipesData.filter((recipe: IRecipe) =>
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

export default Layout;
