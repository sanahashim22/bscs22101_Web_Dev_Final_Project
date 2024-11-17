// import { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';

// // Function to generate a two-digit unique ID
// const generateTwoDigitId = () => {
//     return Math.floor(10 + Math.random() * 90); // Generates a number between 10 and 99
// };

// const BookingPage = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [checkIn, setCheckIn] = useState('');
//     const [checkOut, setCheckOut] = useState('');
//     const [error, setError] = useState('');
//     const [property, setProperty] = useState(null);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [showSummary, setShowSummary] = useState(false);
//     const [showHeading, setShowHeading] = useState(true);
//     const [bookingId, setBookingId] = useState(''); // State for unique booking ID

//     // Retrieve price from the URL
//     const queryParams = new URLSearchParams(location.search);
//     const pricePerNight = parseFloat(queryParams.get('price')) || 0; // Default to 0 if not found

//     // Fetch property details based on listing ID
//     useEffect(() => {
//         const fetchPropertyDetails = async () => {
//             const response = await fetch(`/api/properties/${id}`);
//             const data = await response.json();
//             setProperty(data);
//         };

//         fetchPropertyDetails();
//     }, [id]);

//     // Update total price whenever check-in/check-out dates change
//     useEffect(() => {
//         if (checkIn && checkOut) {
//             const checkInDate = new Date(checkIn);
//             const checkOutDate = new Date(checkOut);
//             const timeDifference = checkOutDate - checkInDate;
//             const days = timeDifference / (1000 * 3600 * 24);
//             if (days > 0) {
//                 setTotalPrice(days * pricePerNight);
//             } else {
//                 setTotalPrice(0);
//             }
//         }
//     }, [checkIn, checkOut, pricePerNight]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!checkIn || !checkOut) {
//             setError('Please enter both check-in and check-out dates.');
//             return;
//         }
//         if (new Date(checkIn) >= new Date(checkOut)) {
//             setError('Check-out date must be after check-in date.');
//             return;
//         }
//         setBookingId(generateTwoDigitId()); // Generate a two-digit ID
//         setShowHeading(false); // Hide the heading
//         setShowSummary(true);  // Show summary
//     };

//     const handleBooking = async () => {
//         const bookingData = { listingId: id, checkIn, checkOut, bookingId }; // Include booking ID
//         const response = await fetch(`/api/bookings/${id}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(bookingData),
//         });
    
//         const responseData = await response.json();
//         if (response.ok) {
//             alert('Booking successful!');
//             navigate('/success');  // Redirect to a success page
//         } else {
//             alert('Booking failed: ' + responseData.message);
//         }
//     };
        

//     return (
//         <div className="booking-page-container">
//             {showHeading && <h2>Book your stay</h2>}
//             {property && (
//                 <div className="property-summary">
//                     <h3>Property: {property.name}</h3>
//                     <p>Price per night: ${pricePerNight}</p>
//                 </div>
//             )}
//             {!showSummary ? (
//                 <form onSubmit={handleSubmit}>
//                     <div className="bookingdiv">
//                         <label>Check-in:</label>
//                         <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
//                     </div>
//                     <div className="bookingdiv2">
//                         <label>Check-out:</label>
//                         <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
//                     </div>
//                     <button type="submit">Book Now</button>
//                     {error && <p className="error">{error}</p>}
//                 </form>
//             ) : (
//                 <div className="summary-details">
//                     <h4>Booking Summary</h4>
//                     <p>Booking ID: {bookingId}</p>
//                     <p>Check-in: {checkIn}</p>
//                     <p>Check-out: {checkOut}</p>
//                     <p>Total Price: ${totalPrice.toFixed(2)}</p>
//                     <button onClick={handleBooking}>Confirm Booking</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BookingPage;



import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Function to generate a two-digit unique ID
const generateTwoDigitId = () => {
    return Math.floor(10 + Math.random() * 90); // Generates a number between 10 and 99
};

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [error, setError] = useState('');
    const [property, setProperty] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
    const [showHeading, setShowHeading] = useState(true);
    const [bookingId, setBookingId] = useState(''); // State for unique booking ID

    // Retrieve price from the URL
    const queryParams = new URLSearchParams(location.search);
    const pricePerNight = parseFloat(queryParams.get('price')) || 0; // Default to 0 if not found

    // Fetch property details based on listing ID
    useEffect(() => {
        
        const fetchPropertyDetails = async () => {
            const response = await fetch(`/api/properties/${id}`);
            const data = await response.json();
            setProperty(data);
        };

        fetchPropertyDetails();
    }, [id]);
    useEffect(() => {
        const fetchApiData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api');
                const data = await response.json();
                console.log(data);  // Log the data to see the response
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchApiData();
    }, []);

    // Update total price whenever check-in/check-out dates change
    useEffect(() => {
        if (checkIn && checkOut) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const timeDifference = checkOutDate - checkInDate;
            const days = timeDifference / (1000 * 3600 * 24);
            if (days > 0) {
                setTotalPrice(days * pricePerNight);
            } else {
                setTotalPrice(0);
            }
        }
    }, [checkIn, checkOut, pricePerNight]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkIn || !checkOut) {
            setError('Please enter both check-in and check-out dates.');
            return;
        }
        if (new Date(checkIn) >= new Date(checkOut)) {
            setError('Check-out date must be after check-in date.');
            return;
        }
        setBookingId(generateTwoDigitId()); // Generate a two-digit ID
        setShowHeading(false); // Hide the heading
        setShowSummary(true);  // Show summary
    };

    const handleBooking = async () => {
        const bookingData = { listingId: id, checkIn, checkOut, bookingId };
        const response = await fetch(`/api/bookings/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
    
        const responseData = await response.json();
        if (response.ok) {
            alert('Booking successful!');
            // Pass the booking details as state to the success page
            navigate('/success', {
                state: { 
                    bookingId,
                    checkIn,
                    checkOut,
                    totalPrice
                }
            });
        } else {
            alert('Booking failed: ' + responseData.message);
        }
    };
    

    return (
        <div className="booking-page-container">
            {showHeading && <h2>Book your stay</h2>}
            {property && (
                <div className="property-summary">
                    <h3>Property: {property.name}</h3>
                    <p>Price per night: ${pricePerNight}</p>
                </div>
            )}
            {!showSummary ? (
                <form onSubmit={handleSubmit}>
                    <div className="bookingdiv">
                        <label>Check-in:</label>
                        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                    </div>
                    <div className="bookingdiv2">
                        <label>Check-out:</label>
                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                    </div>
                    <button type="submit">Book Now</button>
                    {error && <p className="error">{error}</p>}
                </form>
            ) : (
                <div className="summary-details">
                    <h4>Booking Summary</h4>
                    <p>Booking ID: {bookingId}</p>
                    <p>Check-in: {checkIn}</p>
                    <p>Check-out: {checkOut}</p>
                    <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    <button onClick={handleBooking}>Confirm Booking</button>
                </div>
            )}
        </div>
    );
};

export default BookingPage;
