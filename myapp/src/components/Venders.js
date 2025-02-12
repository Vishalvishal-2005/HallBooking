import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import bcimg from '../asserts/images/background.jpg';
import venderbc from '../asserts/images/venderbc.png';
import '../asserts/venders.css';
import Footer from './Footer';
import Navbar from './Navbar';
import VenderRegisteration from './RegistrationForms/VenderRegisteration';
import cake from "../asserts/images/cake.png";
import photo from "../asserts/images/camera.webp";
import makeup from "../asserts/images/makeup.png";
import meh from "../asserts/images/mehandis.webp";
import bands from "../asserts/images/bands.png";
import more from '../asserts/images/more.jpg';
import cater from '../asserts/images/catering.png';
import foodv from '../asserts/images/foodv.png';
import travel from '../asserts/images/bus.png';
import jwel from '../asserts/images/necklace.png';
import make from '../asserts/images/make-up.png';
import invite from '../asserts/images/invitation.png';
import axiosInstance from './axiosinstance';
function Venders({ addUser }) {
  const [venues, setVenues] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null); // Store selected vendor
  useEffect(() => {
    axiosInstance.get('/api/vendors')
      .then(response => {
        console.log(response.data); // Debugging
        setVenues(response.data);
      })
      .catch(error => console.error('Error fetching venues:', error));
  }, []);
  

  // Show modal with selected vendor
  const show = (vendor) => {
    setSelectedVendor(vendor);
    setVisible(true);
  };

  const bcstyle = {
    backgroundImage: `url(${bcimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '40vh',
    width: '100vw',
  };

  const customStyles = {
    content: {
      width: '60%',
      height: '89%',
      margin: 'auto',
      marginLeft: '17%',
      display: 'flex',
      paddingLeft: '40px',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <div className="hcontainer">
      <div className="header" style={bcstyle}>
        <Navbar />
        <h2>Find the best event vendors for your occasion</h2>
      </div>

      {/* Vendor Categories */}
      <div className="vcenter">
        <div className="vavailability">
          <div><img src={cake} alt="cake"></img></div>
          <div><img src={photo} alt="pc"></img></div>
          <div><img src={meh} alt="mehindi"></img></div>
          <div><img src={makeup} alt="makeup"></img></div>
          <div><img src={bands} alt="bands"></img></div>
          <div><img src={more} style={{ width: '140px', height: '140px', marginTop: '-16px', marginLeft: '-13px' }} alt="more"></img></div>
        </div>
      </div>

      {/* Available Vendors Section */}
      <div className="vcenter">
        <p className="popser">Available Vendors</p>
        <div className="vpopular">
          {venues.length > 0 ? (
            venues.map((venue, index) => (
              <Card key={index} sx={{ maxWidth: 325, marginLeft: '4%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.566)' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="240"
                    image={venue.imageUrl || venderbc} // Use backend image or default
                    alt={venue.name}
                  />
                  <CardContent className='ccontent'>
                    <Typography gutterBottom variant="h6" component="div">
                      {venue.name}
                    </Typography>
                    <Typography variant="body2" component='div' sx={{ fontSize: '14px', color: 'red' }} color="text.secondary">
                      {venue.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button onClick={() => show(venue)} style={{ color: '#fff', backgroundColor: 'tomato', height: '40px' }}>
                    Request
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <p>No venues available.</p>
          )}
        </div>
      </div>

      <Footer />

      {/* Vendor Service Grid */}
      <div className='grid'>
        <div onClick={show}><img src={make} alt="makeup"></img>
          <p>Makeup Artist</p></div>
        <div onClick={show}><img src={foodv} alt="food"></img>
          <p>Food</p></div>
        <div onClick={show}><img src={cater} alt="catering"></img>
          <p>Catering Service</p></div>
        <div onClick={show}><img src={travel} alt="travel"></img>
          <p>Travels</p></div>
        <div onClick={show}><img src={jwel} alt="jewelry"></img>
          <p>Jewelry & Accessories</p></div>
        <div onClick={show}><img src={invite} alt="invitation"></img>
          <p>Invitation</p></div>
      </div>

      {/* Vendor Booking Modal */}
      <Modal
        isOpen={visible}
        style={customStyles}
        onRequestClose={() => setVisible(false)}
        contentLabel="Request Quote Modal"
      >
        <img src={selectedVendor?.imageUrl || venderbc} style={{ width: '32%', height: '56%', marginTop: '10%' }} alt='vendor' />
        <VenderRegisteration onClose={() => setVisible(false)} selectedVendor={selectedVendor} addUser={addUser} />
      </Modal>
    </div>
  );
}

export default Venders;
