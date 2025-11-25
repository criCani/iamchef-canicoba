import type { IRecipeDetails } from './types'

export type Pages =
  | { page: 'home' }
  | { page: 'results' }
  | { page: 'full-recipe'; recipeData?: IRecipeDetails }
  | { page: 'intro' }

export type CurrentPage = {
  currentPage: Pages
  id?: number
}
