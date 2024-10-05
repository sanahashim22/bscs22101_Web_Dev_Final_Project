// import { useState } from 'react';

// const Categories = () => {
//   const categories = [
//     { name: 'Beachfront', logo: 'https://cdn-icons-png.flaticon.com/128/10180/10180396.png' },
//     { name: 'Cabins', logo: 'https://cdn-icons-png.flaticon.com/128/292/292968.png' },
//     { name: 'Trending', logo: 'https://cdn-icons-png.flaticon.com/128/3121/3121784.png' },
//     { name: 'Castles', logo: 'https://cdn-icons-png.flaticon.com/128/3785/3785903.png' },
//     { name: 'Surfing', logo: 'https://cdn-icons-png.flaticon.com/128/2995/2995702.png' },
//     { name: 'Amazing views', logo: 'https://cdn-icons-png.flaticon.com/128/696/696755.png' },
//     { name: 'Arctic', logo: 'https://cdn-icons-png.flaticon.com/128/3653/3653824.png' },
//     { name: 'OMG!', logo: 'https://cdn-icons-png.flaticon.com/128/10533/10533926.png' },
//     { name: 'Design', logo: 'https://cdn-icons-png.flaticon.com/128/681/681662.png' },
//     { name: 'Mansions', logo: 'https://cdn-icons-png.flaticon.com/128/1660/1660318.png' },
//     { name: 'Chef’s kitchen', logo: 'https://cdn-icons-png.flaticon.com/128/5370/5370187.png' },
//     { name: 'Mountains', logo: 'https://cdn-icons-png.flaticon.com/128/1020/1020719.png' },
//     { name: 'Desert', logo: 'https://cdn-icons-png.flaticon.com/128/780/780363.png' },
//     { name: 'Urban', logo: 'https://cdn-icons-png.flaticon.com/128/2942/2942076.png' },
//     { name: 'Lake', logo: 'https://cdn-icons-png.flaticon.com/128/7105/7105260.png' },
//     { name: 'Countryside', logo: 'https://cdn-icons-png.flaticon.com/128/8709/8709655.png' },
//     { name: 'Luxury', logo: 'https://cdn-icons-png.flaticon.com/128/7879/7879715.png' },
//   ];

//   const [activeCategory, setActiveCategory] = useState(categories[0].name); // Initialize the first category as active

//   const handleCategoryClick = (category) => {
//     setActiveCategory(category.name); // Set the clicked category as active
//   };

//   return (
//     <div className="categories-container">
//       {categories.map((category) => (
//         <a 
//           key={category.name} 
//           href="#" 
//           className={`category-card ${activeCategory === category.name ? 'active' : ''}`}
//           onClick={() => handleCategoryClick(category)}
//         >
//           <img src={category.logo} alt={category.name} className="category-logo" />
//           <p>{category.name}</p>
//         </a>
//       ))}
//     </div>
//   );
// };

// export default Categories;


// import { useState } from 'react';
// import PropTypes from 'prop-types'; // Import PropTypes

// const Categories = ({ setActiveCategory }) => {
//   const categories = [
//     { name: 'Beachfront', logo: 'https://cdn-icons-png.flaticon.com/128/10180/10180396.png' },
//     { name: 'Cabins', logo: 'https://cdn-icons-png.flaticon.com/128/292/292968.png' },
//     { name: 'Trending', logo: 'https://cdn-icons-png.flaticon.com/128/3121/3121784.png' },
//     { name: 'Castles', logo: 'https://cdn-icons-png.flaticon.com/128/3785/3785903.png' },
//     { name: 'Surfing', logo: 'https://cdn-icons-png.flaticon.com/128/2995/2995702.png' },
//     { name: 'AmazingViews', logo: 'https://cdn-icons-png.flaticon.com/128/696/696755.png' },
//     { name: 'Arctic', logo: 'https://cdn-icons-png.flaticon.com/128/3653/3653824.png' },
//     { name: 'OMG', logo: 'https://cdn-icons-png.flaticon.com/128/10533/10533926.png' },
//     { name: 'Design', logo: 'https://cdn-icons-png.flaticon.com/128/681/681662.png' },
//     { name: 'Mansions', logo: 'https://cdn-icons-png.flaticon.com/128/1660/1660318.png' },
//     { name: 'Chefskitchen', logo: 'https://cdn-icons-png.flaticon.com/128/5370/5370187.png' },
//     { name: 'Mountains', logo: 'https://cdn-icons-png.flaticon.com/128/1020/1020719.png' },
//     { name: 'Desert', logo: 'https://cdn-icons-png.flaticon.com/128/780/780363.png' },
//     { name: 'Urban', logo: 'https://cdn-icons-png.flaticon.com/128/2942/2942076.png' },
//     { name: 'Lake', logo: 'https://cdn-icons-png.flaticon.com/128/7105/7105260.png' },
//     { name: 'Countryside', logo: 'https://cdn-icons-png.flaticon.com/128/8709/8709655.png' },
//     { name: 'Luxury', logo: 'https://cdn-icons-png.flaticon.com/128/7879/7879715.png' },
//   ];

//   const [activeCategory, setActiveCategoryState] = useState(categories[0].name); // Initialize the first category as active

//   const handleCategoryClick = (category) => {
//     setActiveCategory(category.name); // Set the clicked category as active
//     setActiveCategoryState(category.name); // Update local state to reflect active category
//   };

//   return (
//     <div className="categories-container">
//       {categories.map((category) => (
//         <a 
//           key={category.name} 
//           href="#" 
//           className={`category-card ${activeCategory === category.name ? 'active' : ''}`}
//           onClick={() => handleCategoryClick(category)}
//         >
//           <img src={category.logo} alt={category.name} className="category-logo" />
//           <p>{category.name}</p>
//         </a>
//       ))}
//     </div>
//   );
// };

// // PropTypes validation
// Categories.propTypes = {
//   setActiveCategory: PropTypes.func.isRequired, // Define expected prop type for setActiveCategory
// };

// export default Categories;


import PropTypes from 'prop-types';

const Categories = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { name: 'Beachfront', logo: 'https://cdn-icons-png.flaticon.com/128/10180/10180396.png' },
    { name: 'Cabins', logo: 'https://cdn-icons-png.flaticon.com/128/292/292968.png' },
    { name: 'Trending', logo: 'https://cdn-icons-png.flaticon.com/128/3121/3121784.png' },
    { name: 'Castles', logo: 'https://cdn-icons-png.flaticon.com/128/3785/3785903.png' },
    { name: 'Surfing', logo: 'https://cdn-icons-png.flaticon.com/128/2995/2995702.png' },
    { name: 'Amazingviews', logo: 'https://cdn-icons-png.flaticon.com/128/696/696755.png' },
    { name: 'Arctic', logo: 'https://cdn-icons-png.flaticon.com/128/3653/3653824.png' },
    { name: 'Omg', logo: 'https://cdn-icons-png.flaticon.com/128/10533/10533926.png' },
    { name: 'Design', logo: 'https://cdn-icons-png.flaticon.com/128/681/681662.png' },
    { name: 'Mansions', logo: 'https://cdn-icons-png.flaticon.com/128/1660/1660318.png' },
    { name: 'Chefskitchen', logo: 'https://cdn-icons-png.flaticon.com/128/5370/5370187.png' },
    { name: 'Mountains', logo: 'https://cdn-icons-png.flaticon.com/128/1020/1020719.png' },
    { name: 'Desert', logo: 'https://cdn-icons-png.flaticon.com/128/780/780363.png' },
    { name: 'Urban', logo: 'https://cdn-icons-png.flaticon.com/128/2942/2942076.png' },
    { name: 'Lake', logo: 'https://cdn-icons-png.flaticon.com/128/7105/7105260.png' },
    { name: 'Countryside', logo: 'https://cdn-icons-png.flaticon.com/128/8709/8709655.png' },
    { name: 'Luxury', logo: 'https://cdn-icons-png.flaticon.com/128/7879/7879715.png' },
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category.name); // Update active category in App component
  };

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <a 
          key={category.name} 
          href="#" 
          className={`category-card ${activeCategory === category.name ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); handleCategoryClick(category); }} // Prevent default anchor behavior
        >
          <img src={category.logo} alt={category.name} className="category-logo" />
          <p>{category.name}</p>
        </a>
      ))}
    </div>
  );
};

// PropTypes validation
Categories.propTypes = {
  activeCategory: PropTypes.string.isRequired, // Expected prop type for activeCategory
  setActiveCategory: PropTypes.func.isRequired, // Expected prop type for setActiveCategory
};

export default Categories;
