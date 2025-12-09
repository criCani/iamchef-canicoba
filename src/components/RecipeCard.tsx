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
      <div className="recipe-card__image-wrapper">
        <img
          src={
            data.image?.length
              ? data.image
              : "https://images.unsplash.com/photo-1547385203-cfe7977b9fd0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171"
          }
          alt={data.title || "Titolo non disponibile"}
          className="recipe-card__image"
        />
        <div className="recipe-card__image-overlay" />
      </div>

      <h2 className="recipe-card__title">
        {data.title || "Ricetta sconosciuta"}
      </h2>

      <div className="recipe-card__ingredients">
        {available > 0 && (
          <div className="recipe-card__ingredient-section recipe-card__ingredient-section--available">
            <div className="recipe-card__ingredient-header">
              <span className="recipe-card__ingredient-label">✅ A disposizione:</span>
              <span className="recipe-card__ingredient-count">{available}</span>
            </div>
            <div className="recipe-card__ingredient-list">
              {data.usedIngredients.map((ing) => (
                <div key={ing.id} className="recipe-card__ingredient-item recipe-card__ingredient-item--available">
                  {ing.name}
                </div>
              ))}
            </div>
          </div>
        )}
        {missing > 0 && (
          <div className="recipe-card__ingredient-section recipe-card__ingredient-section--missing">
            <div className="recipe-card__ingredient-header">
              <span className="recipe-card__ingredient-label">⚠️ Ingredienti mancanti:</span>
              <span className="recipe-card__ingredient-count">{missing}</span>
            </div>
            <div className="recipe-card__ingredient-list">
              {data.missedIngredients.map((ing) => (
                <div key={ing.id} className="recipe-card__ingredient-item recipe-card__ingredient-item--missing">
                  {ing.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => onClickDetails(data)}
        className="recipe-card__details-btn"
      >
        <span>Ricetta completa</span>
        <span className="recipe-card__details-icon">🔗</span>
      </button>
    </div>
  );
};

export default RecipeCard;