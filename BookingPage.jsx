
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// const generateTwoDigitId = () => {
//     return Math.floor(10 + Math.random() * 90); 
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
//     const [bookingId, setBookingId] = useState(''); 

//     const queryParams = new URLSearchParams(location.search);
//     const pricePerNight = parseFloat(queryParams.get('price')) || 0; 
//     useEffect(() => {
//         const fetchPropertyDetails = async () => {
//             const response = await fetch(`/api/properties/${id}`);
//             const data = await response.json();
//             setProperty(data);
//         };
//         fetchPropertyDetails();
//     }, [id]);
//     useEffect(() => {
//         const fetchApiData = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api');
//                 const data = await response.json();
//                 console.log(data);  
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };
//         fetchApiData();
//     }, []);
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
//         setBookingId(generateTwoDigitId()); 
//         setShowHeading(false);
//         setShowSummary(true);  
//     };

//     const handleBooking = async () => {
//         const bookingData = { 
//             listingId: id, 
//             checkIn, 
//             checkOut, 
//             bookingId, 
//             totalPrice 
//         };
    
//         try {
//             const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(bookingData),
//             });
    
//             let responseData;
//             if (response.headers.get('Content-Type')?.includes('application/json')) {
//                 responseData = await response.json();
//             } else {
//                 console.warn('Non-JSON response:', await response.text());
//                 responseData = null;
//             }
    
//             if (response.ok && responseData) {
//                 navigate('/success', {
//                     state: { 
//                         bookingId,
//                         checkIn,
//                         checkOut,
//                         totalPrice,
//                         message: responseData.message,
//                     },
//                 });
//             } else {
//                 alert('Booking failed: ' + (responseData?.message || 'Unknown error'));
//             }
//         } catch (error) {
//             console.error('Network error:', error);
//             alert('An error occurred. Please try again.');
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

// import { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';

// const generateTwoDigitId = () => {
//     return Math.floor(10 + Math.random() * 90); 
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
//     const [bookingId, setBookingId] = useState(''); 

//     const queryParams = new URLSearchParams(location.search);
//     const pricePerNight = parseFloat(queryParams.get('price')) || 0;

//     useEffect(() => {
//         const fetchPropertyDetails = async () => {
//             const response = await fetch(`/api/properties/${id}`);
//             const data = await response.json();
//             setProperty(data);
//         };
//         fetchPropertyDetails();
//     }, [id]);

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
//         setBookingId(generateTwoDigitId());
//         setShowHeading(false);
//         setShowSummary(true);
//     };

//     const handleBooking = async () => {
//         const bookingData = {
//             propertyId: id,  // Directly use id if it's a number or valid ObjectId string
//             checkIn: checkIn,  
//             checkOut: checkOut,
//             totalPrice: totalPrice,
//             userId: 'user123', // Replace with actual user ID
//         };
    
//         console.log('Booking data being sent:', bookingData); // Debugging
    
//         try {
//             const response = await fetch(`http://localhost:5000/api/bookings`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(bookingData),
//             });
    
//             const responseData = await response.json();
//             console.log('Response from backend:', responseData); // Debugging
    
//             if (response.ok) {
//                 navigate('/success', { state: { bookingId: responseData.bookingId, message: responseData.message } });
//             } else {
//                 alert(`Booking failed: ${responseData.message || 'Unknown error'}`);
//             }
//         } catch (error) {
//             console.error('Network error:', error);
//             alert('An error occurred while processing your request. Please try again.');
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



// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// const BookingPage = ({ property, pricePerNight }) => {
//     const [checkIn, setCheckIn] = useState('');
//     const [checkOut, setCheckOut] = useState('');
//     const [bookingId, setBookingId] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [showSummary, setShowSummary] = useState(false);
//     const [error, setError] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isPasswordVerified, setIsPasswordVerified] = useState(false);

//     const navigate = useNavigate();
//     const showHeading = true;

//     useEffect(() => {
//         if (checkIn && checkOut) {
//             // Calculate total price based on the check-in and check-out dates
//             const checkInDate = new Date(checkIn);
//             const checkOutDate = new Date(checkOut);
//             const days = (checkOutDate - checkInDate) / (1000 * 3600 * 24); // Calculate days
//             setTotalPrice(days * pricePerNight);
//         }
//     }, [checkIn, checkOut, pricePerNight]);

//     const generateBookingId = () => {
//         return Math.floor(Math.random() * 900000) + 100000; // Generates a 6-digit booking ID
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!checkIn || !checkOut || !email || !password) {
//             setError('Please fill in all fields.');
//             return;
//         }

//         const bookingId = generateBookingId();
//         setBookingId(bookingId);
//         setShowSummary(true);
//     };

//     const handlePasswordSubmit = async (e) => {
//         e.preventDefault();

//         const response = await fetch('http://localhost:5000/api/verify-password', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email: email, // Send the entered email for verification
//                 password: password, // Send the entered password for verification
//             }),
//         });

//         const data = await response.json();

//         if (data.passwordVerified) {
//             setIsPasswordVerified(true);
//             // Proceed to confirm booking
//             handleBooking();
//         } else {
//             alert('Incorrect email or password. Please try again.');
//         }
//     };

//     const handleBooking = async () => {
//         const bookingData = {
//             propertyId: property._id,
//             checkIn: checkIn,
//             checkOut: checkOut,
//             totalPrice: totalPrice,
//             passwordVerified: isPasswordVerified,
//             bookingId: bookingId,
//             email: email, // Include email
//         };
    
//         try {
//             const bookingResponse = await fetch('http://localhost:5000/api/bookings', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(bookingData),
//             });
    
//             const responseData = await bookingResponse.json();
    
//             if (bookingResponse.ok) {
//                 // Pass all necessary details to SuccessPage
//                 navigate('/success', { state: { 
//                     bookingId: responseData.bookingId,
//                     checkIn: checkIn, 
//                     checkOut: checkOut, 
//                     totalPrice: totalPrice, 
//                     message: 'Booking successful' 
//                 } });
//             } else {
//                 alert(`Booking failed: ${responseData.message || 'Unknown error'}`);
//             }
//         } catch (error) {
//             console.error('Network error:', error);
//             alert('An error occurred while processing your request. Please try again.');
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

//             {/* Booking form */}
//             {!showSummary ? (
//                 <form onSubmit={handleSubmit}>
//                     <div className="bookingdiv">
//                         <label>Email:</label>
//                         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div className="bookingdiv">
//                         <label>Check-in:</label>
//                         <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
//                     </div>
//                     <div className="bookingdiv2">
//                         <label>Check-out:</label>
//                         <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
//                     </div>
//                     <div className="bookingdiv">
//                         <label>Password:</label>
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit">Book Now</button>
//                     {error && <p className="error">{error}</p>}
//                 </form>
//             ) : (
//                 // Booking summary view
//                 <div className="summary-details">
//                     <h4>Booking Summary</h4>
//                     <p>Booking ID: {bookingId}</p>
//                     <p>Check-in: {checkIn}</p>
//                     <p>Check-out: {checkOut}</p>
//                     <p>Total Price: ${totalPrice.toFixed(2)}</p>

//                     {/* Password field for confirming booking */}
//                     {!isPasswordVerified ? (
//                         <form onSubmit={handlePasswordSubmit}>
//                             <button type="submit">Confirm Booking</button>
//                         </form>
//                     ) : (
//                         <button onClick={handleBooking}>Confirm Booking</button>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// BookingPage.propTypes = {
//     property: PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//     }).isRequired,
//     pricePerNight: PropTypes.number.isRequired,
// };

// export default BookingPage;

/*

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookingPage = () => {
    const { id } = useParams();  
    const [property, setProperty] = useState(null);
    const [pricePerNight, setPricePerNight] = useState(0);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [bookingId, setBookingId] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/listings/${id}`);
                const data = await response.json();
                setProperty(data);  
                setPricePerNight(parseFloat(data.price.replace(/[^0-9.-]+/g, "")));
            } catch (err) {
                console.error('Error fetching property:', err);
            }
        };

        fetchProperty();
    }, [id]);

    useEffect(() => {
        if (checkIn && checkOut) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const days = (checkOutDate - checkInDate) / (1000 * 3600 * 24); 
            setTotalPrice(days * pricePerNight);
        }
    }, [checkIn, checkOut, pricePerNight]);

    const generateBookingId = () => {
        return Math.floor(Math.random() * 900000) + 100000; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!checkIn || !checkOut || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        const bookingId = generateBookingId();
        setBookingId(bookingId);
        setShowSummary(true);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/verify-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const data = await response.json();

        if (data.passwordVerified) {
            setIsPasswordVerified(true);
            handleBooking();
        } else {
            alert('Incorrect email or password. Please try again.');
        }
    };

    const handleBooking = async () => {
        const bookingData = {
            propertyId: property._id,
            checkIn: checkIn,
            checkOut: checkOut,
            totalPrice: totalPrice,
            passwordVerified: isPasswordVerified,
            bookingId: bookingId,
            email: email, // Include email
        };

        try {
            const bookingResponse = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            const responseData = await bookingResponse.json();

            if (bookingResponse.ok) {
                navigate('/success', {
                    state: {
                        bookingId: responseData.bookingId,
                        checkIn: checkIn,
                        checkOut: checkOut,
                        totalPrice: totalPrice,
                        message: 'Booking successful',
                    },
                });
            } else {
                alert(`Booking failed: ${responseData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('An error occurred while processing your request. Please try again.');
        }
    };

    if (!property) {
        return <div>Loading...</div>;  
    }

    return (
        <div className="booking-page-container">
            <h2>Book your stay</h2>
            <div className="property-summary">
                <h3>Property: {property.name}</h3>
                <p>Price per night: ${pricePerNight}</p>
            </div>

            {!showSummary ? (
                <form onSubmit={handleSubmit}>
                    <div className="bookingdiv3">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="bookingdiv">
                        <label>Check-in:</label>
                        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
                    </div>
                    <div className="bookingdiv2">
                        <label>Check-out:</label>
                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
                    </div>
                    <div className="bookingdiv3">
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
                    {!isPasswordVerified ? (
                        <form onSubmit={handlePasswordSubmit}>
                            <button type="submit">Confirm Booking</button>
                        </form>
                    ) : (
                        <button onClick={handleBooking}>Confirm Booking</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookingPage;




*/


import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "./axiosInstance"; 

const BookingPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [pricePerNight, setPricePerNight] = useState(0);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [bookingId, setBookingId] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axiosInstance.get(`/listings/${id}`);
                const data = response.data;
                setProperty(data);
                setPricePerNight(parseFloat(data.price.replace(/[^0-9.-]+/g, "")));
            } catch (err) {
                console.error("Error fetching property:", err);
            }
        };

        fetchProperty();
    }, [id]);

    useEffect(() => {
        if (checkIn && checkOut) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const days = (checkOutDate - checkInDate) / (1000 * 3600 * 24);
            setTotalPrice(days * pricePerNight);
        }
    }, [checkIn, checkOut, pricePerNight]);

    const generateBookingId = () => {
        return Math.floor(Math.random() * 900000) + 100000;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!checkIn || !checkOut || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
    
        if (checkInDate >= checkOutDate) {
            setError("Check-in date must be before the check-out date.");
            return;
        }
        setError(""); 
        const bookingId = generateBookingId();
        setBookingId(bookingId);
        setShowSummary(true);
    };
    

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axiosInstance.post("/verify-password", {
                email: email,
                password: password,
            });
    
            if (response.status === 200 && response.data.passwordVerified) {
                setIsPasswordVerified(true);
                handleBooking(); 
            } else if (response.status === 401 || response.data.passwordVerified === false) {
                alert(response.data.message || "Incorrect email or password. Please try again.");
            } else {
                alert("An unexpected error occurred. Please try again later.");
            }
        } catch (err) {
            console.error("Password verification error:", err);
    
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("A network error occurred. Please check your connection and try again.");
            }
        }
    };
    
    const handleBooking = async () => {
        const bookingData = {
            propertyId: property._id,
            checkIn: checkIn,
            checkOut: checkOut,
            totalPrice: totalPrice,
            passwordVerified: isPasswordVerified,
            bookingId: bookingId,
            email: email, 
        };
    
        try {
            const bookingResponse = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });
    
            const responseData = await bookingResponse.json();
    
            if (bookingResponse.ok) {
                navigate('/success', {
                    state: {
                        bookingId: responseData.bookingId,
                        checkIn: checkIn,
                        checkOut: checkOut,
                        totalPrice: totalPrice,
                        message: 'Booking successful',
                    },
                });
            } else {
                alert(`Booking failed: ${responseData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('An error occurred while processing your request. Please try again.');
        }
    };
    

    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <div className="booking-page-container">
            <h2>Book your stay</h2>
            <div className="property-summary">
                <h3>Property: {property.name}</h3>
                <p>Price per night: ${pricePerNight}</p>
            </div>

            {!showSummary ? (
                <form onSubmit={handleSubmit}>
                    <div className="bookingdiv3">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="bookingdiv">
                        <label>Check-in:</label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                        />
                    </div>
                    <div className="bookingdiv2">
                        <label>Check-out:</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                        />
                    </div>
                    <div className="bookingdiv3">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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
                    {!isPasswordVerified ? (
                        <form onSubmit={handlePasswordSubmit}>
                            <button type="submit">Confirm Booking</button>
                        </form>
                    ) : (
                        <button onClick={handleBooking}>Confirm Booking</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookingPage;
