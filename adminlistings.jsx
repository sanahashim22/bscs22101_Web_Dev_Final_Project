import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/listings')
      .then(response => {
        console.log('Listings data:', response.data); 
        setListings(response.data);
      })
      .catch(error => {
        console.error('Error fetching listings:', error);
      });
  }, []);

  return (
    <div className="admin-listings">
      <h2>Admin Listings</h2>
      <div className="listings-container2">
        {listings.map(listing => (
          <div key={listing._id} className="listing-card2">
            <img
              src={listing.image}
              alt={listing.title}
              className="listing-image2"
            />
            <p className='listp'><strong>Id:</strong> {listing.id}</p>
            <h3 className='listh3'>{listing.title}</h3>
            <p className='listp'><strong>Type:</strong> {listing.type}</p>
            <p className='listp'><strong>Description:</strong> {listing.description || 'No description available'}</p>
            <p className='listp'><strong>Price:</strong> {listing.price}</p>
            <p className='listp'><strong>Category:</strong> {listing.category}</p>
            <p className='listp'><strong>Guests:</strong> {listing.guests}</p>
            <p className='listp'><strong>Bedrooms:</strong> {listing.bedrooms}</p>
            <p className='listp'><strong>Bathrooms:</strong> {listing.bathrooms}</p>
            <p className='listp'><strong>Rating:</strong> {listing.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminListings;
