import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";

/**
 * Footer component that renders the footer section of the webpage.
 * This component includes contact information and social media links.
 *
 * @returns {JSX.Element} The rendered footer element containing contact info and social media links.
 *
 * @example
 * // Usage in a React component
 * function App() {
 *   return (
 *     <div>
 *       <Header />
 *       <MainContent />
 *       <Footer />
 *     </div>
 *   );
 * }
 *
 * @throws {Error} Throws an error if the component fails to render properly.
 */
function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4 mt-4">
      <div className="container" style={{ color: 'black' }}>
        <div className="row">
          <div className="col-md-6">
            <h4>Contact Info</h4>
            <p style={{ fontSize: '21px' }}>Email: 727822tuad061@skct.edu.in</p>
            <p style={{ fontSize: '21px' }}>Phone: +91 1234567890</p>
          </div>
          <div className="col-md-6 text-md-right">
            <h4 style={{ marginLeft: '70%' }}>Follow Us</h4>
            <div className="d-flex justify-content-md-end justify-content-center" style={{ marginRight: '7%' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <FontAwesomeIcon icon={faFacebook} style={{ color: 'black' }} size="2x" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <FontAwesomeIcon icon={faTwitter} style={{ color: 'black' }} size="2x" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <FontAwesomeIcon icon={faInstagram} style={{ color: 'black' }} size="2x" />
              </a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <FontAwesomeIcon icon={faWhatsapp} style={{ color: 'black' }} size="2x" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <span>&copy; 2024 VenueTrack. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
