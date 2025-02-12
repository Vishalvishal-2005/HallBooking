import { faClipboard, faHouse, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap
import { Link, useNavigate } from 'react-router-dom';
import '../../asserts/Admin.css';

const VendorsBooked = ({ vendorbooked = [],setVendorbooked }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null); // State for selected vendor
  const [showVendorReg, setShowVendorReg] = useState(false); // State to show/hide Registeration modal
  const [formData, setFormData] = useState({
    rname: '',
    remail: '',
    rmobile: '',
    revent: '',
    rlocation: '',
    rdate: ''
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSaveClick = () => {
    if (selectedVendor) {
      fetch(`http://localhost:3060/api/vendors/${selectedVendor.id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Use formData to update
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error updating vendor');
          }
        })
        .then(updatedVendor => {
          // Update the vendorbooked state with the updated vendor data
          setVendorbooked(vendorbooked.map(vendor => (vendor.id === updatedVendor.id ? updatedVendor : vendor)));
          handleCloseVendorReg(); // Close the modal
        })
        .catch(error => console.error('Error:', error));
    }
  };

  const handleDeleteClick = (id) => {
    fetch(`https://hallbooking-backend-9e8d.onrender.com/api/vendors/${id}`, { 
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Remove the deleted vendor from the state
          setVendorbooked(vendorbooked.filter(vendor => vendor.id !== id));
        } else {
          throw new Error('Error deleting vendor');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleCloseVendorReg = () => {
    setShowVendorReg(false);
    setSelectedVendor(null);
  };

  const filteredVendors = vendorbooked.filter(vendor => 
    (vendor.rname && vendor.rname.toLowerCase().includes(search.toLowerCase())) ||
    (vendor.remail && vendor.remail.toLowerCase().includes(search.toLowerCase())) ||
    (vendor.revent && vendor.revent.toLowerCase().includes(search.toLowerCase())) ||
    (vendor.rmobile && vendor.rmobile.toLowerCase().includes(search.toLowerCase())) ||
    (vendor.rdate && vendor.rdate.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="admin-body">
      <div className="header">
        <Link to="/AdminUsers" style={{ textDecoration: 'none'}}><div><FontAwesomeIcon icon={faHouse}/><span style={{marginLeft:'10px'}}>DashBoard</span></div></Link>
        <Link to="/Admin" style={{ textDecoration: 'none' }}><div><FontAwesomeIcon icon={faClipboard}/><span style={{marginLeft:'10px'}}>Bookings</span></div></Link>
        <Link to="/AdminVender" style={{ textDecoration: 'none' }}><div><FontAwesomeIcon icon={faUser}/><span style={{marginLeft:'10px'}}>Users</span></div></Link>
        <Link to="/vendorbooked" style={{ textDecoration: 'none' }}><div><FontAwesomeIcon icon={faShop}/><span style={{marginLeft:'10px'}}>Vendors Booked</span></div></Link>
        <Link to="/adminadd" style={{ textDecoration: 'none' }}><div><FontAwesomeIcon icon={faShop}/><span style={{marginLeft:'10px'}}>VenueAdd</span></div></Link>

        <Link to="/signin" style={{ textDecoration: 'none' }}><div>Sign Out</div></Link>
      </div>
      <div className="Appbar">
        <p>Vendors Booked</p>
        <input type="text" name="search" onChange={handleSearchChange} value={search} placeholder="Search" />
      </div>
      <div className="form-container" style={{ marginLeft: '12%' }}>
        <div>
          <h2>Vendors Booked</h2>
          <table className='table table-striped'>
            <thead>
              <tr>
                <td className='font-weight-bold'>Name</td>
                <td className='font-weight-bold'>Email</td>
                <td className='font-weight-bold'>Event</td>
                <td className='font-weight-bold'>Location</td>
                <td className='font-weight-bold'>Mobile No</td>
                <td className='font-weight-bold'>Date</td>
                <td className='font-weight-bold'>Actions</td> {/* Added Actions column */}
              </tr>
            </thead>
            <tbody>
              {vendorbooked.length > 0 ? (
                filteredVendors.map((vendor) => (
                  <tr key={vendor.id}>
                    <td>{vendor.rname}</td>
                    <td>{vendor.remail}</td>
                    <td>{vendor.revent}</td>
                    <td>{vendor.rlocation}</td>
                    <td>{vendor.rmobile}</td>
                    <td>{vendor.rdate}</td>
                    <td>
                      <Button variant="primary" onClick={() => { 
                        setSelectedVendor(vendor);
                        setShowVendorReg(true);
                      }}>Edit</Button></td>
                      <td>
                      <Button variant="danger" onClick={() => handleDeleteClick(vendor.id)}>Delete</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No vendors booked</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showVendorReg} onHide={handleCloseVendorReg}>
        <Modal.Header closeButton>
          <Modal.Title>Update Vendor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVendor && (
            <div>
              <label style={{ marginTop: '16px' }}>
                What's your Name?
                <input
                  type="text"
                  name="rname"
                  placeholder="Name"
                  value={formData.rname}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{ marginTop: '16px' }}>
                What's your email?
                <input
                  type="email"
                  name="remail"
                  placeholder="Email"
                  value={formData.remail}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{ marginTop: '16px' }}>
                What's your mobile no?
                <input
                  type="text"
                  name="rmobile"
                  placeholder="Mobile No"
                  value={formData.rmobile}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{ marginTop: '16px' }}>
                What's your Event?
                <input
                  type="text"
                  name="revent"
                  placeholder="Event"
                  value={formData.revent}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{ marginTop: '16px' }}>
                What's your Location?
                <input
                  type="text"
                  name="rlocation"
                  placeholder="Location"
                  value={formData.rlocation}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{ marginTop: '16px' }}>
                Event date?
                <input
                  type="date"
                  name="rdate"
                  value={formData.rdate}
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

export default VendorsBooked;
