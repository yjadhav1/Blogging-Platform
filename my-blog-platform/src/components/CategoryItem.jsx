import React, { useState,useContext } from 'react';
import axios from 'axios';
import { AppContext } from "../App.js";


const CategoryItem = ({ title }) => {
  const { user } = useContext(AppContext);
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = async () => {
    
    try {
      setSubscribed(true);
      // Send a POST request to the backend to subscribe the user to the category
      await axios.post('http://localhost:5000/subscribe', { title, user });

      // Update state to indicate that the user is subscribed
      setSubscribed(true);
    } catch (error) {
      console.error('Error subscribing user:', error);
      // Handle error appropriately, such as showing a message to the user
    }
  };


  const handleUnsubscribe = async() => {
    try {
      setSubscribed(false);
      // Send a POST request to the backend to subscribe the user to the category
      await axios.post('http://localhost:5000/unsubscribe', { title, user });

      // Update state to indicate that the user is subscribed
      
    } catch (error) {
      console.error('Error subscribing user:', error);
      // Handle error appropriately, such as showing a message to the user
    }
  };

  return (
    <div className="category-item">
      <h3>{title}</h3>
      {subscribed ? (
        <button onClick={handleUnsubscribe}>Unsubscribe</button>
      ) : (
        <button onClick={handleSubscribe}>Subscribe</button>
      )}
    </div>
  );
};

export default CategoryItem;
