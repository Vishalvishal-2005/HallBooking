import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef, useState } from 'react';
import ibc from "../../asserts/images/ibc.jpeg";
import Navbar from '../Navbar';
import InvitationForm from './InvitationForm';
import InvitationPreview from './InvitationPreview';

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
    const previewElement = previewRef.current;
    try {
      const canvas = await html2canvas(previewElement, { backgroundColor: null });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // Adjust PDF dimensions as needed
      pdf.save('invitation.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
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
        <input type='button' style={{height:'45px',width:'250px',transform:'translate(152%,694%)',backgroundColor:'tomato'}} onClick={handleDownloadPDF} value='Download'  />
    </div>
  );
}

export default Invitation;
