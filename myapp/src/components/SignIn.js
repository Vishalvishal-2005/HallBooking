import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import UserContext

/**
 * SignIn component that handles user authentication for the Hall Booking System.
 *
 * This component allows users to enter their email and password to sign in.
 * It manages the state for email, password, and error messages, and communicates
 * with the backend API to authenticate the user.
 *
 * @component
 * @returns {JSX.Element} The rendered SignIn component.
 *
 * @example
 * // Usage in a parent component
 * <SignIn />
 *
 * @throws {Error} Throws an error if the fetch request fails or if the server response is invalid.
 */
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser(); // Get login function from context

  /**
   * Handles the form submission for user sign-in.
   *
   * This asynchronous function prevents the default form submission behavior,
   * sends a POST request to the sign-in API with the user's email and password,
   * and processes the response. If the sign-in is successful, it stores the
   * authentication token and user ID, and navigates to the home page. In case of
   * errors, it sets an error message to be displayed to the user.
   *
   * @param {Event} e - The event object representing the form submission event.
   * @throws {Error} Throws an error if the fetch request fails or if the response
   *                 from the server is invalid.
   *
   * @example
   * // Example usage in a React component
   * const onSubmit = (event) => {
   *   handleSubmit(event);
   * };
   */
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
