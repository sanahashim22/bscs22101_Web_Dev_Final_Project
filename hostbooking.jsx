import { useEffect, useState } from 'react';
import axios from 'axios';

const HostBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings for the logged-in host
    axios.get('http://localhost:5000/api/host/bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  return (
    <div className="host-bookings-container">
      <h2 className="host-bookings-title">Bookings</h2>
      <div className="bookings-list">
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          bookings.map(booking => (
            <div key={booking._id} className="booking-box">
              <h3 className="booking-id">Booking ID: {booking.bookingId}</h3>
              <p className="booking-detail"><strong>Guest:</strong> {booking.guestName}</p>
              <p className="booking-detail"><strong>Email:</strong> {booking.email}</p>
              <p className="booking-detail"><strong>Property Title:</strong> {booking.propertyTitle}</p>
              <p className="booking-detail"><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
              <p className="booking-detail"><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HostBookings;
