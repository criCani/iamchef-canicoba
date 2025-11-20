import type { IIngredient } from '../types/types';

type SearchButtonProps = {
    ingredients: IIngredient[];
    onSearchClick: () => void;
    isDiscover: boolean;
};

const SearchButton = ({ ingredients, onSearchClick, isDiscover }: SearchButtonProps) => {
    if (!ingredients || ingredients.length == 0) {
        return null
    }

    return (
        <button 
            onClick={onSearchClick}
        >
            {isDiscover ? "Searching..." : "Search!"}
        </button>
    );
};

export default SearchButton;