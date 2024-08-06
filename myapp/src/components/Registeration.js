import React, { useState } from 'react';

const Registration = () => {
  const initialFormState = { id: null,name:'', totalmembers: '', arrival: '',departure:'', event: '', number: '', date: '' };
  const [user, setUser] = useState(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('User before adding:', user);
    if (!user.name || !user.event || !user.number || !user.date||!user.totalmembers) return;
    try {
      const res = await fetch('http://localhost:3060/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const newUser = await res.json();
        alert("Sent Successfully");
        console.log(newUser);
        setUser(initialFormState);
      } else {
        const errorText = await res.text();
        alert("Failed to Send");
        console.log(errorText);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to Send");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', height: '95%' }}>
      <h1 style={{ marginTop: '-10px', fontSize: '21px' }}>Request a Quote</h1>
      <div className="rcontainer">
        <label style={{ marginTop: '19px' }}>
          What's Your Name?
          <input type="text" name="name" placeholder='Name' value={user.name} onChange={handleInputChange} />
        </label>
        <label style={{ marginTop: '19px' }}>
          How many Members?
          <input type="text" name="totalmembers" placeholder='TotalMembers' value={user.totalmembers} onChange={handleInputChange} />
        </label>
        <label style={{ marginTop: '19px' }}>
          ArrivalTime?
          <input type="text" name="arrival" placeholder='ArrivalTime' value={user.arrival} onChange={handleInputChange} />
        </label>
        <label style={{ marginTop: '19px' }}>
          DepartureTime?
          <input type="text" name="departure" placeholder='DepartureTime' value={user.departure} onChange={handleInputChange} />
        </label>
        <label style={{ marginTop: '19px' }}>
          What's your Mobile No?
          <input type="text" name="number" placeholder='Mobile No:' value={user.number} onChange={handleInputChange} />
        </label>
        <label style={{ marginTop: '19px' }}>
          What's your Event Type?
          <input type="text" name="event" placeholder='Event' value={user.event} onChange={handleInputChange} />
        </label>
        <label style={{ marginTop: '19px' }}>
          Event date?
          <input type="date" name="date" value={user.date} onChange={handleInputChange} />
        </label>
        <p><input style={{ position: 'relative', left: '-48%' }} type="checkbox" />Remember Me</p>
        <label style={{ marginTop: '19px' }}>
          <input type="submit" value='Get Your Quote' style={{ backgroundColor: 'tomato', height: '41px', fontSize: '18px', color: '#fff', borderRadius: '5px' }} />
        </label>
      </div>
    </form>
  );
}

export default Registration;
