import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './asserts/home.css';

import './asserts/style.css';
import Admin from './components/Admin/Admin';
import AdminVender from "./components/Admin/AdminLog";
import AdminUsers from './components/Admin/AdminUsers';
import AdminAddVendor from "./components/AdminAddVendor";
import AdminAddVenue from "./components/AdminAddVenue";
import Chatbot from "./components/Chatbot";
import Home from './components/Home';
import Invitation from './components/Invitation/Invitation';
import MyBooking from "./components/MyBooking";
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Registeration from './components/RegistrationForms/Registeration';
import VendorsBooked from "./components/RegistrationForms/VendorsBooked";
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import Venues from './components/UI/Venues';
import { UserProvider } from "./components/UserContext"; // Import UserProvider
import Venders from './components/Venders';
import VendorsBookings from './components/VendorsBookings';
import VenuesBookings from './components/VenuesBookings';

/**
 * Main application component that manages the state and routing of the application.
 * It fetches data for users, vendors, and bookings from an API and provides this data
 * to various routes within the application.
 *
 * @component
 * @returns {JSX.Element} The rendered application component containing the router and routes.
 *
 * @example
 * // Usage in a React application
 * <App />
 */
const App = () => {
  const [vendorbooked, setVendorbooked] = useState([]);
  const [users, setUsers] = useState([]);
  const [logins, setLogins] = useState([]);
  const [cancellationCount, setCancellationCount] = useState(0);

  useEffect(() => {
    /**
     * Asynchronously fetches a list of administrators from the specified API endpoint.
     *
     * This function sends a GET request to the backend service to retrieve admin data.
     * If the request is successful, the data is parsed as JSON and passed to the `setUsers` function.
     * In case of a failed request or an error during the fetch operation, appropriate error messages are logged to the console.
     *
     * @async
     * @function fetchAdmins
     * @returns {Promise<void>} A promise that resolves when the fetch operation is complete.
     *
     * @throws {Error} Throws an error if there is a problem with the fetch operation.
     *
     * @example
     * // Fetch admins and handle the result
     * fetchAdmins().then(() => {
     *   console.log('Admins fetched successfully');
     * }).catch((error) => {
     *   console.error('Failed to fetch admins:', error);
     * });
     */
    const fetchAdmins = async () => {
      try {
        const res = await fetch('https://hallbooking-backend-9e8d.onrender.com/api/bookings/1');
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.log('Failed to fetch admins');
        }
      } catch (error) {
        console.log('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  useEffect(() => {
    /**
     * Asynchronously fetches vendor data from the specified API endpoint.
     *
     * This function sends a GET request to the vendors API and processes the response.
     * If the response is successful, it parses the JSON data and updates the vendor state.
     * In case of an error during the fetch operation or if the response is not ok,
     * it logs an appropriate message to the console.
     *
     * @async
     * @function fetchVendors
     * @returns {Promise<void>} A promise that resolves when the fetch operation is complete.
     *
     * @throws {Error} Throws an error if there is a problem with the fetch operation.
     *
     * @example
     * // Fetch and log vendor data
     * fetchVendors().then(() => {
     *   console.log('Vendors fetched successfully');
     * }).catch((error) => {
     *   console.error('Error fetching vendors:', error);
     * });
     */
    const fetchVendors = async () => {
      try {
        const res = await fetch('https://hallbooking-backend-9e8d.onrender.com/api/vendors');
        if (res.ok) {
          const data = await res.json();
          setVendorbooked(data);
          console.log(data);
        } else {
          console.log('Failed to fetch vendors');
        }
      } catch (error) {
        console.log('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    /**
     * Asynchronously fetches user data from the specified API endpoint.
     *
     * This function makes a GET request to the user API and processes the response.
     * If the request is successful, it parses the JSON data and updates the logins state.
     * In case of an unsuccessful response or an error during the fetch operation,
     * appropriate messages are logged to the console.
     *
     * @async
     * @function fetchUsers
     * @returns {Promise<void>} A promise that resolves when the fetch operation is complete.
     *
     * @throws {Error} Throws an error if there is an issue with the fetch operation.
     *
     * @example
     * // Fetch users and handle the result
     * fetchUsers().then(() => {
     *   console.log('Users fetched successfully');
     * }).catch((error) => {
     *   console.error('Error fetching users:', error);
     * });
     */
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://hallbooking-backend-9e8d.onrender.com/api/users');
        if (res.ok) {
          const data = await res.json();
          setLogins(data);
          console.log(data);
        } else {
          console.log('Failed to fetch users');
        }
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserProvider>

    <Router>
      <div>
        {/* Include your Navbar component */}
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venders" element={<Venders />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/invitation" element={<Invitation />} />
          <Route path="/profile" element={<Profile logins={logins} />} />
          <Route path="/vendorbooked" element={<VendorsBooked vendorbooked={vendorbooked}  setVendorbooked={setVendorbooked} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<Admin users={users} />} />
          <Route path="/adminadd" element={<AdminAddVenue/>}/>
          <Route path="/adminaddvendors" element={<AdminAddVendor/>}/>
          <Route path="/adminusers" element={<AdminUsers users={users} vendorbooked={vendorbooked} logins={logins} cancellationCount={cancellationCount} />} />
          <Route path="/adminvender" element={<AdminVender logins={logins} closeForm={() => console.log('Form closed')} />} />
          <Route path="/registeration" element={<Registeration />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/venuesbookings" element={<VenuesBookings users={users} setUsers={setUsers} setCancellationCount={setCancellationCount}/>} />
          <Route path="/vendorsbookings" element={<VendorsBookings vendorbooked={vendorbooked} setVendorbooked={setVendorbooked} />} />
          <Route path="/mybooking" element={<MyBooking users={users} vendorbooked={vendorbooked} setVendorbooked={setVendorbooked} />} />
          {/* Add other routes here  */}
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
};

export default App;