import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3060/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      if (res.ok) {
        alert('Sign in successful!');
        setError('');
        navigate('/Home'); // Redirect to home page
      } else {
        setError(result.message || 'Failed to sign in. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to sign in. Please try again.');
    }
  }

  return (
    <div className='scn'>
      <div className="sncontainer">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign In</button>
          <div className="asksignup">Don't have an account? <Link to="/">Sign up</Link></div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
