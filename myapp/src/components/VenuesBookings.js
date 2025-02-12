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

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const { user } = useUser();

  useEffect(() => {
    console.log("User MyBooking:", user); 
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
