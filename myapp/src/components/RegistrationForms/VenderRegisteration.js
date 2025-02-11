import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../asserts/reg.css';
import { useUser } from '../UserContext';

const VenderRegisteration = ({ onClose, selectedVendor }) => {
  const { user } = useUser(); // User is stored directly, no need for user.id

  const [formData, setFormData] = useState({
    rname: '',
    remail: '',
    rmobile: '',
    rdate: '',
    rlocation: '',
    vendorId: selectedVendor?.id || '', // Updated to `id` instead of `_id`
  });

  useEffect(() => {
    console.log("User:", user);
    console.log("Selected Vendor:", selectedVendor);
  }, [user, selectedVendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("User not found. Please log in.");
      return;
    }
    if (!selectedVendor || !selectedVendor.id) { // Changed `_id` to `id`
      alert("Vendor not selected.");
      return;
    }

    const requestData = {
      rname: formData.rname,
      remail: formData.remail,
      rmobile: formData.rmobile,
      rdate: formData.rdate,
      rlocation: formData.rlocation,
      vendorId: selectedVendor.id, // Directly use `id`
    };

    console.log("Sending Data:", requestData);

    try {
      const response = await axios.post(`http://localhost:3060/api/bookings/${user}`, requestData); // Use user directly

      if (response.status === 200) {
        alert('Booking Successful!');
        onClose();
      } else {
        alert('Booking Failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while booking. Check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '50%', height: '100%', position: 'relative', left: '15%' }}>
      <FontAwesomeIcon onClick={onClose} style={{ color: 'black', marginLeft: '100%' }} icon={faClose} size="2x" />
      <h1 style={{ marginTop: '-10px' }}>Book {selectedVendor?.name}</h1>

      {/* Vendor Details */}
      {selectedVendor && (
        <div className="selected-vendor-info" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={selectedVendor.imageUrl} alt={selectedVendor.name} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <h3>{selectedVendor.name}</h3>
          <p>{selectedVendor.description}</p>
        </div>
      )}

      <div className="rcontainer">
        <label>What's your Name?</label>
        <input type="text" name="rname" placeholder="Name" value={formData.rname} onChange={handleChange} required />

        <label>What's your Email?</label>
        <input type="email" name="remail" placeholder="Email" value={formData.remail} onChange={handleChange} required />

        <label>What's your Mobile No?</label>
        <input type="text" name="rmobile" placeholder="Mobile No" value={formData.rmobile} onChange={handleChange} required />

        <label>Event Location</label>
        <input type="text" name="rlocation" placeholder="Location" value={formData.rlocation} onChange={handleChange} required />

        <label>Event Date</label>
        <input type="date" name="rdate" value={formData.rdate} onChange={handleChange} required />

        <input type="submit" value="Book Vendor" style={{ backgroundColor: 'tomato', height: '41px', fontSize: '18px', color: '#fff', borderRadius: '5px' }} />
      </div>
    </form>
  );
};

export default VenderRegisteration;
