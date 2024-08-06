import React, { useRef, useState } from 'react';
import ibc from "../asserts/images/ibc.jpeg";
import InvitationForm from './InvitationForm';
import InvitationPreview from './InvitationPreview';
import Navbar from './Navbar';

function Invitation() {
  const [invitation, setInvitation] = useState({
    name1: '',
    name2: '',
    date: '',
    address: '',
    city: '',
  });
  const previewRef = useRef();

  const updateInvitation = (newData) => {
    setInvitation(newData);
  };

  const bcstyle = {
    backgroundImage: `url(${ibc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '120vh', // Set the height to cover the entire viewport
    width: '100vw',
  };

  const handleDownloadPDF = async () => {
    const htmlContent = previewRef.current.innerHTML;
  
    try {
      const response = await fetch('http://localhost:3306/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(htmlContent),
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'invitation.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };
  

  return (
    <div className='ibody' style={bcstyle}>
      <Navbar />
      <div className="iform" style={{ position: 'absolute', left: '7%', top: '16%', width: '40%', height: '100%' }}>
        <InvitationForm updateInvitation={updateInvitation} previewRef={previewRef} />
      </div>
      <div className='ipreview' ref={previewRef} style={{ position: 'absolute', left: '52%', width: '35%', top: '16%', height: '94%', backgroundImage: 'URL(greet)', borderRadius: '5px' }}>
        <InvitationPreview invitation={invitation} />
      </div>

    </div>
  );
}

export default Invitation;
