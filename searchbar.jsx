import { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); // Update state with the input value
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`); // Perform search logic here
    // You can also reset the input after searching if desired
    setSearchTerm('');
  };

  return (
    <div className="searchbar">
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleInputChange} 
        placeholder="Search destinations" 
      />
      <button className="search-btn" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
