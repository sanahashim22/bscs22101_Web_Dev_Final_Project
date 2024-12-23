import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDeleteListing = () => {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/listings')
      .then(response => {
        setListings(response.data);
      })
      .catch(error => {
        console.error('Error fetching listings:', error);
      });
  }, []);

  const handleDelete = () => {
    if (selectedListing) {
      axios.delete(`http://localhost:5000/api/admin/listings/${selectedListing}`)
        .then(() => {
          setMessage('Listing deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting listing:', error);
          setMessage('Error deleting listing');
        });
    }
  };

  return (
    <div className="admin-delete-listing-container">
      <h2 className="admin-delete-listing-title">Delete Listing</h2>
      <select 
        className="admin-delete-listing-select" 
        onChange={(e) => setSelectedListing(e.target.value)}>
        <option value="">Select a listing</option>
        {listings.map(listing => (
          <option key={listing._id} value={listing._id}>{listing.title}</option>
        ))}
      </select>
      <button 
        className="admin-delete-listing-button" 
        onClick={handleDelete}>
        Delete Listing
      </button>
      {message && (
        <p className={`alert-message ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AdminDeleteListing;
