import React, { useState } from 'react';
import { userCredentials } from '../Data/data.js';
import Header from './Header.js';
import { useContext } from 'react';
import { AppContext } from '../App.js';
import './HandleUser.css'

const Admin = () => {

    const { user } = useContext(AppContext);

  const sections = [
    { title: 'Academic Resources', url: '#' },
    { title: 'Career Services', url: '#' },
    { title: 'Campus', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Local Community Resources', url: '#' },
    { title: 'Social', url: '#' },
    { title: 'Sports', url: '#' },
    { title: 'Health and Wellness', url: '#' },
    { title: 'Technology', url: '#' },
    { title: 'Travel', url: '#' },
    { title: 'Alumni', url: '#' },
  ];

  const [users, setUsers] = useState(userCredentials);

  const handleToggleEnabled = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].enable = !updatedUsers[index].enable;
    setUsers(updatedUsers);
  };

  // Filter out the admin user
  const nonAdminUsers = users.filter(u => u !== user.user);

  return (
    <div>
      <Header title="Display Posts" sections={sections} />
      <div>
        <table>
          <thead>
            <tr>
                          <th>Username</th>
                          <th>UserType</th>
              <th>Access</th>
            </tr>
          </thead>
          <tbody>
            {nonAdminUsers.map((user, index) => (
              <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.userType}</td>
                <td>
                  <button onClick={() => handleToggleEnabled(index)}>
                    {user.enable ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
