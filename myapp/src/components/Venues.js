import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faBuildingColumns, faSackDollar, faLocationDot as solidLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useState } from 'react';
import Modal from 'react-modal';
import bcimg from "../asserts/images/background.jpg";
import greet from "../asserts/images/greet.jpg";
import v1 from "../asserts/images/v1.jpeg";
import v2 from "../asserts/images/v2.webp";
import v3 from "../asserts/images/v3.jpeg";
import '../asserts/venues.css';
import Footer from './Footer.jsx';
import Navbar from './Navbar';
import Registeration from './Registeration';

const venuesData = [
  {
    img: v2,
    name: "Master Hall",
    description: "Elegant",
    location: "NTF Road",
    price: "Rs.65000 Half Day Rent",
    rating: 4.2,
  },
  {
    img: v1,
    name: "Zoya Residency",
    description: "Star Banquet Hall",
    location: "Kanpur Highway",
    price: "Rs.75000 Half Day Rent",
    rating: 4.3,
  },
  {
    img: v3,
    name: "Charlie Residency",
    description: "Special Banquet Hall",
    location: "Mount Road",
    price: "Rs.50000 Half Day Rent",
    rating: 4.5,
  },
  {
    img: greet,
    name: "Cando Residency",
    description: "tower Hall",
    location: "Mount Road",
    price: "Rs.50000 Half Day Rent",
    rating: 4.5,
  },
];

const cities = ["Chennai", "Delhi", "Mumbai", "Hyderabad", "Jaipur", "Bangalore"];
const budgets = ["Under 10000 Rs", "10001 Rs to 20000 Rs", "20001 Rs to 30000 Rs", "30001 Rs to 50000 Rs", "50001 Rs to 75000 Rs", "100000 Rs +"];
const ratings = ["Under 1", "Between 1 and 2", "Between 2 and 3", "Between 3 and 4", "Between 4 and 5", "Above 5"];

function Venues({ addUser }) {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const bcstyle = {
    backgroundImage: `url(${bcimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '40vh',
    width: '100vw',
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

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, venuesData.length - itemsPerPage));
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const paginatedVenues = venuesData.slice(currentIndex, currentIndex + itemsPerPage);

  const renderFilterOptions = (label, options) => (
    <>
      <FormLabel id={`filter-${label}`} style={{ marginLeft: '-12px', color: 'tomato', fontSize: '18px' }}>{label}</FormLabel>
      <RadioGroup aria-labelledby={`filter-${label}`} defaultValue="female" name={`filter-${label}`}>
        {options.map((option, index) => (
          <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </>
  );

  return (
    <div className="hcontainer">
      <div className="header" style={bcstyle}>
        <Navbar />
        <h2>For You Get the Best Venue</h2>
        <input type="text" placeholder="Search" className="search" />
        <input type="text" placeholder="Location" className="search" />
        <div className="searb">search</div>
      </div>

      <div className="vscenter">
        <div className="filter">
          <h2>Filter Your Search</h2>
          <FormControl style={{ marginLeft: '43px' }}>
            {renderFilterOptions("Cities", cities)}
            {renderFilterOptions("Budget", budgets)}
            {renderFilterOptions("Rating", ratings)}
          </FormControl>
        </div>

        {paginatedVenues.map((venue, index) => (
          <div className="scard" key={index}>
            <img src={venue.img} alt={`venue${index + 1}`} />
            <div className="content">
              <h2>{venue.name}</h2>
              <p><FontAwesomeIcon style={{ color: 'black' }} icon={faBuildingColumns} size="1x" /> {venue.description}</p>
              <p><FontAwesomeIcon style={{ color: 'black' }} icon={solidLocationDot} size="1x" /> {venue.location} <FontAwesomeIcon style={{ color: 'black', marginLeft: '12%' }} icon={faSackDollar} size="1x" /> {venue.price}</p>
              <p><FontAwesomeIcon style={{ color: 'black' }} icon={regularStar} size="1x" /> {venue.rating}</p>
              <button onClick={() => setVisible(true)}>Request Quote</button>
              <Modal isOpen={visible} style={customStyles} onRequestClose={() => setVisible(false)} contentLabel="Request Quote Modal">
                <Registeration onClose={() => setVisible(false)} addUser={addUser} />
              </Modal>
            </div>
          </div>
        ))}
      <div className="pagination">
        <button onClick={handlePrevClick} disabled={currentIndex === 0}>Previous</button>
        <button onClick={handleNextClick} style={{marginLeft:'250%'}} disabled={currentIndex + itemsPerPage >= venuesData.length}>Next</button>
      </div>
      </div>


      <Footer />
    </div>
  );
}

export default Venues;
