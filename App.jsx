// // App.jsx
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/navbar';
// import SearchBar from './components/searchbar';
// import Categories from './components/categories';
// import ListingCard from './components/listingcard';
// import ListingDetails from './components/ListingDetails';
// import Booking from './components/BookingPage';
// import Footer from './components/footer';
// import Experiences from './pages/experience'; 
// import mockListings from './components/mocklisting';
// import OnlineExperiences from './pages/onlineExperience'; 
// import { useEffect, useState } from 'react';
// import SuccessPage from './components/SuccessPage';
// import './css/App.css';

// function App() {
//   const [activeCategory, setActiveCategory] = useState('Beachfront'); 
//   const [listingsData, setListingsData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   const updateListings = () => {
//     let filteredListings = [];

//     if (searchTerm) {
//       for (const category in mockListings) {
//         const categoryListings = mockListings[category].filter(listing =>
//           listing.title.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         filteredListings = filteredListings.concat(categoryListings);
//       }

//       if (filteredListings.length === 0) {
//         filteredListings = mockListings[activeCategory] || [];
//       }
//     } else {
//       filteredListings = mockListings[activeCategory] || [];
//     }

//     console.log('Filtered Listings:', filteredListings); 
//     setListingsData(filteredListings);
//   };

//   useEffect(() => {
//     updateListings();
//   }, [activeCategory, searchTerm]);

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
//                   categories={Object.keys(mockListings)} 
//                 />
//                 <Categories 
//                   categories={Object.keys(mockListings)} 
//                   onSelectCategory={handleCategorySelect} 
//                   activeCategory={activeCategory} 
//                 />
//                 <div className="listings-container">
//                   {listingsData.map((listing, index) => (
//                     <ListingCard key={index} listing={listing} />
//                   ))}
//                 </div>
//               </>
//             } 
//           />
//            <Route path="/listing/:id" element={<ListingDetails />} />
//            <Route path="/booking/:id" element={<Booking />} />
//            <Route path="/success" element={<SuccessPage />} />
//           <Route path="/experiences" element={<Experiences />} /> 
//           <Route path="/online-experiences" element={<OnlineExperiences />} /> 
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
import { useEffect, useState } from 'react';
import SuccessPage from './components/SuccessPage';
import './css/App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState('Beachfront');
  const [listingsData, setListingsData] = useState([]);  // State for the fetched listings
  const [filteredListings, setFilteredListings] = useState([]); // Separate state for filtered listings
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch listings from the API
  const fetchListings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/listings');
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setListingsData(data);  // Set the fetched data to listingsData state
      setFilteredListings(data); // Set the fetched data to filtered listings as well
    } catch (err) {
      console.log('Error fetching listings: ' + err.message);  // Handle errors
    }
  };

  // Update listings based on category and search term
  const updateListings = () => {
    let filtered = listingsData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by active category
    if (activeCategory) {
      filtered = filtered.filter(listing =>
        listing.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    setFilteredListings(filtered); // Update the filtered listings
    console.log('Filtered Listings:', filtered);
  };

  useEffect(() => {
    fetchListings();  // Fetch listings on component mount
  }, []);

  useEffect(() => {
    updateListings();  // Update listings whenever activeCategory or searchTerm changes
  }, [activeCategory, searchTerm, listingsData]);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSearchTerm('');  // Clear search term when category is changed
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
                  categories={['Beachfront', 'Mountain', 'Urban']} // Example categories
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
           <Route path="/booking/:id" element={<Booking />} />
           <Route path="/success" element={<SuccessPage />} />
          <Route path="/experiences" element={<Experiences />} /> 
          <Route path="/online-experiences" element={<OnlineExperiences />} /> 
          <Route path="/listing/:title" element={<ListingDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
