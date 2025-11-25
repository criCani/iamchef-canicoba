import type { IRecipeByIng } from "../types/types";
import '../styles/RecipeCard.css';

type RecipeCardProps = {
  recipe: IRecipeByIng;
  onClickDetails: (recipe: IRecipeByIng) => void;
};

const RecipeCard = ({ recipe, onClickDetails }: RecipeCardProps) => {
  const data = recipe;
  const available = data.usedIngredients?.length || 0;
  const missing = data.missedIngredients?.length || 0;

  return (
    <div className="recipe-card">
      <div className="recipe-image-container">
        <img
          src={
            data.image?.length
              ? data.image
              : "https://images.unsplash.com/photo-1547385203-cfe7977b9fd0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171"
          }
          alt={data.title || "Titolo non disponibile"}
          className="recipe-image"
        />
        <div className="recipe-image-overlay" />
      </div>

      <h2 className="recipe-card-title">
        {data.title || "Ricetta sconosciuta"}
      </h2>

      <div className="recipe-ingredients-container">
        {available > 0 && (
          <div className="recipe-ingredients-section">
            <div className="recipe-ingredients-section-header">
              <span className="recipe-ingredients-section-title">At your disposal:</span>
              <span className="recipe-ingredients-count-badge green">{available}</span>
            </div>
            <div className="recipe-ingredients-list-container">
              {data.usedIngredients.map((ing) => (
                <div key={ing.id} className="recipe-ingredient-chip at-disposal">
                  {ing.name}
                </div>
              ))}
            </div>
          </div>
        )}
        {missing > 0 && (
          <div className="recipe-ingredients-section">
            <div className="recipe-ingredients-section-header">
              <span className="recipe-ingredients-section-title">Missing ingredients:</span>
              <span className="recipe-ingredients-count-badge red">{missing}</span>
            </div>
            <div className="recipe-ingredients-list-container">
              {data.missedIngredients.map((ing) => (
                <div key={ing.id} className="recipe-ingredient-chip missing">
                  {ing.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => onClickDetails(data)}
        className="recipe-card-button"
      >
        Full recipe 🔗
      </button>
    </div>
  );
};

export default RecipeCard;