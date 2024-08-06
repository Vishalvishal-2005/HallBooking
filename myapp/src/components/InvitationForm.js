import React, { useState } from 'react';

const InvitationForm = ({ updateInvitation, previewRef }) => {
  const [formData, setFormData] = useState({
    name1: '',
    name2: '',
    date: '',
    address: '',
    city: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      updateInvitation(newData);
      return newData;
    });
  };

  

  return (
    <div className="form" style={{ padding: '45px', height: '82.5%', backgroundColor: "rgba(153, 148, 245, 0.949)" }}>
      <label style={{ marginTop: '24px' }}>
        Event:
        <input type="text" name="name1" value={formData.name1} onChange={handleChange} />
      </label>
      <label style={{ marginTop: '24px' }}>
        Name:
        <input type="text" name="name2" value={formData.name2} onChange={handleChange} />
      </label>
      <label style={{ marginTop: '24px' }}>
        Event Date:
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </label>
      <label style={{ marginTop: '24px' }}>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </label>
      <label style={{ marginTop: '24px' }}>
        City:
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
      </label>
      <label style={{ marginTop: '34px' }}>
       <input type='button' style={{height:'23%',backgroundColor:'tomato'}} value='Download'  />
      </label>
    </div>
  );
};

export default InvitationForm;
