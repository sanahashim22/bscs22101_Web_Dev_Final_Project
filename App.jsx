
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/navbar';
// import SearchBar from './components/searchbar';
// import Categories from './components/categories';
// import ListingCard from './components/listingcard';
// import ListingDetails from './components/ListingDetails';
// import Booking from './components/BookingPage';
// import Footer from './components/footer';
// import Experiences from './pages/experience'; 
// import OnlineExperiences from './pages/onlineExperience'; 
// import { useEffect, useState } from 'react';
// import SuccessPage from './components/SuccessPage';
// import Login from './components/login';
// import Signup from './components/signup';

// import './css/App.css';

// function App() {
//   const [activeCategory, setActiveCategory] = useState('Beachfront');
//   const [listingsData, setListingsData] = useState([]);  
//   const [filteredListings, setFilteredListings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const fetchListings = async () => {
//     try {
//         const response = await fetch('http://localhost:5000/api/listings');
//         if (!response.ok) {
//             throw new Error('Failed to fetch listings');
//         }
//         const data = await response.json();
//         console.log("Fetched data:", data);
//         setListingsData(data);
//         setFilteredListings(data);
//     } catch (err) {
//         console.log('Error fetching listings: ' + err.message);
//     }
// };


//   const updateListings = () => {
//     let filtered = listingsData;
//     if (searchTerm) {
//       filtered = filtered.filter(listing =>
//         listing.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (activeCategory) {
//       filtered = filtered.filter(listing =>
//         listing.category.toLowerCase() === activeCategory.toLowerCase()
//       );
//     }
//     setFilteredListings(filtered); 
//     console.log('Filtered Listings:', filtered);
//   };
//   useEffect(() => {
//     fetchListings();  
//   }, []);
//   useEffect(() => {
//     updateListings();  
//   }, [activeCategory, searchTerm, listingsData]);
//   const handleCategorySelect = (category) => {
//     setActiveCategory(category);
//     setSearchTerm('');  
//   };
//   return (
//     <Router> 
//       <div className="App">
//         <Navbar />
//         <Routes>
//           <Route 
//             path="/" 
//             element={
//               <>
//                 <SearchBar 
//                   setActiveCategory={setActiveCategory} 
//                   setSearchTerm={setSearchTerm} 
//                   categories={['Beachfront', 'Mountain', 'Urban']} 
//                 />
//                 <Categories 
//                   categories={['Beachfront', 'Mountain', 'Urban']} 
//                   onSelectCategory={handleCategorySelect} 
//                   activeCategory={activeCategory} 
//                 />
//                 <div className="listings-container">
//                   {filteredListings.length > 0 ? (
//                     filteredListings.map((listing, index) => (
//                       <ListingCard key={index} listing={listing} />
//                     ))
//                   ) : (
//                     <p>No listings available.</p>
//                   )}
//                 </div>
//               </>
//             } 
//           />
//           <Route path="/listing/:id" element={<ListingDetails />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/booking/:id" element={<Booking />} />
//           <Route path="/success" element={<SuccessPage />} />
//           <Route path="/experiences" element={<Experiences />} /> 
//           <Route path="/online-experiences" element={<OnlineExperiences />} /> 
//           <Route path="/listing/:title" element={<ListingDetails />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }
// export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import SearchBar from './components/searchbar';
import Categories from './components/categories';
import ListingCard from './components/listingcard';
import ListingDetails from './components/ListingDetails';
import Booking from './components/BookingPage';
import Footer from './components/footer';
import Experiences from './pages/experience'; 
import OnlineExperiences from './pages/onlineExperience'; 
import { useEffect, useState, useMemo } from 'react';
import SuccessPage from './components/SuccessPage';
import Login from './components/login';
import Signup from './components/signup';
import Admin from './components/admin'
import AdminListings from './components/adminlistings';
import AdminAddListing from './components/adminaddlistings';
import AdminDeleteListing from './components/admindeletlistings';
import AdminBookings from './components/adminbooking';
import AdminUsers from './components/adminuser';
import UserBookingInput from './components/UserBookingInput';
import UserBookingsDisplay from './components/UserBookingsDisplay';
import AdminPasswordPage from './components/AdminPasswordPage';
// import ProtectedRoute from "./components/ProtectedRoute";
import './css/App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState('Beachfront');
  const [listingsData, setListingsData] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');

  const fetchListings = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/listings');
        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setListingsData(data);
    } catch (err) {
        console.log('Error fetching listings: ' + err.message);
    }
  };

  const filteredListings = useMemo(() => {
    let filtered = listingsData;
    console.log('Current search term:', searchTerm);  
    const searchTermLower = searchTerm.trim().toLowerCase();
    if (searchTermLower) {
      filtered = listingsData.filter(listing => 
        listing.title.toLowerCase().includes(searchTermLower)
      );
      console.log('Filtered Listings after search:', filtered);  
      return filtered; 
    }
    if (activeCategory) {
      filtered = listingsData.filter(listing =>
        listing.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    return filtered;
  }, [searchTerm, activeCategory, listingsData]);
  useEffect(() => {
    fetchListings();  
  }, []);
  const handleCategorySelect = (category) => {
    setActiveCategory(category);
  };
  return (
    <Router> 
      <div className="App">
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <SearchBar 
                  setActiveCategory={setActiveCategory} 
                  setSearchTerm={setSearchTerm} 
                  categories={['Beachfront', 'Mountain', 'Urban']} 
                />
                <Categories 
                  categories={['Beachfront', 'Mountain', 'Urban']} 
                  onSelectCategory={handleCategorySelect} 
                  activeCategory={activeCategory} 
                />
                <div className="listings-container">
                  {filteredListings.length > 0 ? (
                    filteredListings.map((listing, index) => (
                      <ListingCard key={index} listing={listing} />
                    ))
                  ) : (
                    <p>No listings available.</p>
                  )}
                </div>
              </>
            } 
          />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/bookings" element={<UserBookingInput />} />
          <Route path="/bookings/:email" element={<UserBookingsDisplay />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/admin-password" element={<AdminPasswordPage />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/experiences" element={<Experiences />} /> 
          <Route path="/online-experiences" element={<OnlineExperiences />} /> 
          <Route path="/admin/listings" element={<AdminListings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/listings/add" element={<AdminAddListing />} />
          <Route path="/admin/listings/delete" element={<AdminDeleteListing />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          
          
          
           {/* Protected Routes 
           <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <UserBookingInput />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
           */}


        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
