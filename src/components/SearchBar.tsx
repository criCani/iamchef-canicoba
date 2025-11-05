import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Ingredient } from '../types/types';
import ingredients from '../data/ingredients.json';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (ingredients: string[]) => void;
  selectedIngredients: string[];
  setSelectedIngredients: (ingredients: string[]) => void;
}

const SearchBar = ({ onSearch, selectedIngredients, setSelectedIngredients }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Ingredient[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter ingredients based on search term
    const filtered = value
      ? (ingredients as Ingredient[]).filter(
          (ingredient) => 
            ingredient.name.toLowerCase().includes(value) &&
            !selectedIngredients.includes(ingredient.name.toLowerCase())
        )
      : [];
    setSuggestions(filtered);
  };

  const handleSelectIngredient = (ingredient: Ingredient) => {
    if (!selectedIngredients.includes(ingredient.name.toLowerCase())) {
      const newIngredients = [...selectedIngredients, ingredient.name.toLowerCase()];
      setSelectedIngredients(newIngredients);
      // Do NOT trigger onSearch immediately — only on explicit submit
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const handleSubmit = () => {
    // submit current selected ingredients to trigger recipe search
    onSearch(selectedIngredients);
  };

  return (
    <div className="search-container">
      <div className="search-row">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search ingredients"
          className="search-input"
        />
        <button className="search-submit-btn" onClick={handleSubmit} aria-label="Search recipes">Search recipes</button>
      </div>
      {suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((ingredient) => (
            <div
              key={ingredient.id}
              onClick={() => handleSelectIngredient(ingredient)}
              className="suggestion-item"
            >
              {ingredient.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;