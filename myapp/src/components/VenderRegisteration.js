import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import '../asserts/reg.css';

const VenderRegisteration = ({ onClose }) => {
  const [formData, setFormData] = useState({
    rname: '',
    remail: '',
    rmobile: '',
    revent: '',
    rdate: '',
    rlocation: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3060/api/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Sent Successfully');
        onClose();
      } else {
        alert('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending data');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '50%', height: '100%', position: 'relative', left: '11%' }}>
      <FontAwesomeIcon onClick={onClose} style={{ color: 'black', marginLeft: '93%' }} icon={faClose} size="2x" />
      <h1 style={{ marginTop: '-10px' }}>Request Your Vendor</h1>
      <div className="rcontainer">
        <label style={{ marginTop: '16px' }}>
          What's your Name?
          <input type="text" name="rname" placeholder="Name" value={formData.rname} onChange={handleChange} />
        </label>
        <label style={{ marginTop: '16px' }}>
          What's your email?
          <input type="email" name="remail" placeholder="Email" value={formData.remail} onChange={handleChange} />
        </label>
        <label style={{ marginTop: '16px' }}>
          What's your mobile no?
          <input type="text" name="rmobile" placeholder="Mobile No" value={formData.rmobile} onChange={handleChange} />
        </label>
        <label style={{ marginTop: '16px' }}>
          What's your Location?
          <input type="text" name="rlocation" placeholder="Location" value={formData.rlocation} onChange={handleChange} />
        </label>
        <label style={{ marginTop: '16px' }}>
          Event date?
          <input type="date" name="rdate" value={formData.rdate} onChange={handleChange} />
        </label>
        <p><input style={{ position: 'relative', left: '-48%' }} type="checkbox" />Remember Me</p>
        <label style={{ marginTop: '16px' }}>
          <input type="submit" value="Get Your Quote" style={{ backgroundColor: 'tomato', height: '41px', fontSize: '18px', color: '#fff', borderRadius: '5px' }} />
        </label>
      </div>
    </form>
  );
};

export default VenderRegisteration;
