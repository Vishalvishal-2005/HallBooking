import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography, Box, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useUser } from '../UserContext';

const Registration = ({ venue, onClose }) => {
  const { user } = useUser();
  
  const initialFormState = {
    name: '',
    totalMembers: '',
    arrival: '',
    departure: '',
    event: '',
    phone: '',
    date: '',
    venueName: venue?.name || '',
    venuePrice: venue?.price || '',
    venueImage: venue?.img || ''
  };

  const [booking, setBooking] = useState(initialFormState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!booking.name || !booking.event || !booking.phone || !booking.date || !booking.totalMembers) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...booking,
        venueName: booking.venueName,
        venuePrice: parseFloat(booking.venuePrice),
        venueImage: booking.venueImage,
      };

      const res = await fetch(`https://hallbooking-backend-9e8d.onrender.com/api/bookings/${user}/venues/${venue.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setBooking(initialFormState);
          onClose();
        }, 2500);
      } else {
        const result = await res.text();
        setError(result || "Failed to submit booking.");
      }
    } catch (error) {
      setError("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Typography color="error" align="center">User not logged in. Please sign in first.</Typography>;
  }

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        {success ? "Booking Confirmed!" : `Request a Quote for ${venue.name}`}
      </DialogTitle>
      <DialogContent>
        {success ? (
          <Box textAlign="center" sx={{ py: 7 }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
            <Typography variant="h5" sx={{ mt: 2 }}>Thank You!</Typography>
            <Typography>Your booking for <b>{venue.name}</b> has been confirmed.</Typography>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Name" name="name" value={booking.name} onChange={handleInputChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="number" label="Total Members" name="totalMembers" value={booking.totalMembers} onChange={handleInputChange} required />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth type="time" label="Arrival Time" name="arrival" value={booking.arrival} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth type="time" label="Departure Time" name="departure" value={booking.departure} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Event Type" name="event" value={booking.event} onChange={handleInputChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="tel" label="Mobile Number" name="phone" value={booking.phone} onChange={handleInputChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="date" label="Event Date" name="date" value={booking.date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} required />
              </Grid>
            </Grid>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
        {success ? (
          <Button variant="contained" color="primary" onClick={onClose}>OK</Button>
        ) : (
          <>
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Confirm Booking"}
            </Button>
            <Button variant="outlined" onClick={onClose} disabled={loading}>Cancel</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Registration;
