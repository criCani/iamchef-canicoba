import type { IExtendedIngredient } from '../types/types';
import '../styles/components/RecipeIngredientsSection.css';
import IconifyIcon from '../utils/IconifyIcon';

type RecipeIngredientsSectionProps = {
  ingredients?: IExtendedIngredient[];
};

export const RecipeIngredientsSection = ({ ingredients = [] }: RecipeIngredientsSectionProps) => {
  return (
    <section className="full-recipe__section">
      <h2 className="full-recipe__section-title">
        <span className="full-recipe__section-icon"><IconifyIcon icon="mdi:salt" width="1.5em" height="1.5em" /></span>
        Ingredienti Principali
      </h2>
      <ul className="full-recipe__ingredients-list">
        {ingredients.map((ing) => (
          <li key={ing.id} className="full-recipe__ingredient">
            <span className="full-recipe__ingredient-bullet">•</span>
            <span>{ing.amount} {ing.measures.metric.unitShort} {ing.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecipeIngredientsSection;
