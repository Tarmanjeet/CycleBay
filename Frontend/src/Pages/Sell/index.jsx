import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import './sell.css';

const Sell = () => {
  const navigate = useNavigate();

  return (
    <div className="sell-page">
      <NavBar />
      <div className="sell-container">
        <h1>Seller Dashboard</h1>
        <div className="sell-options">
          <div className="option-card" onClick={() => navigate('/post-ad')}>
            <img src="https://cdn-icons-png.flaticon.com/128/1154/1154448.png" alt="Post Ad" />
            <h2>Post Your Ad</h2>
            <p>Create a new listing for your product</p>
          </div>
          <div className="option-card" onClick={() => navigate('/manage-products')}>
            <img src="https://cdn-icons-png.flaticon.com/128/2838/2838895.png" alt="Manage Products" />
            <h2>Manage Your Products</h2>
            <p>View and manage your existing listings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;