import type { IRecipeDetails } from "../types/types.ts";
import '../styles/FullRecipe.css';

type FullRecipeProps = {
  id: number;
  recipeData: IRecipeDetails;
  goToBack: (id: number) => void
};

export const FullRecipe = ({ id, recipeData, goToBack }: FullRecipeProps) => {
  const recipe = recipeData; // Dati completi già ottenuti dal parent
  // La vista preferisce 'analyzedInstructions' (strutturato); se assente usa 'instructions' HTML.
  return (
    <div className="recipe-details-container">
      <div className="recipe-details-scroll">
        <section className="recipe-details-card">
          <div className="recipe-image-container">
            <img
              src={
                recipe.image?.length
                  ? recipe.image
                  : "https://images.unsplash.com/photo-1547385203-cfe7977b9fd0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171"
              }
              alt={recipe.title || "Titolo non disponibile"}
              className="recipe-image"
            />
            <div className="recipe-image-overlay" />
          </div>

          <h1 className="recipe-details-title">
            {recipe.title || "Ricetta sconosciuta"}
          </h1>

          <div className="recipe-details-meta">
            <div className="recipe-details-meta-item">
              <span className="recipe-details-meta-icon">🕐</span>
              <span className="recipe-details-meta-text">{recipe.readyInMinutes || 0} minutes</span>
            </div>
            <div className="recipe-details-meta-item">
              <span className="recipe-details-meta-icon">💵</span>
              <span className="recipe-details-meta-text">{recipe.cheap ? "Cheap" : "Not cheap"}!</span>
            </div>
            <div className="recipe-details-meta-item">
              <span className="recipe-details-meta-icon">🍽️</span>
              <span className="recipe-details-meta-text">{recipe.servings || 0} servings</span>
            </div>
          </div>

          <section className="recipe-details-section">
            <h2 className="recipe-details-section-title">Main ingredients</h2>
            <ul className="recipe-details-ingredients-list">
              {recipe.extendedIngredients && recipe.extendedIngredients.map((ing) => (
                <li key={ing.id} className="recipe-details-ingredient-item">
                  {ing.amount} {ing.measures.metric.unitShort} {ing.name}
                </li>
              ))}
            </ul>
          </section>

          <section className="recipe-details-section">
            <h2 className="recipe-details-section-title">Instructions</h2>
            <div className="recipe-details-instructions">
              {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && recipe.analyzedInstructions[0].steps.map((step) => (
                <div key={step.number} className="recipe-details-instruction-step">
                  <span className="recipe-details-instruction-number">{step.number}</span>
                  <span className="recipe-details-instruction-text">
                    {step.step}
                  </span>
                </div>
              ))}
              {(!recipe.analyzedInstructions || recipe.analyzedInstructions.length === 0) && recipe.instructions && (
                <p className="recipe-details-instruction-text" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
              )}
            </div>
          </section>

        </section>
      </div>
      <div className="recipe-details-back-wrapper">
        <button
          type="button"
          onClick={() => goToBack(id)}
          className="recipe-details-back-button"
        >
          ⬅️
        </button>
      </div>
    </div>
  );
};
