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


// import { useState } from 'react';
// import PropTypes from 'prop-types'; // Import PropTypes

// const SearchBar = ({ setActiveCategory }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearch = () => {
//     // Set the active category based on the search term (case insensitive)
//     setActiveCategory(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase());
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

// // PropTypes validation
// SearchBar.propTypes = {
//   setActiveCategory: PropTypes.func.isRequired, // Define expected prop type for setActiveCategory
// };

// export default SearchBar;


import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ setActiveCategory }) => {
  const [searchTerm, setSearchInput] = useState('');

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    setActiveCategory(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase());
    setSearchInput(''); // Clear input after search
  };

  return (
    <div className="searchbar">
      <div className="search-inputs">
        <div className="search-option">
          <span>Where</span>
          <input type="text" placeholder="Search destinations" value={searchTerm} onChange={handleInputChange} />
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
};

export default SearchBar;
