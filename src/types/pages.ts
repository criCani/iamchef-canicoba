import type { IRecipeDetails } from './types'

export type Pages =
  | { page: 'home' }
  | { page: 'results' }
  | { page: 'full-recipe'; recipeData?: IRecipeDetails }

export type CurrentPage = {
  currentPage: Pages
  id?: number
}
