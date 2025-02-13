import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import UserContext

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser(); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://hallbooking-backend-9e8d.onrender.com/api/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        setError(errorMsg || 'Failed to sign in. Please try again.');
        return;
      }

      const data = await res.json(); // Parse response as JSON
      console.log('Raw Response:', data);

      if (data.user && data.user.id) {
        login(data.user.id);
        console.log('\nId detail:', data.user.id);
        
        sessionStorage.setItem('token', data.token);
        localStorage.setItem('isAuthenticated', 'true');

        alert('Sign in successful!');
        navigate('/home');
      } else {
        setError('Invalid response from server.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className='scn'>
      <div className='welcome'>
        <p>Welcome to Our Hall Booking System</p>
      </div>
      <div className="sncontainer">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              placeholder='Email'
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
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign In</button>
          <div className="asksignup">
            Don't have an account? <Link to="/">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
