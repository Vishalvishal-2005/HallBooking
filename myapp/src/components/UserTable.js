import React from 'react';

const UserTable = ({ users = [], editRow, deleteUser }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Event</th>
        <th>Mobile No</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.length > 0 ? (
        users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.event}</td>
            <td>{user.mobile}</td>
            <td>{user.date}</td>
            <td>
              <button onClick={() => editRow(user)}>Edit</button></td>
<td>              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default UserTable;
