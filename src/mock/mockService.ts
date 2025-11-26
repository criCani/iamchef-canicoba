import type { IIngredient, IRecipeByIng, IRecipeDetails } from '../types/types';
import { ingredientsMock, recipesByIngMock, recipesMock } from './mock';

/**
 * Servizio per simulare risposte API usando dati mock
 * Interpreta l'URL della richiesta e restituisce i dati mock appropriati
 */

export const getMockDataForUrl = (url: string): any | null => {
  try {
    // Estrai il percorso dall'URL
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const searchParams = urlObj.searchParams;

    // Ricerca ingredienti: /food/ingredients/search
    if (pathname.includes('/food/ingredients/search')) {
      const query = searchParams.get('query') || '';
      return filterIngredientsByQuery(query);
    }

    // Ricerca ricette per ingredienti: /recipes/findByIngredients
    if (pathname.includes('/recipes/findByIngredients')) {
      const ingredients = searchParams.get('ingredients') || '';
      return filterRecipesByIngredients(ingredients);
    }

    // Dettagli ricetta: /recipes/{id}/information
    const recipeIdMatch = pathname.match(/\/recipes\/(\d+)\/information/);
    if (recipeIdMatch) {
      const recipeId = parseInt(recipeIdMatch[1], 10);
      return getRecipeDetails(recipeId);
    }

    return null;
  } catch (error) {
    console.error('Error parsing mock URL:', error);
    return null;
  }
};

/**
 * Filtra gli ingredienti in base alla query di ricerca
 */
const filterIngredientsByQuery = (query: string): IIngredient[] => {
  if (!query) return ingredientsMock.slice(0, 10);
  
  const lowerQuery = query.toLowerCase();
  return ingredientsMock
    .filter(ing => ing.name.toLowerCase().includes(lowerQuery))
    .slice(0, 10); // Limite a 10 risultati come l'API reale
};

/**
 * Filtra le ricette in base agli ingredienti forniti
 */
const filterRecipesByIngredients = (ingredientsParam: string): IRecipeByIng[] => {
  if (!ingredientsParam) return recipesByIngMock.slice(0, 10);
  
  const ingredientNames = ingredientsParam
    .split(',')
    .map(ing => ing.trim().toLowerCase());
  
  // Filtra ricette che contengono almeno uno degli ingredienti
  const filtered = recipesByIngMock.filter(recipe => {
    const usedNames = recipe.usedIngredients.map(ing => ing.name.toLowerCase());
    return ingredientNames.some(name => 
      usedNames.some(usedName => usedName.includes(name) || name.includes(usedName))
    );
  });
  
  // Se non ci sono match, ritorna le prime ricette
  return filtered.length > 0 ? filtered : recipesByIngMock.slice(0, 10);
};

/**
 * Ottiene i dettagli di una ricetta specifica
 */
const getRecipeDetails = (recipeId: number): IRecipeDetails | null => {
  const recipe = recipesMock.find((r: IRecipeDetails) => r.id === recipeId);
  
  // Se non esiste nei mock dettagliati, prova a costruire uno basico dal recipesByIngMock
  if (!recipe) {
    const basicRecipe = recipesByIngMock.find(r => r.id === recipeId);
    if (basicRecipe) {
      // Ritorna il primo recipe details come fallback
      return recipesMock[0];
    }
  }
  
  return recipe || null;
};

/**
 * Simula un ritardo di rete per rendere più realistico il mock
 */
export const simulateNetworkDelay = (ms: number = 300): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
