import SearchBar from '../components/SearchBar';
import './Home.css';
import type { IIngredient } from '../types/types';
import SearchButton from '../components/SearchButton';
import PillsList from '../components/PillsList';

interface HomeProps {
  onSuggestClick: (ing: IIngredient) => void,
  onPillRemove: (ing: IIngredient) => void,
  selectedIng: IIngredient[]
  onSearchClick: () => void
  isDiscover: boolean
}

const Home = ({onSuggestClick, onPillRemove, selectedIng, onSearchClick, isDiscover }: HomeProps) => {
  return (
    <div className="home-container">
      <h1 className="home-title">
        What ingredients are we working with?
      </h1>
      <SearchBar
        handleSuggestClick={onSuggestClick}
      />
      
      <SearchButton 
        ingredients={selectedIng} 
        onSearchClick={onSearchClick} 
        isDiscover={isDiscover}
      />

      <PillsList 
        ingredients={selectedIng} 
        handleRemove={onPillRemove} 
      />
    </div>
  );
};

export default Home;