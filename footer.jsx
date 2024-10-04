import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 Airbnb, Inc.</p>
      <ul className="footer-links">
        <li>Support</li>
        <li>Community</li>
        <li>Hosting</li>
        <li>About</li>
      </ul>
      <div className="social-icons">
        <FaFacebookF className="social-icon" />
        <FaTwitter className="social-icon" />
        <FaInstagram className="social-icon" />
        <FaLinkedin className="social-icon" />
      </div>
    </footer>
  );
};

export default Footer;
