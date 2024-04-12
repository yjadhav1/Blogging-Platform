import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
//import './login.css'; // Import the CSS file

function LoginPage() {
    const navigate = useNavigate();

    const userCredentials = [
        {
          username: "user1",
          password: "password1",
          //userType: "student",
        }
    ];
  
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        console.log(formData.username, formData.password, userCredentials[0].username, userCredentials[0].password);
        if (formData.username === userCredentials[0].username && formData.password === userCredentials[0].password) {
            alert('Login successful!');
            navigate('/');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username or Email:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
