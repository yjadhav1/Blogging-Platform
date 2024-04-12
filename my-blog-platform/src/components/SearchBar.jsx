import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    
    try {
      let responseData = ''; // Initialize responseData
      if (query.trim() !== '') {
        const response = await axios.get(`http://localhost:5000/search?q=${query}`);
        responseData = response.data; // Set responseData to the actual response data
        
      }
      onSearch(responseData); // Pass responseData to the parent component
    } catch (error) {
      console.error('Error searching:', error);
    }
    navigate("/DisplayPost");
  };

  return (
    <div className="SearchBar" style={{ display: 'flex', alignItems: 'center' }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', marginRight: '8px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          style={{ marginRight: '8px', padding: '4px', width: '300px',height:'40px' }} 
        />
        <button type="submit" style={{ padding: '4px 4px',marginRight:'20px',height:'30px' }}>Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
