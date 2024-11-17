

import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ setActiveCategory, setSearchTerm, categories }) => {
  const [searchTerm, setSearchInput] = useState('');

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    const formattedSearchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();

    if (categories.includes(formattedSearchTerm)) {
      setActiveCategory(formattedSearchTerm);
    } else {
      setSearchTerm(searchTerm);
    }

    setSearchInput(''); 
  };

  return (
    <div className="searchbar">
      <div className="search-inputs">
        <div className="search-option">
          <span>Where</span>
          <input 
            type="text" 
            placeholder="Search destinations" 
            value={searchTerm} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="search-option">
          <span>Check in</span>
          <input type="text" placeholder="Add dates" />
        </div>
        <div className="search-option">
          <span>Check out</span>
          <input type="text" placeholder="Add dates" />
        </div>
        <div className="search-option no-border">
          <span>Who</span>
          <input type="text" placeholder="Add guests" />
        </div>
        <button className="search-btn" onClick={handleSearch}>
          <span role="img" aria-label="Search">🔍</span>
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  setActiveCategory: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default SearchBar;
