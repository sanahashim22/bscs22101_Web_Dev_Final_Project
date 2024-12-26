import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserBookingsDisplay() {
    const { email } = useParams();
    const navigate = useNavigate();  
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/bookings/user/${email}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Sorry!! This username has no bookings');
                }
                return response.json();
            })
            .then((data) => {
                setBookings(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [email]);

    if (loading) return <p className="user-bookings-loading">Loading...</p>;
    if (error) return (
        <div className="user-bookings-error-container">
            <p className="user-bookings-error">{error}</p>
            <button className="user-bookings-back-button" onClick={() => navigate(-1)}>
                Go Back
            </button>
        </div>
    );

    return (
        <div className="user-bookings-container">
            <h1 className="user-bookings-title">Past Bookings for {email}</h1>
            {bookings.length > 0 ? (
                <div className="user-bookings-list">
                    {bookings.map((booking) => (
                        <div className="user-bookings-box" key={booking.bookingId}>
                            <p className="user-bookings-id">Booking ID: {booking.bookingId}</p>
                            <p className="user-bookings-detail">
                                <strong>Property ID:</strong> {booking.propertyId}
                            </p>
                            <p className="user-bookings-detail">
                                <strong>Check-In:</strong> {new Date(booking.checkIn).toLocaleDateString()}
                            </p>
                            <p className="user-bookings-detail">
                                <strong>Check-Out:</strong> {new Date(booking.checkOut).toLocaleDateString()}
                            </p>
                            <p className="user-bookings-detail">
                                <strong>Total Price:</strong> ${booking.totalPrice}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="user-bookings-no-results">No bookings found.</p>
            )}
        </div>
    );
}

export default UserBookingsDisplay;
