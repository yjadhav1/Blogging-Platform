import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
//import { AppContext } from "../App.js";

const App = () => {
  const [notifications, setNotifications] = useState([]);
//const { user } = useContext(AppContext);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification, index) => (
          
          <li key={index}>
            <strong>{notification.user}</strong> has a new post in category <em>{notification.title}</em>
          </li>
        ))}
        
      </ul>
    </div>
  );
};

export default App;