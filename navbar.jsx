

// import { useState, useEffect, useRef } from 'react';
// import { FaEllipsisV } from 'react-icons/fa'; 
// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false); 
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 500); 
//   const menuRef = useRef(); 

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
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
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 500);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);
//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <img src="https://cdn-icons-png.flaticon.com/128/2111/2111320.png" alt="Logo" className="logo" />
//         <span className="airbnb-name">airbnb</span>
//       </div>
      
//       {!isMobile && (
//         <div className="navbar-links">
//           <a href="/">Home</a>
//           <a href="/experiences">Experiences</a>
//           <a href="/online-experiences">Online Experiences</a>
//         </div>
//       )}

//       <div className="top-right-menu" ref={menuRef}>
//         <div className="logo-and-menu" onClick={toggleMenu}>
//           <FaEllipsisV className="three-dots" />
//         </div>

//         {menuOpen && (
//           <div className="dropdown-menu">
//             {isMobile && (
//               <>
//                 <a href="/" className="menu-item">Home</a>
//                 <a href="/experiences" className="menu-item">Experiences</a>
//                 <a href="/online-experiences" className="menu-item">Online Experiences</a>
//               </>
//             )}
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
import { FaEllipsisV } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500); 
  const menuRef = useRef();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
            <a href="/admin" className="menu-item">Admin</a> 
            <Link to="/bookings" className="menu-item2"><button>Past Bookings</button></Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
