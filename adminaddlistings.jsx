import { useState } from 'react';
import axios from 'axios';

const AdminAddListing = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    type: '',
    price: '',
    image: '',
    guests: '',
    category: '',
    bedrooms: '',
    bathrooms: '',
    rating: '',
    description: ''
  });

  const [adminProperties, setAdminProperties] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/api/admin/listings', formData)
    .then((response) => {
        console.log('Updated Admin Listings:', response.data);
        setAdminProperties(response.data);
        alert('Listing added successfully!');
    })
    .catch(error => {
        console.error('Error adding listing:', error);
        alert('Error adding listing');
    });
  };
  

  return (
    <div className="admin-add-listing-container">
      <h2 className="admin-add-listing-title">Add New Listing</h2>
      <form onSubmit={handleSubmit} className="admin-add-listing-form">
      {/* <input
          type="number"
          name="id"
          className="admin-input"
          placeholder="id"
          onChange={handleInputChange}
        /> */}
        <input
          type="text"
          name="title"
          className="admin-input"
          placeholder="Title"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="type"
          className="admin-input"
          placeholder="Type"
          onChange={handleInputChange}
        />
        <input
          type="string"
          name="price"
          className="admin-input"
          placeholder="Price"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          className="admin-input"
          placeholder="Image URL"
          onChange={handleInputChange}
        />
          <input
          type="string"
          name="category"
          className="admin-input"
          placeholder="category"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="guests"
          className="admin-input"
          placeholder="Guests"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="bedrooms"
          className="admin-input"
          placeholder="Bedrooms"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="bathrooms"
          className="admin-input"
          placeholder="Bathrooms"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="rating"
          className="admin-input"
          placeholder="rating"
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          className="admin-textarea"
          placeholder="Description"
          onChange={handleInputChange}
        ></textarea>
        <button type="submit" className="admin-submit-btn">Add Listing</button>
      </form>

      <div className="admin-properties-list">
      <h3 style={{ fontWeight: 'bold' }}>Admin Listings Titles After Adding New Listing:</h3>
        <br />
        <ul>
          {adminProperties.map(property => (
            <li key={property._id}>
            <h4>{property.title}</h4>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminAddListing;
