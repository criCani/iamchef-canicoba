import SearchBar from '../components/SearchBar';
import './Home.css';
import IngredientPill from '../components/IngredientPill';

interface HomeProps {
  selectedIngredients: string[];
  setSelectedIngredients: (ingredients: string[]) => void;
  onSearch: (ingredients: string[]) => void;
}

const Home = ({ selectedIngredients, setSelectedIngredients, onSearch }: HomeProps) => {
  const handleRemoveIngredient = (ingredient: string) => {
    const newIngredients = selectedIngredients.filter(item => item !== ingredient);
    setSelectedIngredients(newIngredients);
    onSearch(newIngredients);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">What ingredients are we working with?</h1>
      <SearchBar
        onSearch={onSearch}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <div className="selected-ingredients">
        {selectedIngredients.map((ingredient, index) => (
          <IngredientPill
            key={index}
            ingredient={ingredient}
            onRemove={handleRemoveIngredient}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;