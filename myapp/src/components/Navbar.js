import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import ph from "../asserts/images/placeholder.png";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();  // For redirection after logout
  const show = () => setVisible(true);
  const close = () => setVisible(false);

  const customStyles = {
    content: {
      width: '7%',
      height: '18%',
      margin: 'auto',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa',
      transform: 'translate(660%, -175%)',
      zIndex: '1000',
    },
    Link: {
      textDecoration: 'none',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  };

  // Handle logout
  const handleLogout = () => {
    // Remove the token from localStorage or sessionStorage
    localStorage.removeItem('token');  // or sessionStorage.removeItem('token');

    // You can also clear any other session-related data here

    // Redirect the user to the SignIn page
    navigate('/signin');
  };

  return (
    <div className="navbar-container">
      <div className="title">
        <img src={ph} alt="Logo" className="logo" />
        <p>VenueTrack</p>
      </div>
      <div className="navbar">
        <div><Link to='/home' style={{ textDecoration: 'none', color: '#ffff' }}>HOME</Link></div>
        <div><Link to="/venues" style={{ textDecoration: 'none', color: '#ffff' }}>VENUES</Link></div>
        <div><Link to="/venders" style={{ textDecoration: 'none', color: '#ffff' }}>VENDORS</Link></div>
        <div><Link to="/invitation" style={{ textDecoration: 'none', color: '#ffff' }} target="_blank">E-INVITATIONS</Link></div>
        <div><Link to="/mybooking" style={{ textDecoration: 'none', color: '#ffff' }}>MY_BOOKINGS</Link></div>
      </div>
      <span>
        <FontAwesomeIcon
          icon={faCircleUser}
          onClick={show}
          style={{
            float: 'right',
            position: 'absolute',
            top: '10%',
            color: 'black',
            left: '97%',
          }}
          size='2x'
        ></FontAwesomeIcon>
      </span>
      <Modal
        isOpen={visible}
        onRequestClose={close}
        style={customStyles}
        contentLabel="Profile Modal"
      >
        
        <div
          onClick={() => { handleLogout(); close(); }}
          style={{ color: '#000000', textDecoration: 'none', cursor: 'pointer' }}
        >
          Log Out
        </div>
      </Modal>
    </div>
  );
}

export default Navbar;
