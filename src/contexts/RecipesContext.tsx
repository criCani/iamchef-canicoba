import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react'
import type { IRecipeByIng, IRecipeDetails } from '../types/types'

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
  detailsCache: Record<number, IRecipeDetails>
  // setDetailsCache: (cache: Record<number, IRecipeDetails>) => void | OLD LINE
  // Obbiettivo: quando si torna indietro da FullRecipe a SearchResults, mantenere la cache dei dettagli, per non sprecare chiamate API.
  // Problema: non consentiva il functional updater (prev => ...), causando errori TS quando si merge la cache.
  // React dispatcher: consente functional updater per evitare overwrite con stato stantio quando si mergia la cache
  setDetailsCache: Dispatch<SetStateAction<Record<number, IRecipeDetails>>>
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined)

interface RecipesProviderProps {
  children: ReactNode
}

export function RecipesProvider({ children }: RecipesProviderProps) {
  const [recipes, setRecipes] = useState<IRecipeByIng[]>([])
  const [searchIngredients, setSearchIngredients] = useState<string>('')
  const [detailsCache, setDetailsCache] = useState<Record<number, IRecipeDetails>>({})

  const clearRecipes = () => {
    setRecipes([])
    setSearchIngredients('')
    setDetailsCache({})
  }

  return (
    <RecipesContext.Provider 
      value={{ 
        recipes, 
        setRecipes, 
        searchIngredients, 
        setSearchIngredients,
        clearRecipes,
        detailsCache,
        setDetailsCache
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
