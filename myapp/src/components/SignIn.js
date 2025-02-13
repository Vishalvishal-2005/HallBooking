import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

/**
 * SignIn component for user authentication.
 *
 * This component provides a user interface for signing in to the hall booking system.
 * It handles user input for email and password, submits the data to the server,
 * and manages the authentication state.
 *
 * @component
 * @returns {JSX.Element} The rendered SignIn component.
 *
 * @example
 * <SignIn />
 *
 * @throws {Error} Throws an error if the sign-in process fails due to network issues or server errors.
 */
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  /**
   * Handles the submission of the sign-in form.
   *
   * This asynchronous function prevents the default form submission behavior,
   * sends a POST request to the sign-in API with the user's email and password,
   * and processes the response. It manages user authentication by storing tokens
   * in session and local storage upon successful sign-in.
   *
   * @param {Event} e - The event object representing the form submission event.
   *
   * @throws {Error} Throws an error if the sign-in process fails due to network issues
   *                 or if the server response is not valid.
   *
   * @example
   * // Example usage in a form submission context
   * document.getElementById('signInForm').addEventListener('submit', handleSubmit);
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://hallbooking-backend-9e8d.onrender.com/api/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      console.log("🔍 Raw Response:", text);

      if (!res.ok) {
        setError(text || 'Failed to sign in. Please try again.');
        return;
      }

      const data = JSON.parse(text); // Parse JSON response
      console.log('✅ Server Response:', data);

      if (data.user && data.user.id) {
        login(data.user.id);
        sessionStorage.setItem('token', data.token);
        localStorage.setItem('isAuthenticated', 'true');

        alert('Sign in successful!');
        navigate('/home');
      } else {
        setError('Invalid response from server.');
      }
    } catch (error) {
      console.error('❌ Error:', error);
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
