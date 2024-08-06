// src/Register.js
import React from 'react';
import AddUserForm from './Registeration';

const Register = ({ addUser }) => (
  <div>
    <h2>Register Page</h2>
    <AddUserForm addUser={addUser} />
  </div>
);

export default Register;
