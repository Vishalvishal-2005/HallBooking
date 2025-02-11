import React, { useRef } from 'react';
import ibc from '../../asserts/images/ibc.webp';

const InvitationPreview = ({ invitation }) => {
  const previewRef = useRef();

  const bcstyle = {
    backgroundImage: `url(${ibc})`,
    backgroundSize: 'cover',
    width: '100%',
    height: '97%',
    paddingTop: '35px',
    paddingLeft: '65px',
  };
  
  return (
    <div className="preview" style={bcstyle}>
      <h2 style={{marginRight:'70px'}}>Invitation Preview</h2>
      <div ref={previewRef} className="invitation-card">
        <p style={{ fontSize: '23px', position: 'relative', top: '7vh' }}>
          Join us for the celebration of 
          <span style={{ marginLeft: '10px', fontStyle: "italic", fontSize: '28px' }}>
            {invitation.name1}
          </span>
        </p>
        <h3 style={{ position: 'relative',textAlign:'justify', left: '24%', top: '14.3vh', fontSize: '28px', fontWeight: '400', fontStyle: 'italic' }}>
          {invitation.name2}
        </h3>
        <p style={{ position: 'relative', left: '25%', top: '20.2vh', fontSize: '18px' }}>
          on {invitation.date}
        </p>
        <p style={{ position: 'relative', left: '15%', top: '20.4vh', fontSize: '18px' }}>
          at {invitation.address}, {invitation.city}<br></br>
        </p>
        <span style={{ position: 'relative', left: '-1%', top: '22.7vh', fontSize: '18px' }}>
          Your presence would make the occasion even more special
        </span>
      </div>
    </div>
  );
};

export default InvitationPreview;
