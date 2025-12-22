import { useParams, useNavigate, useLocation } from 'react-router-dom';
import type { IRecipeDetails } from "../types/types";
import { useRecipes } from '../contexts/RecipesContext';
import '../styles/pages/FullRecipePage.css';
import RecipeTopbar from '../components/RecipeTopbar';
import RecipeMeta from '../components/RecipeMeta';
import RecipeDietBadges from '../components/RecipeDietBadges';
import RecipeIngredientsSection from '../components/RecipeIngredientsSection';
import RecipeInstructionsSection from '../components/RecipeInstructionsSection';

interface LocationState {
  recipeData?: IRecipeDetails;
  fromResults?: boolean;
  currentIndex?: number;
}

export const FullRecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchIngredients } = useRecipes();
  
  // Recupera dati ricetta dal navigation state
  const locationState = location.state as LocationState | null;
  const recipe = locationState?.recipeData;
  const fromResults = locationState?.fromResults;

  // Se mancano i dati, torna alla home
  if (!recipe || !recipeId) {
    navigate('/', { replace: true });
    return null;
  }

  // Torna alla pagina risultati con query string dal context
  const handleGoBack = () => {
    if (fromResults && searchIngredients) {
      // Torna a /results con stessi ingredienti e indice preservato
      // Le ricette sono già nel context
      navigate(`/results?ingredients=${encodeURIComponent(searchIngredients)}`, {
        state: {
          preservedIndex: locationState?.currentIndex ?? 0
        }
      });
    } else {
      // Fallback: torna alla home
      navigate('/');
    }
  };

  // Vai alla home per nuova ricerca
  const handleNewSearch = () => {
    navigate('/');
  };

  // La vista preferisce 'analyzedInstructions' (strutturato); se assente usa 'instructions' HTML.
  return (
    <div className="full-recipe">
      <div className="full-recipe__container">
        <section className="full-recipe__content">
          <div className="full-recipe__image-wrapper">
            <img
              src={recipe.image}
              alt={recipe.title || "Titolo non disponibile"}
              className="full-recipe__image"
            />
            <div className="full-recipe__image-overlay" />
          </div>

          <h1 className="full-recipe__title">
            {recipe.title || "Ricetta sconosciuta"}
          </h1>

          <RecipeMeta readyInMinutes={recipe.readyInMinutes} cheap={recipe.cheap} servings={recipe.servings} />

          <RecipeDietBadges vegetarian={recipe.vegetarian} vegan={recipe.vegan} glutenFree={recipe.glutenFree} dairyFree={recipe.dairyFree} />

          <RecipeIngredientsSection ingredients={recipe.extendedIngredients} />

          <RecipeInstructionsSection analyzedInstructions={recipe.analyzedInstructions as any} instructionsHtml={recipe.instructions} />

        </section>
      </div>

      <RecipeTopbar onBack={handleGoBack} onNewSearch={handleNewSearch} />
    </div>
  );
};
