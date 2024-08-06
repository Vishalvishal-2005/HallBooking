import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './asserts/home.css';
import './asserts/navbar.css';
import './asserts/style.css';
import Admin from './components/Admin';
import AdminVender from "./components/AdminLog";
import AdminUsers from './components/AdminUsers';
import Home from './components/Home';
import Invitation from './components/Invitation';
import Profile from './components/Profile';
import Registeration from './components/Registeration';
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import Venders from './components/Venders';
import VendorsBooked from "./components/VendorsBooked";
import Venues from './components/Venues';

/*const storeUsersInLocalStorage = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const getUsersFromLocalStorage = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};*/

const App = () => {
 /* const [users, setUsers] = useState(getUsersFromLocalStorage());
  const [selectedUser, setSelectedUser] = useState(users[0] || null); // Select the first user by default

  const addUser= (user) => {
    user.id = users.length + 1;
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    storeUsersInLocalStorage(updatedUsers);
  };
  const addUserv= (user) => {
    user.id = users.length + 1;
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    storeUsersInLocalStorage(updatedUsers);
  };
  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    storeUsersInLocalStorage('users', updatedUsers);
  };
  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    storeUsersInLocalStorage(updatedUsers);
  };

  const editRow = (user) => {
    console.log('Editing user:', user);
  };
const userId=1;

*/
const [vendorbooked, setVendorbooked] = useState([]);
const [users, setUsers] = useState([]);
const [logins, setLogins] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3060/api/admins');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        console.log('Failed to fetch users');
      }
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  fetchUsers();
}, []);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3060/api/vendors');
      if (res.ok) {
        const data = await res.json();
        setVendorbooked(data);
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
    <Router>
      <div>
        {/* Include your Navbar component */}
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/Home"  element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venders" element={<Venders />} />
          <Route path="/Invitation" element={<Invitation />} />
          <Route path="/profile"  element={<Profile />} />
          <Route path="/vendorbooked" element={<VendorsBooked vendorbooked={vendorbooked} />} />

          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Admin" element={<Admin 
            users={users}           />} />
            <Route path="/AdminUsers" element={<AdminUsers users={users} vendorbooked={vendorbooked} logins={logins} />} />
            <Route path="/AdminVender" element={<AdminVender
               logins={logins}
               closeForm={() => console.log('Form closed')}
            />} />
          <Route path="/registeration" element={<Registeration />} />
          {/* Add other routes here */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
