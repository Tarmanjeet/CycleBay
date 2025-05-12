import React from 'react';
import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './signin.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/user/login', { email, password });
        if(response.status === 200) {
          console.log('Response:', response.data);
          alert("User registered successfully");
          Navigate('/');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    return (
      <div className="container">
        <h1>Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div><p>Don't have an account ? <Link to="/signup">Register</Link></p></div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  };

export default SignIn;