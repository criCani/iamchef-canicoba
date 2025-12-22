import type { IRecipeByIng } from "../types/types";
import '../styles/components/RecipeCard.css';
import IconifyIcon from '../utils/IconifyIcon';

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
          src={data.image || ""}
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
              <span className="recipe-card__ingredient-label"><IconifyIcon icon="mdi:check-circle" width="1.2em" height="1.2em" aria-hidden={true} /> A disposizione:</span>
              <span className="recipe-card__ingredient-count">{available}</span>
            </div>
            <div className="recipe-card__ingredient-pills-container">
              {data.usedIngredients.map((ing) => (
                <span key={ing.id} className="recipe-card__ingredient-pill recipe-card__ingredient-pill--available">
                  {ing.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {missing > 0 && (
          <div className="recipe-card__ingredient-section recipe-card__ingredient-section--missing">
            <div className="recipe-card__ingredient-header">
              <span className="recipe-card__ingredient-label"><IconifyIcon icon="mdi:alert-circle" width="1.2em" height="1.2em" aria-hidden={true} /> Ingredienti mancanti:</span>
              <span className="recipe-card__ingredient-count">{missing}</span>
            </div>
            <div className="recipe-card__ingredient-pills-container">
              {data.missedIngredients.map((ing) => (
                <span key={ing.id} className="recipe-card__ingredient-pill recipe-card__ingredient-pill--missing">
                  {ing.name}
                </span>
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
        <span className="recipe-card__details-icon"><IconifyIcon icon="mdi:link" width="1.3em" height="1.3em" aria-hidden={true} /></span>
      </button>
    </div>
  );
};

export default RecipeCard;