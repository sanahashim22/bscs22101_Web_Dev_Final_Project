import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const { bookingId, checkIn, checkOut, totalPrice } = location.state || {};

    return (
        <div className="success-page-container">
            <h2>Congratulations!</h2>
            <p>Your booking has been confirmed.</p>
            <div className="booking-details">
                <p><strong>Booking ID:</strong> {bookingId}</p>
                <p><strong>Check-in Date:</strong> {checkIn}</p>
                <p><strong>Check-out Date:</strong> {checkOut}</p>
                <p><strong>Total Price:</strong> ${totalPrice}</p>
            </div>
            <button className="back-to-home" onClick={() => window.location.href = '/'}>Back to Home</button>
        </div>
    );
};

export default SuccessPage;
