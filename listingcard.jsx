

// import PropTypes from 'prop-types'; 

// const ListingCard = ({ listing }) => {
//   const { image, title, type, guests, bedrooms, bathrooms, price, rating } = listing;

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

// ListingCard.propTypes = {
//   listing: PropTypes.shape({
//     image: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     guests: PropTypes.string.isRequired,
//     bedrooms: PropTypes.string.isRequired,
//     bathrooms: PropTypes.string.isRequired,
//     price: PropTypes.string.isRequired,
//     rating: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default ListingCard;

// // ListingCard.jsx
// import PropTypes from 'prop-types'; 
// import { Link } from 'react-router-dom';

// const ListingCard = ({ listing }) => {
//   const { id, image, title, type, guests, bedrooms, bathrooms, price, rating } = listing;

//   return (
//     <div className="listing-card">
//       <img src={image} alt={title} className="property-image" />
//       <div className="property-info">
//         <h3>{title}</h3>
//         <p>{type}</p>
//         <p>{guests} · {bedrooms} · {bathrooms}</p>
//         <p>{price}</p>
//         <p>Rating: {rating}</p>
//         <Link to={`/listings/${id}`} className="book-now-button">Book Now</Link>
//       </div>
//     </div>
//   );
// };

// ListingCard.propTypes = {
//   listing: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     image: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     guests: PropTypes.string.isRequired,
//     bedrooms: PropTypes.string.isRequired,
//     bathrooms: PropTypes.string.isRequired,
//     price: PropTypes.string.isRequired,
//     rating: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default ListingCard;


// ListingCard.jsx
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const { id, image, title, type, guests, bedrooms, bathrooms, price, rating } = listing;

  return (
    <div className="listing-card">
      <Link to={`/listing/${id}`}> {/* Make the whole card clickable */}
        <img src={image} alt={title} className="property-image" />
      </Link>
      <div className="property-info">
        <h3>{title}</h3>
        <p>{type}</p>
        <p>{guests} · {bedrooms} · {bathrooms}</p>
        <p>{price}</p>
        <p>Rating: {rating}</p>
        {/* <Link to={`/listing/${id}`} className="book-now-button">Book Now</Link> Keep this for direct booking if needed */}
      </div>
    </div>
  );
};

ListingCard.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    guests: PropTypes.string.isRequired,
    bedrooms: PropTypes.string.isRequired,
    bathrooms: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListingCard;
