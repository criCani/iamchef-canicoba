import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router'
import RecipeCard from "../components/RecipeCard"
import { ScrollBtnSection } from "../components/ScrollBtnSection"
import type { IRecipeByIng, IRecipeDetails } from "../types/types"
import { getRecipeInformationUrl } from '../hooks/useApi'
import useModeStore from '../store/useModeStore'
import { useRecipes } from '../contexts/RecipesContext'
import { getMockDataForUrl, simulateNetworkDelay } from '../mock/mockService'
import '../styles/SearchResults.css'

/**
 * SearchResults - Pagina risultati ricerca ricette
 * 
 * Utilizzo React Router:
 * - useSearchParams: legge ingredienti dalla query string (?ingredients=tomato,cheese)
 * - useNavigate: navigazione verso dettaglio ricetta con parametro dinamico
 * 
 * Utilizzo Context:
 * - RecipesContext: recupera ricette salvate dal context (persistono durante navigazione)
 * 
 * Query String:
 * - ingredients: lista ingredienti separati da virgola (visibile nella URL)
 * 
 * Flusso:
 * 1. Recupera ricette dal context
 * 2. Mostra query string con ingredienti cercati
 * 3. Permette scroll tra ricette (currentIndex come state locale)
 * 4. Click su ricetta → fetch dettagli → navigate a /recipe/:id
 */

function SearchResults() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const mode = useModeStore((s) => s.mode)
  const { recipes, searchIngredients } = useRecipes()
  
  // Recupera ingredienti dalla query string (per display)
  const ingredientsFromUrl = searchParams.get('ingredients') ?? searchIngredients
  
  // Indice ricetta corrente (navigazione tra risultati)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  // Reset index quando cambiano le ricette
  useEffect(() => {
    setCurrentIndex(0)
  }, [recipes])

  // Se non ci sono ricette, torna alla home
  useEffect(() => {
    if (recipes.length === 0) {
      navigate('/', { replace: true })
    }
  }, [recipes, navigate])

  // Click su ricetta: fetch dettagli e naviga a /recipe/:id
  const handleRecipeDetailsClick = async (recipe: IRecipeByIng) => {
    try {
      const url = getRecipeInformationUrl(recipe.id)
      
      let json: IRecipeDetails
      
      if (mode === 'mock') {
        await simulateNetworkDelay(300)
        json = getMockDataForUrl(url) as IRecipeDetails
      } else {
        const resp = await fetch(url)
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        json = (await resp.json()) as IRecipeDetails
      }
      
      // Naviga a rotta dinamica /recipe/:recipeId
      navigate(`/recipe/${recipe.id}`, {
        state: { 
          recipeData: json,
          fromResults: true
        }
      })
    } catch (e) {
      console.error('Errore dettagli ricetta:', e)
    }
  }

  // Torna alla homepage
  const goToHomepage = () => {
    navigate('/')
  }

  const handleSetCurrentIndex = (index: number) => {
    setCurrentIndex(index)
  }

  if (recipes.length === 0) {
    return null // Verrà fatto redirect dalla useEffect
  }

  return (
    <main id="recipe-card-container" className="discover-recipes-container">
      <div className="discover-recipes-meta">
        <span className="results-counter">
          Trovate {recipes.length} ricette per: {ingredientsFromUrl}
        </span>
      </div>

      <div className="discover-recipes-card-wrapper">
        <RecipeCard 
          recipe={recipes[currentIndex]} 
          onClickDetails={handleRecipeDetailsClick} 
        />
      </div>

      <div className="discover-recipes-btn-section">
        <ScrollBtnSection
          currentIndex={currentIndex} 
          maxIndex={recipes.length - 1} 
          setCurrentIndex={handleSetCurrentIndex}
          goToHomepage={goToHomepage}
        />
      </div>
    </main>
  )
}

export default SearchResults
