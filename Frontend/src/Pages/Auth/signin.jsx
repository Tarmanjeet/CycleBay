import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signin.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('', { email, password });
        if(response.data.success) {
          navigate('/'); 
        } else {
          alert("Error : " + response.data.message);
        }
      } catch (error) {
        console.error("Error : " + error.message);
      }
    };

  
  
    return (
      <div className="container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Sign In</button>
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </form>
      </div>
    );
  };

export default SignIn;