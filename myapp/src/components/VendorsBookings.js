import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import bcimg from "../asserts/images/background.jpg";
import '../asserts/mybookings.css';
import Dropdown from './Dropdown';
import Navbar from './Navbar';
import { useUser } from "./UserContext"; // Import the user context
import axiosInstance from './axiosinstance';

const bcstyle = {
  backgroundImage: `url(${bcimg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '40vh',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
};

/**
 * A functional component that manages vendor bookings for a user.
 * It fetches the user's vendor bookings from an API and allows the user to cancel a booking.
 *
 * @component
 * @returns {JSX.Element} The rendered component containing the bookings and a modal for cancellation confirmation.
 *
 * @example
 * // Usage of VendorsBookings component
 * <VendorsBookings />
 *
 * @throws {Error} Throws an error if the user is not found or not logged in when attempting to fetch bookings.
 */
const VendorsBookings = () => {
  const { user } = useUser(); 
  const [vendorbooked, setVendorbooked] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!user) {
      console.error("User not found or not logged in.");
      return;
    }

    fetch(`https://hallbooking-backend-9e8d.onrender.com/api/bookings/vendor/${user}`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched Data:", data);
        setVendorbooked(data);
      })
      .catch(error => console.error('Error fetching vendor bookings:', error));
  }, [user]);

  const handleShowModal = (booking, index) => {
    setSelectedBooking({ booking, index });
    setShowModal(true);
    setSuccessMessage(""); // Reset previous success message
  };

  /**
   * Handles the cancellation of a selected booking.
   * This function checks if the selected booking is valid and then
   * sends a DELETE request to the backend API to cancel the booking.
   * If the cancellation is successful, it updates the state to reflect
   * the changes and displays a success message. If the booking data
   * is invalid or if the cancellation fails, appropriate error messages
   * are logged to the console.
   *
   * @function handleCancel
   * @throws {Error} Throws an error if the fetch request fails or if
   *                 the selected booking data is invalid.
   *
   * @example
   * // Assuming selectedBooking is set and valid
   * handleCancel();
   *
   * @example
   * // If selectedBooking is null or has no valid booking id
   * handleCancel(); // Logs "Invalid booking data:" to the console
   */
  const handleCancel = () => {
    if (!selectedBooking || !selectedBooking.booking.id) {
      console.error("Invalid booking data:", selectedBooking);
      return;
    }
  
    const { booking, index } = selectedBooking;
  
    fetch(`https://hallbooking-backend-9e8d.onrender.com/api/bookings/vendor/${booking.id}`, {  
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        const updatedBookings = vendorbooked.filter((_, i) => i !== index);
        setVendorbooked(updatedBookings);
        setSuccessMessage("Booking successfully cancelled!");
      } else {
        console.error('Failed to cancel booking');
      }
    })
    .catch(error => console.error('Error:', error));
  };
  
  
  return (
    <div className="hcontainer">
      <div className="header" style={bcstyle}>
        <Navbar />
        <h2>Find & Book The Best Venue For Every Single Event</h2>
      </div>

      {/* Bookings Section */}
      <div style={{ position: 'relative', marginTop: '20%', top: '42%' }}>
        <Row className="mt-4">
          {vendorbooked.length > 0 ? (
            vendorbooked.map((booking, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card className="shadow-lg border-0">
                  <Card.Body>
                    <Card.Title className="text-primary">{booking.vendor.category}</Card.Title>
                    <Card.Text>
                      <b>Name:</b> {booking.customerName} <br />
                      <b>Email:</b> {booking.email} <br />
                      <b>Date:</b> {booking.eventDate} <br />
                      <b>Location:</b> {booking.eventLocation} <br />
                      <b>Phone:</b> {booking.phone} <br />
                    </Card.Text>
                    <Button 
                      variant="danger" 
                      className="w-100"
                      onClick={() => handleShowModal(booking, index)}
                    >
                      Cancel Booking
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-muted text-center">No vendor bookings yet.</p>
            </Col>
          )}
        </Row>
      </div>

      {/* Bootstrap Modal for Confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage ? (
            <p className="text-success">{successMessage}</p>
          ) : (
            <p>Do you really want to cancel this booking? Charges may apply.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!successMessage ? (
            <>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                No, Keep It
              </Button>
              <Button variant="danger" onClick={handleCancel}>
                Yes, Cancel
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => setShowModal(false)}>
              OK
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VendorsBookings;
