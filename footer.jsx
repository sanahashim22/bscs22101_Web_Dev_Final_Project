// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <p>© 2024 Airbnb, Inc.</p>
//       <ul className="footer-links">
//         <li>Support</li>
//         <li>Community</li>
//         <li>Hosting</li>
//         <li>About</li>
//       </ul>
//       <div className="social-icons">
//         <FaFacebookF className="social-icon" />
//         <FaTwitter className="social-icon" />
//         <FaInstagram className="social-icon" />
//         <FaLinkedin className="social-icon" />
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>AirCover</li>
            <li>Anti-discrimination</li>
            <li>Disability support</li>
            <li>Cancellation options</li>
            <li>Report neighborhood concern</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Hosting</h4>
          <ul>
            <li>Airbnb your home</li>
            <li>AirCover for Hosts</li>
            <li>Hosting resources</li>
            <li>Community forum</li>
            <li>Hosting responsibly</li>
            <li>Join a free Hosting class</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Airbnb</h4>
          <ul>
            <li>Newsroom</li>
            <li>New features</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Gift cards</li>
            <li>Airbnb.org emergency stays</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Airbnb, Inc. · Terms · Sitemap · Privacy · Your Privacy Choices</p>
        <div className="footer-icons">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

