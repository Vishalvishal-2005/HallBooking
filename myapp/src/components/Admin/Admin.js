import { faClipboard, faHouse, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../asserts/Admin.css';

const Admin = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [selectedVendor, setSelectedVendor] = useState(null); // State for selected vendor
  const [showVendorReg, setShowVendorReg] = useState(false); // State to show/hide Registration modal

  useEffect(() => {
    fetch('http://localhost:3060/api/bookings/admin/all')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) { // Check if data is an array
          setUsers(data);
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSaveClick = () => {
    if (selectedVendor) {
      fetch(`http://localhost:3060/api/admins/${selectedVendor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedVendor),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error updating venue');
          }
        })
        .then(updatedVendor => {
          setUsers(users.map(user => (user.id === updatedVendor.id ? updatedVendor : user)));
          handleCloseVendorReg();
        })
        .catch(error => console.error('Error:', error));
    }
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:3060/api/admins/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setUsers(users.filter(user => user.id !== id));
        } else {
          throw new Error('Error deleting vendor');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleUpdateClick = (vendor) => {
    setSelectedVendor(vendor);
    setShowVendorReg(true);
  };

  const handleCloseVendorReg = () => {
    setShowVendorReg(false);
    setSelectedVendor(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedVendor(prevVendor => ({
      ...prevVendor,
      [name]: value
    }));
  };

  const filteredUsers = users.filter(user =>
    (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
    (user.event && user.event.toLowerCase().includes(search.toLowerCase())) ||
    (user.number && user.number.toLowerCase().includes(search.toLowerCase())) ||
    (user.date && user.date.toLowerCase().includes(search.toLowerCase())) ||
    (user.totalmembers && user.totalmembers.toString().includes(search)) ||
    (user.arrival && user.arrival.toLowerCase().includes(search.toLowerCase())) ||
    (user.departure && user.departure.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="admin-body">
      <div className="header">
        <Link to="/AdminUsers" style={{ textDecoration: 'none' }}>
          <div><FontAwesomeIcon icon={faHouse}/><span style={{ marginLeft: '10px' }}>Dashboard</span></div>
        </Link>
        <Link to="/Admin" style={{ textDecoration: 'none' }}>
          <div><FontAwesomeIcon icon={faClipboard}/><span style={{ marginLeft: '10px' }}>Bookings</span></div>
        </Link>
        <Link to="/AdminVender" style={{ textDecoration: 'none' }}><div><FontAwesomeIcon icon={faUser}/><span style={{marginLeft:'10px'}}>Users</span></div></Link>

        <Link to="/vendorbooked" style={{ textDecoration: 'none' }}>
          <div><FontAwesomeIcon icon={faShop}/><span style={{ marginLeft: '10px' }}>Vendors Booked</span></div>
        </Link>
        <Link to="/adminadd" style={{ textDecoration: 'none' }}><div><FontAwesomeIcon icon={faShop}/><span style={{marginLeft:'10px'}}>VenueAdd</span></div></Link>

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
                <td className='font-weight-bold'>Actions</td>
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
                    <td>
                      <Button variant="primary" onClick={() => handleUpdateClick(user)}>Update</Button>
                      <Button variant="danger" onClick={() => handleDeleteClick(user.id)} style={{ marginLeft: '10px' }}>Delete</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No users</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showVendorReg} onHide={handleCloseVendorReg}>
        <Modal.Header closeButton>
          <Modal.Title>Update Venue Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVendor && (
            <div>
              <label>Name:
                <input
                  type="text"
                  name="name"
                  placeholder='Username'
                  value={selectedVendor.name || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>Total Members:
                <input
                  type="text"
                  placeholder='0-1000'
                  name="totalmembers"
                  value={selectedVendor.totalmembers || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>Arrival:
                <input
                  type="text"
                  placeholder='0.00'
                  name="arrival"
                  value={selectedVendor.arrival || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>Departure:
                <input
                  type="text"
                  placeholder='24.00'
                  name="departure"
                  value={selectedVendor.departure || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>Mobile No:
                <input
                  type="text"
                  placeholder='+91'
                  name="number"
                  value={selectedVendor.number || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>Event:
                <input
                  type="text"
                  placeholder='Event'
                  name="event"
                  value={selectedVendor.event || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>Date:
                <input
                  type="date"
                  name="date"
                  value={selectedVendor.date || ''}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseVendorReg}>Close</Button>
          <Button variant="primary" onClick={handleSaveClick}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
