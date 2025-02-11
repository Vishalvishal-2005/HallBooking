
  import { faClipboard, faHouse, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
// AdminAddVenue.js
import React, { useState } from 'react';

const AdminAddVenue = () => {
  const [venue, setVenue] = useState({
    name: '',
    description: '',
    location: '',
    price: '',
    rating: '',
    img: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVenue({
      ...venue,
      [name]: name === 'price' || name === 'rating' ? parseFloat(value.replace(/[^\d.]/g, '')) : value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3060/api/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venue),
      });
  
      if (response.ok) {
        alert('Venue added successfully');
        setVenue({
          name: '',
          description: '',
          location: '',
          price: '',
          rating: '',
          img: '',
        });
      } else {
        const errorData = await response.json(); // To get more details about the error
        console.error('Failed to add venue:', errorData);
        alert('Failed to add venue');
      }
    } catch (error) {
      console.error('Error adding venue:', error);
      alert('Failed to add venue');
    }
  };
  

  return (
    <div className="admin-body">
      <div className="header">
      <Link to="/AdminUsers" style={{ textDecoration: 'none'}}><div><FontAwesomeIcon icon={faHouse}/><span style={{marginLeft:'10px'}}>DashBoard</span></div></Link>
        <Link to="/Admin" style={{ textDecoration: 'none' }}><div><FontAwesomeIcon icon={faClipboard}/><span style={{marginLeft:'10px'}}>Bookings</span></div></Link>
        <Link to="/AdminVender" style={{ textDecoration: 'none' }}><div><FontAwesomeIcon icon={faUser}/><span style={{marginLeft:'10px'}}>Users</span></div></Link>
        <Link to="/vendorbooked" style={{ textDecoration: 'none' }}><div><FontAwesomeIcon icon={faShop}/><span style={{marginLeft:'10px'}}>Vendors Booked</span></div></Link>
        <Link to="/adminadd" style={{ textDecoration: 'none' }}><div><FontAwesomeIcon icon={faShop}/><span style={{marginLeft:'10px'}}>VenueAdd</span></div></Link>

        <Link to="/SignIn" style={{ textDecoration: 'none' }}>
          <div>Sign Out</div>
        </Link>
      </div>
      <div className="Appbar">
        <p>Users</p>
        <input type="text" name="search" placeholder="Search" />
      </div>
      <div style={{ marginLeft: '100px' }}>
        <h2>Add Venues</h2>
        <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={venue.name} onChange={handleInputChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={venue.description} onChange={handleInputChange} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={venue.location} onChange={handleInputChange} required />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={venue.price} onChange={handleInputChange} required />
        </label>
        <label>
          Rating:
          <input type="number" name="rating" value={venue.rating} onChange={handleInputChange} step="0.1" min="0" max="5" required />
        </label>
        <label>
          Image URL:
          <input type="text" name="img" value={venue.img} onChange={handleInputChange} required />
        </label>
        <button type="submit">Add Venue</button>
      </form>
      </div>
    </div>
  );

};

export default AdminAddVenue;
