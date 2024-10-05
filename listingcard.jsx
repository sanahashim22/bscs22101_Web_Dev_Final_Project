// import PropTypes from 'prop-types'; // Importing PropTypes

// const ListingCard = ({ image, title, type, guests, bedrooms, bathrooms, price, rating }) => {
//   return (
//     <div className="listing-card">
//       <img src={image} alt={title} className="property-image" />
//       <div className="property-info">
//         <h3>{title}</h3>
//         <p>{type}</p>
//         <p>{guests} · {bedrooms} · {bathrooms}</p>
//         <p>{price}</p>
//         <p>Rating: {rating}</p>
//       </div>
//     </div>
//   );
// };

// // PropTypes validation
// ListingCard.propTypes = {
//   image: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   guests: PropTypes.string.isRequired,
//   bedrooms: PropTypes.string.isRequired,
//   bathrooms: PropTypes.string.isRequired,
//   price: PropTypes.string.isRequired,
//   rating: PropTypes.string.isRequired,
// };

// export default ListingCard;



import PropTypes from 'prop-types'; // Importing PropTypes

const ListingCard = ({ image, title, type, guests, bedrooms, bathrooms, price, rating }) => {
  return (
    <div className="listing-card">
      <img src={image} alt={title} className="property-image" />
      <div className="property-info">
        <h3>{title}</h3>
        <p>{type}</p>
        <p>{guests} · {bedrooms} · {bathrooms}</p>
        <p>{price}</p>
        <p>Rating: {rating}</p>
      </div>
    </div>
  );
};

// PropTypes validation
ListingCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  guests: PropTypes.string.isRequired,
  bedrooms: PropTypes.string.isRequired,
  bathrooms: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
};

export default ListingCard;
