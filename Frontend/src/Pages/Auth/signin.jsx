import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./signin.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/login", formData);
      if (response.status === 200) {
        console.log('Login response:', response.data);
        const { token, user } = response.data;
        
       
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
   
        console.log('Stored token:', localStorage.getItem('token'));
        console.log('Stored user:', localStorage.getItem('user'));
        
        window.dispatchEvent(new Event('authStateChange'));
        
        alert("User logged in successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="signin-page">
      <div className="container">
        <h1>Welcome Back</h1>
        <form onSubmit={handleSubmit}>
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
            <p>
              Don't have an account? <Link to="/signup">Register</Link>
            </p>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
