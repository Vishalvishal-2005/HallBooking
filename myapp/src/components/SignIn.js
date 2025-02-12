import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import UserContext

/**
 * SignIn component for user authentication.
 *
 * This component provides a form for users to sign in to the hall booking system.
 * It manages the state for email, password, and error messages, and handles the
 * submission of the sign-in form.
 *
 * @component
 * @returns {JSX.Element} The rendered sign-in form.
 *
 * @example
 * <SignIn />
 *
 * @throws {Error} Throws an error if the sign-in process fails due to network issues
 * or server errors.
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
   * and processes the response. It manages authentication state and navigates
   * the user upon successful sign-in.
   *
   * @param {Event} e - The event object representing the form submission event.
   *
   * @throws {Error} Throws an error if the fetch operation fails or if the response
   *                 is not as expected.
   *
   * @example
   * // Usage in a form element
   * <form onSubmit={handleSubmit}>
   *   <input type="email" name="email" required />
   *   <input type="password" name="password" required />
   *   <button type="submit">Sign In</button>
   * </form>
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://hallbooking-backend-9e8d.onrender.com/api/users/signin', {
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
