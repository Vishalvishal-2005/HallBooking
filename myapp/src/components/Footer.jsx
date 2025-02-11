import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4 mt-4">
      <div className="container" style={{color:'black'}}>
        <div className="row">
          <div className="col-md-6">
            <h4>Contact Info</h4>
            <p style={{ fontSize: '21px' }}>Email: 727822tuad061@skct.edu.in</p>
            <p style={{ fontSize: '21px' }}>Phone: +91 1234567890</p>
          </div>
          <div className="col-md-6 text-md-right" >
            <h4 style={{marginLeft:'70%'}}>Follow Us</h4>
            <div className="d-flex justify-content-md-end justify-content-center" style={{marginRight:'7%'}} >
              <a href="#" className="text-white mx-2"><FontAwesomeIcon icon={faFacebook} style={{color:'black'}} size="2x" /></a>
              <a href="#" className="text-white mx-2"><FontAwesomeIcon icon={faTwitter} style={{color:'black'}} size="2x" /></a>
              <a href="#" className="text-white mx-2"><FontAwesomeIcon icon={faInstagram} style={{color:'black'}} size="2x" /></a>
              <a href="#" className="text-white mx-2"><FontAwesomeIcon icon={faWhatsapp} style={{color:'black'}} size="2x" /></a>
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
