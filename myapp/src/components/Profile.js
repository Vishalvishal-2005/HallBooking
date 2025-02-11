import React from 'react';
import pt from '../asserts/images/photograph.jpeg';
import '../asserts/profile.css';

function Profile({logins=[]}) {
  return (
    <div className='prof-background'>
    <div className="container d-flex flex-wrap" style={{height:'90%',backgroundColor:'rgb(190, 204, 160)',width:'100%',transform:'translate(2%,5%)' }}>
      <div className="card mb-4" style={{width: '30%', height: '95%',boxShadow: '0 0 10px rgba(0,0,0,0.566)'}}>
        <div className="card-header text-center">
          <img
            src={pt}
            className="rounded-circle"
            style={{ width: '195px', height: '195px' }}
            alt="profile"
          />
        </div>
        <div className="card-body text-center" >
          <h2 className="card-title">{logins.username}</h2>
          <p className="card-text">Full Stack Developer</p>
          <div className="mb-3">
            <label>Email: </label>
            <span>{logins.email}</span>
          </div>
          <div className="mb-3" style={{width: '100%'}}>
            <label>Name: </label>
            <span> Vishal P</span>
          </div>
          <div className="mb-3">
            <label>Phone No: </label>
            <span> +91 8148374326</span>
          </div>
          <div className="mb-3">
            <label>Birth Date: </label>
            <span> 13-04-2005</span>
          </div>
        </div>
      </div>
<div style={{float:'right',width:'67%',marginLeft:'30px'}}>
      <div className="card mb-4 " style={{width: '100%', height: '45%',boxShadow: '0 0 10px rgba(0,0,0,0.566)'}}>
        <div className="card-body">
          <p><strong>Full Name:</strong> Vishal</p>
          <p><strong>Email:</strong> 22ads.vishal.p@skct.edu.in</p>
        </div>
      </div>

      <div className="card mb-4 mt-4" style={{width: '100%', height: '45%',boxShadow: '0 0 10px rgba(0,0,0,0.566)'}}>
        <div className="card-body">
          <p><strong>Full Name:</strong> Vishal</p>
          <p><strong>Email:</strong> 22ads.vishal.p@skct.edu.in</p>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
}

export default Profile;
