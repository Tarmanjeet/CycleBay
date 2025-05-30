import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import axios from 'axios';
import './manageProducts.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProducts();
  }, []);

  const fetchUserProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = userData.userId;
      
      console.log("Fetching products with:", { token: !!token, userId });
      
      if (!token || !userId) {
        console.log("Missing token or userId, redirecting to signin");
        navigate('/signin');
        return;
      }

      const response = await axios.get(`https://cyclebay-backend.onrender.com/product/user/${userId}`, {
        headers: {
          'x-access-token': token
        }
      });

      console.log("API Response:", response.data);

      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch products');
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      console.error("Error response:", err.response?.data);
      
      setError(err.response?.data?.message || 'Error fetching products');
      if (err.response?.status === 401) {
        navigate('/signin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`https://cyclebay-backend.onrender.com/product/delete/${productId}`, {
        headers: {
          'x-access-token': token
        }
      });

      if (response.data.success) {
        setProducts(products.filter(product => product._id !== productId));
        alert('Product deleted successfully!');
      } else {
        setError(response.data.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Error deleting product');
      if (err.response?.status === 401) {
        navigate('/signin');
      }
    }
  };

  const handleViewDetails = (product) => {
    navigate(`/product/${product._id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="manage-products-page">
        <NavBar />
        <div className="manage-products-container">
          <p>Loading your products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-products-page">
        <NavBar />
        <div className="manage-products-container">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-products-page">
      <NavBar />
      <div className="manage-products-container">
        <h1>Manage Your Products <img src="https://cdn-icons-png.flaticon.com/128/2838/2838895.png" alt="Manage Products" /> </h1>
        {products.length === 0 ? (
          <div className="no-products">
            <p>You haven't posted any products yet.</p>
            <button onClick={() => navigate('/post-ad')} className="post-first-ad-btn">
              Post Your First Ad
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product._id} className="Products-Card">
                <img 
                  src={`https://cyclebay-backend.onrender.com/uploads/${product.image}`} 
                  alt={product.name}
                />
                <h3>{product.name}</h3>
                <p className="description">{product.desc}</p>
                <h3 className="price">{formatPrice(product.price)}</h3>
                <div className="product-actions">
                  <button 
                    onClick={() => handleViewDetails(product)}
                    className="view-details-btn"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts; 