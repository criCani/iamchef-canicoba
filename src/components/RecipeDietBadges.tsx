import '../styles/components/RecipeDietBadges.css';
import IconifyIcon from '../utils/IconifyIcon';

type RecipeDietBadgesProps = {
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;
};

export const RecipeDietBadges = ({ vegetarian, vegan, glutenFree, dairyFree }: RecipeDietBadgesProps) => {
  if (!(vegetarian || vegan || glutenFree || dairyFree)) return null;
  return (
    <div className="full-recipe__badges">
      {vegetarian && (
        <span className="full-recipe__badge full-recipe__badge--vegetarian"><IconifyIcon icon="mdi:sprout" width="1.2em" height="1.2em" aria-hidden={true} /> Vegetariana</span>
      )}
      {vegan && (
        <span className="full-recipe__badge full-recipe__badge--vegan"><IconifyIcon icon="mdi:leaf" width="1.2em" height="1.2em" aria-hidden={true} /> Vegana</span>
      )}
      {glutenFree && (
        <span className="full-recipe__badge full-recipe__badge--gluten"><IconifyIcon icon="mdi:grain" width="1.2em" height="1.2em" aria-hidden={true} /> Senza Glutine</span>
      )}
      {dairyFree && (
        <span className="full-recipe__badge full-recipe__badge--dairy"><IconifyIcon icon="mdi:glass-nonic" width="1.2em" height="1.2em" aria-hidden={true} /> Senza Lattosio</span>
      )}
    </div>
  );
};

export default RecipeDietBadges;
