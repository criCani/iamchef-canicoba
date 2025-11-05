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
      onSearch(newIngredients);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  return (
    <div className="search-container">
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter an ingredient..."
          className="search-input"
        />
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