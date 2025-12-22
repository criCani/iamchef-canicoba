import '../styles/components/RecipeMeta.css';
import IconifyIcon from '../utils/IconifyIcon';

type RecipeMetaProps = {
  readyInMinutes?: number;
  cheap?: boolean;
  servings?: number;
};

export const RecipeMeta = ({ readyInMinutes = 0, cheap = false, servings = 0 }: RecipeMetaProps) => {
  return (
    <div className="full-recipe__meta">
      <div className="full-recipe__meta-item">
        <span className="full-recipe__meta-icon"><IconifyIcon icon="mdi:clock" width="1.5em" height="1.5em" /></span>
        <span className="full-recipe__meta-text">{readyInMinutes} minuti</span>
      </div>
      <div className="full-recipe__meta-item">
        <span className="full-recipe__meta-icon"><IconifyIcon icon="mdi:money" width="1.5em" height="1.5em" /></span>
        <span className="full-recipe__meta-text">{cheap ? 'Economica' : 'Non economica'}</span>
      </div>
      <div className="full-recipe__meta-item">
        <span className="full-recipe__meta-icon"><IconifyIcon icon="mdi:silverware-fork-knife" width="1.5em" height="1.5em" /></span>
        <span className="full-recipe__meta-text">{servings} porzioni</span>
      </div>
    </div>
  );
};

export default RecipeMeta;
