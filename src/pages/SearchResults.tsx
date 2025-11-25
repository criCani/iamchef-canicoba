import RecipeCard from "../components/RecipeCard";
import { ScrollBtnSection } from "../components/ScrollBtnSection"
import type { IRecipeByIng } from "../types/types"
import '../styles/SearchResults.css';

type SearchResultsProps = {
  recipes: IRecipeByIng[]
  onRecipeDetailsClick: (recipe: IRecipeByIng) => void
  goToHomepage: () => void
  currentIndex: number
  setCurrentIndex: (index: number) => void
}

function SearchResults({ recipes, onRecipeDetailsClick, goToHomepage, currentIndex, setCurrentIndex }: SearchResultsProps) {

  return (
    <main id="recipe-card-container" className="discover-recipes-container">

      <div className="discover-recipes-meta">
        <span className="results-counter">Trovate {recipes.length} ricette</span>
      </div>

      <div className="discover-recipes-card-wrapper">
        <RecipeCard recipe={recipes[currentIndex]} onClickDetails={onRecipeDetailsClick} />
      </div>

      <div className="discover-recipes-btn-section">
        <ScrollBtnSection
          currentIndex={currentIndex} 
          maxIndex={recipes.length-1} 
          setCurrentIndex={setCurrentIndex}
          goToHomepage={goToHomepage}
        />
      </div>

    </main>
  )
}

export default SearchResults
