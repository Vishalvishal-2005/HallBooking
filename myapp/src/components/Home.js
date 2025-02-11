
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import cake from "../asserts/images/Fondant-Iced-Wedding-Cakes-With-Sculpted-Flowers.jpg";
import bcimg from "../asserts/images/background.jpg";
import band from "../asserts/images/band.jpg";
import br from "../asserts/images/birthday-cake.png";
import bookh from '../asserts/images/bookh.png';
import cater from "../asserts/images/caterer.jpg";
import cb from '../asserts/images/cb22-removebg-preview.png';
import banquet from "../asserts/images/city-hall.png";
import cock from "../asserts/images/cocktail.png";
import closeIcon from '../asserts/images/cross.png';
import flower from "../asserts/images/florist.jpg";
import pool from "../asserts/images/pool-party.png";
import quote from '../asserts/images/quoteh.png';
import rest from "../asserts/images/restaurant.png";
import searchh from '../asserts/images/searchh.png';
import team from "../asserts/images/team.png";
import venderbc from '../asserts/images/venderbc.png';
import eng from "../asserts/images/wedding-rings.png";
import wed from "../asserts/images/wedding.png";
import Dropdown from './Dropdown';
import Footer from './Footer';
import Navbar from './Navbar';
import Registeration from './RegistrationForms/Registeration';
import VenderRegisteration from './RegistrationForms/VenderRegisteration';
import { useUser } from '../components/UserContext';


const categories = [
  { img: wed, alt: "Wedding", text: "Wedding" },
  { img: br, alt: "Birthday", text: "Birthday" },
  { img: eng, alt: "Engagement", text: "Engagement" },
  { img: pool, alt: "Pool Party", text: "Pool Party" },
  { img: rest, alt: "Restaurants", text: "Restaurants" },
  { img: cock, alt: "Cocktail", text: "Cocktail Party" },
  { img: banquet, alt: "City", text: "Banquet" },
  { img: team, alt: "Team", text: "Corporate Party" },
];

const vendors = [
  { img: band, alt: "band", text: "Band" },
  { img: flower, alt: "flower", text: "Flowers" },
  { img: cake, alt: "cake", text: "Cake" },
  { img: cater, alt: "caterer", text: "Caterer" },

];
function Home({ setIsAuthenticated }) {
  const [visible, setVisible] = useState(false);
  const [openv, setOpenv] = useState(false);
  const [opencbv, setOpencbv] = useState(false);
  const navigate = useNavigate();
  const show = () =>{
    navigate('/venues');
  };
  const { user } = useUser();
  console.log('User from Context:', user);
  
  if (!user) {
    return <p>User not logged in. Please sign in first.</p>;
  }
  
  
  const sh = () => setOpenv(true);
  const cbsh = () => {
    setOpencbv(!opencbv);
  };

  const customStyles = {
    content: {
      width: '31%',
      height: 'auto',
      margin: 'auto',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  const customStyle = {
    content: {
      width: '67%',
      height: '95%',
      margin: 'auto',
      display: 'flex',
      paddingLeft: '40px',
      borderRadius: '10px',
      backgroundColor: 'transperant',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  const bcstyle = {
    backgroundImage: `url(${bcimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '40vh',
  };
  console.log(localStorage.getItem('data'));
  return (
    <div className="hcontainer">
      <div className="header" style={bcstyle}>
        <Navbar />
        <h2>Find & Book The Best Venue For Every Single Event</h2>
     <Dropdown/>
      </div>
      <div className="cbt" style={{ backgroundColor: '#ffff', width: '2%', cursor: 'pointer' }} onClick={cbsh}>
            {opencbv ? (
              <img 
                src={closeIcon} // Close icony
                alt="Close ChatBot" 
                style={{ width: '60px', height: '60px', marginLeft: '26px', marginTop: '26px',   transition: 'transform 0.3s ease, opacity 0.3s ease', // Add transform and opacity transitions
                  transform: 'scale(1.1)', // Slightly scale up the close icon
                  opacity: 1   }} // Smaller size for the close icon
              />
            ) : (
              <img 
                src={cb} // Chatbot icon
                alt="Open ChatBot" 
                style={{ width: '110px', height: '110px',       transition: 'transform 0.3s ease, opacity 0.3s ease, border-radius 0.3s ease', // Add transition for transform, opacity, and border-radius
                  transform: 'scale(0.9)', // Slightly scale down the chatbot icon
                  opacity: 0.8, // Slightly faded out
                  borderRadius: '50%' }} // Larger size for the chatbot icon
              />
            )}
          </div>
      <div className="hcenter">
        <table cellPadding="10%">
          <tbody>
            <tr>
              {categories.map(({ img, alt }) => (
                <td key={alt} style={{ textAlign: 'center' }}>
                  <img src={img} onClick={show} alt={alt} className="table-image" />
                  <p className="text">{alt}</p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        
        <span className="category">Vendors By Category</span>
        <div className="vender">
          <table cellPadding="10%">
            <tbody>
              <tr>
            
                {vendors.map(({ img, alt, text }) => (
                  <td key={alt} style={{ textAlign: 'center' }}>
                    <img src={img} onClick={sh} alt={alt} className="table-image" />
                    <p style={{marginTop:'10px'}} className="text">{text}</p>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className='howitworks'>
          <p>How It Works?</p>
          <div className='hw-container'>
            <div class="#">
              <img src={searchh} alt="Browse Venues" className="table-image" />
              <h4>Browse Venues</h4>
              <p>Check out the best suited Venues, compare photos, special offers and function packages.</p>
            </div>
            <div class="#">
              <img src={quote} alt="Request Quotes" className="table-image" />
              <h4>Request Quotes</h4>
              <p>Get custom quotes of your short-listed Venues at the click of GET FREE QUOTES button.</p>
            </div>
            <div class="#">
              <img src={bookh} alt="Book a Venue" className="table-image" />
              <h4>Book a Venue</h4>
              <p>Select and Book the perfect venue in no time at all. Time is money, save both.</p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Footer />
      <Modal
        isOpen={visible}
        style={customStyles}
        onRequestClose={() => setVisible(false)}
        contentLabel="Request Quote Modal"
      >
        <Registeration onClose={() => setVisible(false)} />
      </Modal> 
      <Modal
        isOpen={openv}
        style={customStyle}
        onRequestClose={() => setOpenv(false)}
        contentLabel="Vendor Registration Modal"
      >
        <img src={venderbc} style={{ width: '40%', height: '60%', marginTop: '15%' }} alt='Vendor Background' />
        <VenderRegisteration onClose={() => setOpenv(false)} />
      </Modal>
      <Modal
    isOpen={opencbv}
    contentLabel="ChatBot Modal"
    style={{
      content: {
        top: '44%',
        left: '86%',
        padding:'0',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        zIndex:'100',
        transform: 'translate(-50%, -50%)',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
      }
    }}
  >
<iframe
    allow="microphone;"
    width="350"
    height="430"
    src="https://console.dialogflow.com/api-client/demo/embedded/260387af-7df5-4749-b735-95239b7f9574">
</iframe>
      </Modal>
    </div>
  );
}

export default Home;
 