import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('', { name, email, password });
        if(response.data.success) {
          navigate('/signin'); 
        } else {
          alert("Error : " + response.data.message);
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
          <button type="submit">Sign Up</button>
          <p>Already have an account? <a href="/signin">Sign In</a></p>
        </form>
      </div>
    );
  };

export default SignUp;  