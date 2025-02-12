import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import blackandwhite from '../asserts/images/black-and-white-flower.png';

/**
 * Signup component for user registration.
 *
 * This component handles user input for the signup process, including username, email, password, and password confirmation.
 * It validates the input fields and communicates with the backend API to create a new user account.
 *
 * @component
 * @returns {JSX.Element} The rendered signup form.
 *
 * @example
 * <Signup />
 */
const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles the form submission for user signup.
   * This function validates the input fields, checks for matching passwords,
   * and sends a POST request to the user registration API.
   *
   * @async
   * @function handleSubmit
   * @param {Event} e - The event object representing the form submission event.
   * @throws {Error} Throws an error if the API request fails or if there are validation issues.
   *
   * @example
   * // Example usage in a form component
   * <form onSubmit={handleSubmit}>
   *   <input type="text" name="username" />
   *   <input type="email" name="email" />
   *   <input type="password" name="password" />
   *   <input type="password" name="confirmPassword" />
   *   <button type="submit">Sign Up</button>
   * </form>
   *
   * @returns {Promise<void>} A promise that resolves when the signup is successful.
   */
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
      const response = await fetch('https://hallbooking-backend-9e8d.onrender.com/api/users', {
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
