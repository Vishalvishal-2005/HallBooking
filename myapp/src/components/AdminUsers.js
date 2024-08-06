import { ArcElement, Chart } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import '../asserts/Admin.css';

import status from '../asserts/images/status.png';

Chart.register(ArcElement);

const AdminUsers = ({ users = [],vendorbooked=[],logins=[]}) => {
const total=users.length+vendorbooked.length+logins.length;

  const data = {
    labels: ['Available', 'Booked', 'Venders Booking', 'Total'],
    datasets: [
      {
        label: 'Status',
        data: [logins.length, users.length, vendorbooked.length, total], // Replace with actual data if available
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',   // Cyan
          'rgba(54, 162, 235, 0.6)',   // Blue
          'rgba(255, 206, 86, 0.6)',   // Yellow
          'rgba(153, 102, 255, 0.6)',  // Purple
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const colors = [
    { color: 'rgba(75, 192, 192, 0.6)', name: 'Available' },
    { color: 'rgba(54, 162, 235, 0.6)', name: 'Booked' },
    { color: 'rgba(255, 206, 86, 0.6)', name: 'Venders Booking' },
    { color: 'rgba(153, 102, 255, 0.6)', name: 'Total' },
  ];

  return (
    <div className="admin-body">
      <div className="header">
        <Link to="/AdminUsers" style={{ textDecoration: 'none' }}>
          <div>DashBoard</div>
        </Link>
        <Link to="/Admin" users={users} style={{ textDecoration: 'none' }}>
          <div>Bookings</div>
        </Link>
        <Link to="/AdminVender"  style={{ textDecoration: 'none' }}>
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
        <p>DashBoard</p>
        <input type="text" name="search" placeholder="Search" />
      </div>
      <div className="dashboard">
        <div className="st">
          <div>
            Available
            <h1>{logins.length}</h1>
          </div>
          <div>
            Booked
            <h1>{users.length}</h1>
          </div>
          <div>
            Venders Booking
            <h1>{vendorbooked.length}</h1>
          </div>
          <div>Total
            <h1>{total}</h1>
          </div>
        </div>
        <div className="admin-status">
          <Pie data={data} />
          <br />
          <ul style={{marginLeft:'35px',marginTop:'90px'}}>
            {colors.map((item, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: item.color,
                    marginRight: '10px',
                  }}
                ></div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="admin-chart">
          Chart
          <br />
          <img src={status} style={{ width: '60%' }} alt="d1" />
        </div>
    
      </div>
    </div>
  );
};

export default AdminUsers;
