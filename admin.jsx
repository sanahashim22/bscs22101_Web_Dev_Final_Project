import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="admin-page">
      <h1 className='adminhead'>Admin Panel</h1>
      <p className='para'>Welcome, Admin! Please choose an option below:</p>
      
      <div className="admin-options">
        <Link to="/admin/listings" className="admin-option">
          <button className="admin-btn">View Listings</button>
        </Link>
        <Link to="/admin/listings/add" className="admin-option">
          <button className="admin-btn">Add Listing</button>
        </Link>
        <Link to="/admin/listings/delete" className="admin-option">
          <button className="admin-btn">Delete Listings</button>
        </Link>
        <Link to="/admin/bookings" className="admin-option">
          <button className="admin-btn">View Bookings</button>
        </Link>
        <Link to="/admin/users" className="admin-option">
          <button className="admin-btn">View Users</button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
