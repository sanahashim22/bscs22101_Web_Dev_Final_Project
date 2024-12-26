import { useState } from 'react';
import axios from 'axios';

const HostAddListing = () => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        type: '',
        price: '',
        image: '',
        category:'',
        guests: '',
        bedrooms: '',
        rating:'',
        bathrooms: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/host/listings', formData)
            .then(() => {
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
            <form className="admin-add-listing-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="admin-input"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    className="admin-input"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    className="admin-input"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    className="admin-input"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="category"
                    className="admin-input"
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="guests"
                    placeholder="Guests"
                    className="admin-input"
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="bedrooms"
                    placeholder="Bedrooms"
                    className="admin-input"
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="bathrooms"
                    placeholder="Bathrooms"
                    className="admin-input"
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="rating"
                    className="admin-input"
                    onChange={handleInputChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    className="admin-textarea"
                    onChange={handleInputChange}
                ></textarea>
                <button type="submit" className="admin-submit-btn">Add Listing</button>
            </form>
        </div>
    );
};

export default HostAddListing;
