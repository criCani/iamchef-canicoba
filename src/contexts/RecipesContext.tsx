import { createContext, useContext, useState, type ReactNode } from 'react'
import type { IRecipeByIng } from '../types/types'

/**
 * RecipesContext - Context per gestire stato ricette globalmente
 * 
 * Problema risolto:
 * Quando si naviga da SearchResults a FullRecipe e poi si torna indietro,
 * le ricette nel navigation state non sono più disponibili.
 * 
 * Soluzione:
 * Salva le ricette in un context globale che persiste durante la navigazione.
 * Questo permette di tornare ai risultati mantenendo lo stato.
 */

interface RecipesContextType {
  recipes: IRecipeByIng[]
  setRecipes: (recipes: IRecipeByIng[]) => void
  searchIngredients: string
  setSearchIngredients: (ingredients: string) => void
  clearRecipes: () => void
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined)

interface RecipesProviderProps {
  children: ReactNode
}

export function RecipesProvider({ children }: RecipesProviderProps) {
  const [recipes, setRecipes] = useState<IRecipeByIng[]>([])
  const [searchIngredients, setSearchIngredients] = useState<string>('')

  const clearRecipes = () => {
    setRecipes([])
    setSearchIngredients('')
  }

  return (
    <RecipesContext.Provider 
      value={{ 
        recipes, 
        setRecipes, 
        searchIngredients, 
        setSearchIngredients,
        clearRecipes 
      }}
    >
      {children}
    </RecipesContext.Provider>
  )
}

export function useRecipes(): RecipesContextType {
  const context = useContext(RecipesContext)
  if (!context) {
    throw new Error('useRecipes must be used within RecipesProvider')
  }
  return context
}
