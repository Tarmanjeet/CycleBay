import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    type: 'user', 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://cyclebay-backend.onrender.com/user/register', formData);
      if (response.status === 200) {
        console.log('Response:', response.data);
        alert('User registered successfully');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <div className="container">
        <h1>Welcome to CycleBay</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <label>Account Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div> */}
          <div>
            <p>
              Already have an account? <Link to="/signin">Login</Link>
            </p>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
