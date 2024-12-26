import { Link } from 'react-router-dom';

const HostDashboard = () => {
  return (
    <div className="host-dashboard">
      <h1 className="host-dashboard-head">Host Dashboard</h1>
      <p className="para">Welcome, Host! Please choose an option below:</p>
      
      <div className="host-options">
        <Link to="/host/listings" className="host-option">
          <button className="host-btn">View Listings</button>
        </Link>
        <Link to="/host/listings/add" className="host-option">
          <button className="host-btn">Add Listing</button>
        </Link>
        <Link to="/host/listings/delete" className="host-option">
          <button className="host-btn">Delete Listing</button>
        </Link>
        <Link to="/host/bookings" className="host-option">
          <button className="host-btn">View Bookings</button>
        </Link>
        <Link to="/" className="host-option">
          <button className="host-btn">Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default HostDashboard;
