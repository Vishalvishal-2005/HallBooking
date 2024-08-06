import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import ph from "../asserts/images/placeholder.png";

function Navbar() {
  const userId = 1;
  return (
    <div className="navbar-container">
      <div className="title">
        <img src={ph} alt="Logo" className="logo" />
        <p>VenueTrack</p>
      </div>
      <div className="navbar">
        <div><Link to='/Home' style={{textDecoration:'none',color:'black'}}>HOME</Link></div>
        <div><Link to ="/venues" style={{textDecoration:'none',color:'black'}}>VENUES</Link></div>
        <div><Link to="/venders" style={{textDecoration:'none',color:'black'}}>VENDORS</Link></div>
        <div><Link to="/Invitation" style={{textDecoration:'none',color:'black'}} target="_blank">E-INVITATIONS</Link></div>
      </div>
        <span><Link to='/AdminUsers'><FontAwesomeIcon icon={faCircleUser} style={{float:'right',position:'absolute',top:'10%',color:'black',left:'95%'}} size='2x' ></FontAwesomeIcon></Link></span>
    </div>
  );
}

export default Navbar;
