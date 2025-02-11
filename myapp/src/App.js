import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './asserts/home.css';

import './asserts/style.css';
import Admin from './components/Admin/Admin';
import AdminVender from "./components/Admin/AdminLog";
import AdminUsers from './components/Admin/AdminUsers';
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
import Venders from './components/Venders';
import VendorsBookings from './components/VendorsBookings';
import VenuesBookings from './components/VenuesBookings';
import { UserProvider } from "./components/UserContext"; // Import UserProvider
import AdminAddVendor from "./components/AdminAddVendor";

const App = () => {
  const [vendorbooked, setVendorbooked] = useState([]);
  const [users, setUsers] = useState([]);
  const [logins, setLogins] = useState([]);
  const [cancellationCount, setCancellationCount] = useState(0);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch('http://localhost:3060/api/bookings/1');
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
    const fetchVendors = async () => {
      try {
        const res = await fetch('http://localhost:3060/api/vendors');
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
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3060/api/users');
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