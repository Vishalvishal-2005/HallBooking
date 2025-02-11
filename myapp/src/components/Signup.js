import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import blackandwhite from '../asserts/images/black-and-white-flower.png';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3060/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const data = await response.text();
        setError(data || 'Signup failed.');
        return;
      }

      alert('Sign up successful!');
      navigate('/signin');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='scn'>
      <div className='scontainer-butterfly'>
        <img src={blackandwhite} alt='butterfly'/>
      </div>
      <div className="sncontainer">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" placeholder='Username' value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" placeholder='Re-Type Password' value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign Up</button>
          <div className="asksignup">Already have an account? <Link to="/signin">Sign In</Link></div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
