import React from 'react';
import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/user/register', { name, email, password });
        if(response.status === 200) {
          console.log('Response:', response.data);
          alert("User registered successfully");
          navigate('/signin');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    return (
      <div className="container">
        <h1>Welcome to CycleBay</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Name:</label>
            <input type="name" value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div><p>Already have an account ? <Link to="/signin">Login</Link></p></div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  };

export default SignUp;  