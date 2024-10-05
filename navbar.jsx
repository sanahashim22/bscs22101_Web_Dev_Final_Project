// import { useState, useEffect, useRef } from 'react';
// import { FaEllipsisV } from 'react-icons/fa'; // Import the 3-dot icon

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false); // State for dropdown visibility
//   const menuRef = useRef(); // Reference for detecting clicks outside

//   // Function to toggle the dropdown menu
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   // Effect to close the dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [menuRef]);

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <img src="https://cdn-icons-png.flaticon.com/128/2111/2111320.png" alt="Logo" className="logo" />
//         <span className="airbnb-name">airbnb</span>
//       </div>
//       <div className="navbar-links">
//         <a href="/">Home</a>
//         <a href="/experiences">Experiences</a>
//         <a href="/online-experiences">Online Experiences</a>
//       </div>
//       <div className="top-right-menu" ref={menuRef}>
//         <div className="logo-and-menu" onClick={toggleMenu}>
//           <FaEllipsisV className="three-dots" />
//         </div>

//         {menuOpen && (
//           <div className="dropdown-menu">
//             <a href="/login" className="menu-item">Login</a>
//             <a href="/signup" className="menu-item">Sign Up</a>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import { useState, useEffect, useRef } from 'react';
import { FaEllipsisV } from 'react-icons/fa'; // Import the 3-dot icon

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State for dropdown visibility
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500); // State for mobile screen
  const menuRef = useRef(); // Reference for detecting clicks outside

  // Function to toggle the dropdown menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Effect to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  // Effect to handle screen resize and determine if it is mobile or not
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="https://cdn-icons-png.flaticon.com/128/2111/2111320.png" alt="Logo" className="logo" />
        <span className="airbnb-name">airbnb</span>
      </div>
      
      {!isMobile && (
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/experiences">Experiences</a>
          <a href="/online-experiences">Online Experiences</a>
        </div>
      )}

      <div className="top-right-menu" ref={menuRef}>
        <div className="logo-and-menu" onClick={toggleMenu}>
          <FaEllipsisV className="three-dots" />
        </div>

        {menuOpen && (
          <div className="dropdown-menu">
            {isMobile && (
              <>
                <a href="/" className="menu-item">Home</a>
                <a href="/experiences" className="menu-item">Experiences</a>
                <a href="/online-experiences" className="menu-item">Online Experiences</a>
              </>
            )}
            <a href="/login" className="menu-item">Login</a>
            <a href="/signup" className="menu-item">Sign Up</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
