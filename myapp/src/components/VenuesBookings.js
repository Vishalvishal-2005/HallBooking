import { Button, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import bcimg from "../asserts/images/background.jpg";
import '../asserts/mybookings.css';
import Dropdown from './Dropdown';
import Navbar from './Navbar';
import { useUser } from "./UserContext";
import axiosInstance from './axiosinstance';

const bcstyle = {
  backgroundImage: `url(${bcimg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '40vh',
};

/**
 * MyBooking component that fetches and displays user bookings.
 * It allows users to cancel their bookings.
 *
 * @component
 * @returns {JSX.Element} The rendered MyBooking component.
 *
 * @example
 * // Usage of MyBooking component
 * <MyBooking />
 *
 * @throws {Error} Throws an error if fetching bookings fails or if the user is not logged in.
 */
const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const { user } = useUser();

  useEffect(() => {
    console.log("User MyBooking:", user); 
    /**
     * Asynchronously fetches booking data for the currently logged-in user.
     * If the user is not logged in, an error message is set.
     * If an error occurs during the fetch operation, it logs the error and sets an error message.
     *
     * @async
     * @function fetchBookings
     * @throws {Error} Throws an error if the fetch operation fails or if the user is not logged in.
     * @returns {Promise<void>} A promise that resolves when the booking data has been fetched and processed.
     *
     * @example
     * // Example usage of fetchBookings
     * fetchBookings()
     *   .then(() => console.log("Bookings fetched successfully"))
     *   .catch(error => console.error("Error:", error));
     */
    const fetchBookings = async () => {
      if (user) { 
        try {
          const response = axiosInstance.get(`https://hallbooking-backend-9e8d.onrender.com/api/bookings/${user}`);
          if (response.ok) {
            const data = await response.json();
            console.log("Fetched Booking Data:", data);
            setBookings(data);
          } else {
            setError("Failed to fetch bookings.");
          }
        } catch (error) {
          console.error("Error fetching bookings:", error);
          setError("Failed to fetch bookings.");
        }
      } else {
        setError("User not logged in. Please sign in first.");
      }
    };

    fetchBookings();
  }, [user]);

  /**
   * Cancels a booking by sending a DELETE request to the booking API.
   *
   * This asynchronous function takes a booking ID and an index, sends a request to delete the specified booking,
   * and updates the local state of bookings if the request is successful.
   *
   * @param {string} bookingId - The unique identifier of the booking to be canceled.
   * @param {number} index - The index of the booking in the local state array to be removed.
   *
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   *
   * @throws {Error} Throws an error if there is a network issue or if the request fails.
   *
   * @example
   * handleCancel('12345', 0)
   *   .then(() => console.log('Cancellation process completed.'))
   *   .catch(error => console.error('Cancellation failed:', error));
   */
  const handleCancel = async (bookingId, index) => {
    try {
      const response = await fetch(`https://hallbooking-backend-9e8d.onrender.com/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setBookings(prevBookings => prevBookings.filter((_, i) => i !== index));
        console.log("Booking deleted successfully");
      } else {
        const errorMessage = await response.text();
        console.error('Failed to cancel booking:', errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="hcontainer">
      <div className="header" style={bcstyle}>
        <Navbar />
        <h2>Find & Book The Best Venue For Every Single Event</h2>
        <Dropdown />
      </div>
      
      <div className='details' style={{ padding: '20px', textAlign: 'center' }}>
        {bookings.length > 0 ? (
          <Grid container spacing={4} sx={{marginTop:'24px'}} justifyContent="center">
            {bookings.map((booking, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper 
                  elevation={6} 
                  sx={{ p: 3, borderRadius: '12px', textAlign: 'left', minWidth: '300px' }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <img 
                        src={booking.venueImage} 
                        alt="Venue" 
                        style={{ width: '100%', height: '200px', borderRadius: '8px', objectFit: 'cover' }} 
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" fontWeight="bold">{booking.venueName}</Typography>
                      <Typography variant="body1"><b>Total Members:</b> {booking.totalMembers}</Typography>
                      <Typography variant="body1"><b>Event:</b> {booking.event}</Typography>
                      <Typography variant="body1"><b>Date:</b> {booking.date}</Typography>
                      <Typography variant="body1"><b>Arrival:</b> {booking.arrival}</Typography>
                      <Typography variant="body1"><b>Departure:</b> {booking.departure}</Typography>
                      <Typography variant="body1"><b>Username:</b> {booking.name}</Typography>
                      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                        ₹{booking.venuePrice}
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="error" 
                        fullWidth
                        sx={{ mt: 2 }} 
                        onClick={() => handleCancel(booking.id, index)}
                      >
                        Cancel Booking
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" color="textSecondary">No bookings yet.</Typography>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </div>
    </div>
  );
};

export default MyBooking;
