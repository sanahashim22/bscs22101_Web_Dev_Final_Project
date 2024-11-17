import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import mockListings from './mocklisting';

const ListingDetails = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [error, setError] = useState('');
    const { title } = useParams(); // Assuming you're using React Router to get the title

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`/api/listings/${encodeURIComponent(title)}`);
                const data = await response.json();
                setListing(data);
            } catch (error) {
                console.error('Error fetching listing:', error);
            }
        };
    
        fetchListing();
    }, [title]);
    
    useEffect(() => {
        const fetchListing = async () => {
            const response = await fetch(`http://localhost:5000/api/listings/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch listing data');
            }
            console.log("Fetching listing with ID:", id);
            let listingFound = null;

            for (const category in mockListings) {
                listingFound = mockListings[category].find(item => item.id === parseInt(id));
                if (listingFound) break; // Stop searching once found
            }

            if (listingFound) {
                setListing(listingFound);
            } else {
                setError('Listing not found');
            }
        };

        fetchListing();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!listing) {
        return <div>Loading...</div>;
    }

    // Extract numeric price from the price string
    const priceNumber = parseFloat(listing.price.replace(/[^0-9.-]+/g,"")); // Remove non-numeric characters

    return (
        <div className="listing-details-container">
            <h2 className='listing-details-name'>{listing.title}</h2>
            <img src={listing.image} alt={listing.title} className='listing-details-image'/>
            <p className="listing-detail listing-type"><strong>Type:</strong> It is a {listing.type}, perfect for a comfortable stay.</p>
            <p className="listing-detail listing-guests"><strong>Guests:</strong> Accommodates {listing.guests} guests for an enjoyable experience.</p>
            <p className="listing-detail listing-bedrooms"><strong>Bedrooms:</strong> The listing features {listing.bedrooms} well-appointed bedrooms, ideal for restful nights.</p>
            <p className="listing-detail listing-bathrooms"><strong>Bathrooms:</strong> With {listing.bathrooms} bathrooms, you will have ample space for everyone.</p>
            <p className="listing-detail listing-price"><strong>Price:</strong> Experience this listing for just <span className="price">{listing.price}</span> per night, offering great value.</p>
            <p className="listing-detail listing-rating"><strong>Rating:</strong> Rated <span className="rating">{listing.rating}</span> stars by previous guests, ensuring a quality experience.</p>
            <p className="listing-detail listing-description"><strong>Description:</strong> This property is designed with comfort and convenience in mind. Enjoy spacious living areas and modern amenities, making it a perfect base for your vacation. Relax in a warm and inviting environment after a day of exploring local attractions.</p>
            <Link to={`/booking/${listing.id}?price=${priceNumber}`} className="book-now-button">Book Now</Link>
        </div>
    );
};

export default ListingDetails;
