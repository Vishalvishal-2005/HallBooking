import { faClipboard, faHouse, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminLog = ({ logins = [] }) => { 
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
        <h2>User Details</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>
            {logins.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td> 
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLog;
