import type { IRecipeByIng } from '../types/types';
import './ResultPage.css';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import PillsList from '../components/PillsList';
import { ScrollBtnSection } from '../components/ScrollBtnSection';

interface ResultPageProps {
  recipes: IRecipeByIng[];
  onRecipeSelect: (recipe: IRecipeByIng) => void;
  goToHomepage: () => void
  currentIndex: number
  setCurrentIndex: (index: number) => void
}

function ResultPage({ recipes, onRecipeSelect, goToHomepage, currentIndex, setCurrentIndex }: ResultPageProps) {

  return (
    <main
      id="recipe-card-container"
    >
      <div>
        <RecipeCard recipe={recipes[currentIndex]} onClick={onRecipeSelect} />
      </div>

      <div>
        <ScrollBtnSection
          currentIndex={currentIndex} 
          maxIndex={recipes.length-1} 
          setCurrentIndex={setCurrentIndex}
          goToHomepage={goToHomepage}
        />
      </div>

    </main>
  );
};

export default ResultPage;