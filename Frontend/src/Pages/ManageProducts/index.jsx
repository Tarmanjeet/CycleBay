import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import axios from 'axios';
import './manageProducts.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
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

      const response = await axios.get(`http://localhost:3000/product/user/${userId}`, {
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
      const response = await axios.delete(`http://localhost:3000/product/${productId}`, {
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
      setError(err.response?.data?.message || 'Error deleting product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      // Prepare the update data
      const updateData = {
        name: editingProduct.name,
        desc: editingProduct.desc,
        price: Number(editingProduct.price),
        category: editingProduct.category,
        image: editingProduct.image,
        description: editingProduct.description
      };

      console.log('Sending update data:', updateData);

      const response = await axios.patch(
        `http://localhost:3000/product/update/${editingProduct._id}`,
        updateData,
        {
          headers: {
            'x-access-token': token
          }
        }
      );

      console.log('Update response:', response.data);

      if (response.data.success) {
        setProducts(products.map(product => 
          product._id === editingProduct._id ? response.data.data : product
        ));
        setEditingProduct(null);
        alert('Product updated successfully!');
      } else {
        setError(response.data.message || 'Failed to update product');
      }
    } catch (err) {
      console.error('Update error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Error updating product');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('description.')) {
      // Handle nested description fields
      const fieldName = name.split('.')[1];
      setEditingProduct(prev => ({
        ...prev,
        description: {
          ...prev.description,
          [fieldName]: value
        }
      }));
    } else {
      // Handle top-level fields
      setEditingProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
              <div key={product._id} className="product-card">
                <img src={`http://localhost:3000/uploads/${product.image}`} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">{formatPrice(product.price)}</p>
                  <p className="description">{product.desc}</p>
                  <div className="product-actions">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {editingProduct && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h2>Edit Product</h2>
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingProduct.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="desc"
                    value={editingProduct.desc}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={editingProduct.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image File</label>
                  <input
                    type="text"
                    name="image"
                    value={`http://localhost:3000/uploads/${editingProduct.image}`}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setEditingProduct(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts; 