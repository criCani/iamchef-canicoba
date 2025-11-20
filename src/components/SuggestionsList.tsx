import type { IIngredient } from "../types/types";
import SuggestionsItem from "./SuggestionsItem";

type SuggestionsListProps = {
    ingredients: IIngredient[],
    handleClick: (ing: IIngredient) => void
}

const SuggestionsList = ({ ingredients, handleClick }: SuggestionsListProps) => {
    return (
        <div>
            {ingredients.map((ing) => (
                <SuggestionsItem key={ing.name} ingredient={ing} handleClick={handleClick} />
            ))}
        </div>
    );
};

export default SuggestionsList;