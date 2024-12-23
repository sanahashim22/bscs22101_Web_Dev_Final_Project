import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserBookingInput() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (email) {
            navigate(`/bookings/${email}`);
        }
    };

    return (
        <div className="user-booking-container">
            <h1 className="user-booking-title">Enter Your Email</h1>
            <input
                type="email"
                className="user-booking-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button className="user-booking-button" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}

export default UserBookingInput;
