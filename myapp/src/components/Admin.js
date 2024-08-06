import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../asserts/Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3060/api/admins')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
    (user.event && user.event.toLowerCase().includes(search.toLowerCase())) ||
    (user.number && user.number.toLowerCase().includes(search.toLowerCase())) ||
    (user.date && user.date.toLowerCase().includes(search.toLowerCase())) ||
    (user.totalmembers && user.totalmembers.toLowerCase().includes(search.toLowerCase())) ||
    (user.arrival && user.arrival.toLowerCase().includes(search.toLowerCase())) ||
    (user.departure && user.departure.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="admin-body">
      <div className="header">
        <Link to="/AdminUsers" style={{ textDecoration: 'none' }}><div>DashBoard</div></Link>
        <Link to="/Admin" style={{ textDecoration: 'none' }}><div>Bookings</div></Link>
        <Link to="/AdminVender" style={{ textDecoration: 'none' }}><div>Users</div></Link>
        <Link to="/vendorbooked" style={{ textDecoration: 'none' }}>
          <div>Vendors Booked</div>
        </Link>
        
        <Link to="/SignIn" style={{ textDecoration: 'none' }}><div>Sign Out</div></Link>
      </div>
      <div className="Appbar">
        <p>Bookings</p>
        <input type="text" name="search" onChange={handleSearchChange} value={search} placeholder="Search" />
      </div>
      <div className="form-container" style={{ marginLeft: '12%' }}>
        <div>
          <h2>Hall Booked</h2>
          <table className='table table-striped'>
            <thead>
              <tr>
                <td className='font-weight-bold'>Name</td>
                <td className='font-weight-bold'>Total Members</td>
                <td className='font-weight-bold'>Arrival</td>
                <td className='font-weight-bold'>Departure</td>
                <td className='font-weight-bold'>Event</td>
                <td className='font-weight-bold'>Mobile No</td>
                <td className='font-weight-bold'>Date</td>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.totalmembers}</td>
                    <td>{user.arrival}</td>
                    <td>{user.departure}</td>
                    <td>{user.event}</td>
                    <td>{user.number}</td>
                    <td>{user.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No users</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
