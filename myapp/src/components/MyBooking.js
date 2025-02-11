import React from 'react';
import { Link } from "react-router-dom";
import bcimg from "../asserts/images/background.jpg";
import grocery from "../asserts/images/venues.png";
import venues from "../asserts/images/wedding.png";
import '../asserts/mybookings.css';
import Dropdown from './Dropdown';
import Navbar from './Navbar';
const bcstyle = {
  backgroundImage: `url(${bcimg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '40vh',
  width:'100vw',
};

const MyBooking = ({ users = [],vendorbooked=[],setVendorbooked}) => {
  return (
    <div className="hcontainer">
      <div className="header" style={bcstyle}>
        <Navbar />
        <h2>Find & Book The Best Venue For Every Single Event</h2>
        <Dropdown />
      </div>
   <div className='mybook-container' style={{position:'absolute',top:'20%',left:'-10%',display:'flex'}}>
   <Link to="/venuesbookings" style={{color:'#000000',textDecoration:'none'}}>
  <div>VENUES BOOKINGS<br></br>
  <img src={venues} style={{height:'180px',width:'180px'}} alt='venues' />
  </div>
</Link>

<Link to="/vendorsbookings" vendorbooked={vendorbooked} setVendorbooked={setVendorbooked} style={{color:'#000000',textDecoration:'none',marginLeft:'20%'}}>
  <div>VENDORS BOOKINGS<br></br>
  <img src={grocery} style={{height:'180px',width:'180px'}} alt='grocery' />
  </div>
</Link>

   </div>
    </div>
  );
};

export default MyBooking;
