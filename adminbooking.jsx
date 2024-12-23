import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  return (
    <div className="admin-bookings-container">
      <h2 className="admin-bookings-title">Admin Bookings</h2>
      <div className="bookings-list">
        {bookings.map(booking => (
          <div key={booking._id} className="booking-box">
            <h3 className="booking-id">Booking ID: {booking.bookingId}</h3>
            <p className="booking-detail"><strong>Email:</strong> {booking.email}</p>
            <p className="booking-detail"><strong>Property ID:</strong> {booking.propertyId}</p>
            <p className="booking-detail"><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p className="booking-detail"><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
