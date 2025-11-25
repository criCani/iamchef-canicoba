import type { IIngredient } from "../types/types";
import SearchBar from "../components/Searchbar";
import SelectedList from "../components/SelectedList";
import DiscoverRecipeBtn from "../components/DiscoverRecipeBtn";
import '../styles/Home.css';

type HomeProps = {
  onSuggestClick: (ing: IIngredient) => void,
  onBadgeRemove: (ing: IIngredient) => void,
  selectedIng: IIngredient[]
  onSearchClick: () => void
  isDiscover: boolean
}

const Home = ({onSuggestClick, onBadgeRemove, selectedIng, onSearchClick, isDiscover }: HomeProps) => {
  return (
     <div className="search-page-container">
        <h1 className="search-page-title">
            What ingredients are we working with?
        </h1>
        <SearchBar handleSuggestClick={onSuggestClick} />

        <SelectedList 
            ingredients={selectedIng} 
            handleRemove={onBadgeRemove} 
        />

        <DiscoverRecipeBtn ingredients={selectedIng} onSearchClick={onSearchClick} isDiscover={isDiscover}/>
    </div>
    )
}


export default Home;