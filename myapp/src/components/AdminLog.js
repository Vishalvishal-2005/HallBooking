// AdminLog.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminLog = ({ logins = [] }) => { // Provide a default empty array
  return (
    <div className="admin-body">
      <div className="header">
        <Link to="/AdminUsers" style={{ textDecoration: 'none' }}>
          <div>DashBoard</div>
        </Link>
        <Link to="/Admin" style={{ textDecoration: 'none' }}>
          <div>Bookings</div>
        </Link>
        <Link to="/AdminVender" style={{ textDecoration: 'none' }}>
          <div>Users</div>
        </Link>
        <Link to="/vendorbooked" style={{ textDecoration: 'none' }}>
          <div>Vendors Booked</div>
        </Link>
        <Link to="/SignIn" style={{ textDecoration: 'none' }}>
          <div>Sign Out</div>
        </Link>
      </div>
      <div className="Appbar">
        <p>Users</p>
        <input type="text" name="search" placeholder="Search" />
      </div>
      <div style={{ marginLeft: '60px' }}>
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
                <td>{user.username}</td> {/* Adjust property name as needed */}
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
