// import { useState } from 'react';

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState(''); // State for the search input

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value); // Update state with the input value
//   };

//   const handleSearch = () => {
//     console.log(`Searching for: ${searchTerm}`); // Perform search logic here
//     // You can also reset the input after searching if desired
//     setSearchTerm('');
//   };

//   return (
//     <div className="searchbar">
//       <input 
//         type="text" 
//         value={searchTerm} 
//         onChange={handleInputChange} 
//         placeholder="Search destinations" 
//       />
//       <button className="search-btn" onClick={handleSearch}>Search</button>
//     </div>
//   );
// };


import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const SearchBar = ({ setActiveCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Set the active category based on the search term (case insensitive)
    setActiveCategory(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase());
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

// PropTypes validation
SearchBar.propTypes = {
  setActiveCategory: PropTypes.func.isRequired, // Define expected prop type for setActiveCategory
};

export default SearchBar;
