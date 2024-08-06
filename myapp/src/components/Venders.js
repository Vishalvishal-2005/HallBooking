import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { React, useState } from 'react';
import Modal from 'react-modal';
import bcimg from "../asserts/images/background.jpg";
import bands from "../asserts/images/bands.png";
import travel from '../asserts/images/bus.png';
import cake from "../asserts/images/cake.png";
import photo from "../asserts/images/camera.webp";
import catering from '../asserts/images/catering.jpeg';
import cater from '../asserts/images/catering.png';
import DJ from "../asserts/images/DJ.jpeg";
import foodv from '../asserts/images/foodv.png';
import invite from '../asserts/images/invitation.png';
import make from '../asserts/images/make-up.png';
import makeup from "../asserts/images/makeup.png";
import makeupimg from "../asserts/images/makeupimg .jpeg";
import meh from "../asserts/images/mehandis.webp";
import jwel from '../asserts/images/necklace.png';
import photograph from "../asserts/images/photograph.jpeg";
import venderbc from '../asserts/images/venderbc.png';
import '../asserts/venders.css';
import Footer from './Footer.jsx';
import Navbar from './Navbar';
import VenderRegisteration from './VenderRegisteration';
function Venders({addUser}){
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  }
  
  const bcstyle={
    backgroundImage: `url(${bcimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '40vh',
    width: '100vw', 
  };
  const customStyles = {
    content: {
      width: '60%',        
      height: '87%',      
      margin: 'auto',       
      display:'flex',
      paddingLeft: '40px',     
      borderRadius: '10px', 
      backgroundColor: '#f8f9fa',
    },

    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };
  return(
    <div class="hcontainer">
            <div class="header" style={bcstyle}>
              <Navbar/>

        <h2>Find  the  best  event  vendors  for  your  occasion</h2>
        <input type="text" placeholder='Search' class="search"/>
        <input type="text" placeholder='Location' class="search"/>

        <div class="searb">search</div>
      </div>
      <div class="vcenter">
      <div class="vavailability">
          <div><img src={cake} alt="cake"></img></div>
          <div><img src={photo} alt="pc"></img></div>
          <div><img src={meh} alt="mehindi"></img></div>
          <div><img src={makeup} alt="makeup"></img></div>
          <div><img src={bands} alt="bands"></img></div>
        </div>
       <p class="popser">Popular Searches </p>

       <div class="vpopular">
       <Card sx={{ maxWidth: 325,marginLeft:'84px',boxShadow: '0 0 10px rgba(0, 0, 0, 0.566)'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={photograph}
          alt="green iguana"
        />
        <CardContent className='ccontent'>
          <Typography gutterBottom variant="h6" component="div">
            photograph
          </Typography>
          <Typography variant="body3" color="text.secondary">
            Professional photos
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={show} style={{color:'#ffff',backgroundColor:'tomato',height:'40px'}} size="small" color="primary">
          Request
        </Button>
      </CardActions>
    </Card>
       <Card sx={{ maxWidth: 325 ,marginLeft:'34px',boxShadow: '0 0 10px rgba(0, 0, 0, 0.566)'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={DJ}
          alt="green iguana"
        />
        <CardContent className='ccontent' style={{fontSize:'15px'}}>
          <Typography gutterBottom variant="h6" component="div">
            DJ
          </Typography>
          <Typography variant="body3" color="text.secondary">
            Fun & Entertainment
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" onClick={show} style={{color:'#ffff',backgroundColor:'tomato',height:'40px'}}>
          Request
        </Button>
      </CardActions>
    </Card>
       <Card sx={{ maxWidth: 325 ,marginLeft:'34px',boxShadow: '0 0 10px rgba(0, 0, 0, 0.566)'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={catering}
          alt="green iguana"
        />
        <CardContent className='ccontent' style={{fontSize:'15px'}}>
          <Typography gutterBottom variant="h6" component="div">
            Catering
          </Typography>
          <Typography variant="body3" color="text.secondary">
            Delicious foods
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={show} style={{color:'#ffff',backgroundColor:'tomato',height:'40px'}} size="small" color="primary">
          Request
        </Button>
      </CardActions>
    </Card>
    <Card sx={{ maxWidth: 325 ,marginLeft:'34px',boxShadow: '0 0 10px rgba(0, 0, 0, 0.566)'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={makeupimg}
          alt="green iguana"
        />
        <CardContent className='ccontent' style={{fontSize:'15px'}}>
          <Typography gutterBottom variant="h6" component="div">
            MakeupArtist
          </Typography>
          <Typography variant="body3" color="text.secondary">
            Beutiful faces
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={show} style={{color:'#ffff',backgroundColor:'tomato',height:'40px'}} size="small" color="primary">
          Request
        </Button>
      </CardActions>
    </Card>
        </div>
        <div className='grid'>
          <div onClick={show}><img src={make} alt="cake"></img>
          <p>MakeupArtist</p></div>
          <div onClick={show}><img src={foodv} alt="cake"></img>
          <p>Food</p></div>
          <div onClick={show}><img src={cater} alt="cake"></img>
          <p>Catering Service</p></div>
          <div onClick={show}><img src={travel} alt="cake"></img>
          <p>Travels</p></div>
          <div onClick={show}><img src={jwel} alt="cake"></img>
          <p>Jwellery & Accesseries</p></div>
          <div onClick={show}><img src={invite} alt="cake"></img>
          <p>Invitation</p></div>
        </div>
                  <button style={{width:'15%',marginLeft:'43%',marginTop:'12%'}}>For More</button>
        <div>
                </div>
      </div>
      <Footer/>
    
        <Modal
        isOpen={visible}
       style={customStyles}
        onRequestClose={() => setVisible(false)}
        contentLabel="Request Quote Modal"
      >
        <img src={venderbc} style={{width:'40%',height:'60%',marginTop:'15%'}} alt='venderbc' />
        <VenderRegisteration onClose={() => setVisible(false)} addUser={addUser}/>
      </Modal>
      </div>
  );
};

export default Venders;


      