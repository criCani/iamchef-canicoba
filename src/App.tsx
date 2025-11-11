import { useState } from 'react';
import type { IRecipe } from './types/types';
import Layout from './pages/Layout';
import recipes from './data/recipes.json';

const recipesData: IRecipe[] = recipes as IRecipe[];

const App = () => {
  const [page, setPage] = useState<'home' | 'results' | 'full'>('home');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);

  return (
    <Layout
      page={page}
      setPage={setPage}
      selectedIngredients={selectedIngredients}
      setSelectedIngredients={setSelectedIngredients}
      selectedRecipe={selectedRecipe}
      setSelectedRecipe={setSelectedRecipe}
      recipesData={recipesData}
    />
  );
};

export default App;