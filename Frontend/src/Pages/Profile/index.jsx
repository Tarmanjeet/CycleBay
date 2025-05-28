import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import { profileAPI } from '../../services/api';
import './Profile.css';

function Profile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userProducts, setUserProducts] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
                return;
            }

            const tokenData = JSON.parse(atob(token.split('.')[1]));
            setUserData({
                name: tokenData.name,
                email: tokenData.email,
                type: tokenData.type,
                userId: tokenData.userId,
                createdAt: new Date(tokenData.iat * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            });

            const productsResponse = await profileAPI.getUserProducts(tokenData.userId);
            console.log('Products Response:', productsResponse);
            setUserProducts(productsResponse.data.data || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch user data');
            if (err.response?.status === 401) {
                navigate('/signin');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            setLoading(true);
            await profileAPI.deleteProduct(productId);
            const productsResponse = await profileAPI.getUserProducts(userData.userId);
            setUserProducts(productsResponse.data.data || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete product');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    const handleProfileImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

       
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

    
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('profileImage', file);

            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/user/update-profile-image', {
                method: 'POST',
                headers: {
                    'x-access-token': token
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update profile image');
            }

            const result = await response.json();
            if (result.success) {
                setUserData(prev => ({
                    ...prev,
                    profileImage: result.data.profileImage
                }));
            } else {
                throw new Error(result.message || 'Failed to update profile image');
            }
        } catch (err) {
            console.error('Error updating profile image:', err);
            alert(err.message || 'Failed to update profile image');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="profile-container">
                <NavBar />
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading profile data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-container">
                <NavBar />
                <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button onClick={fetchUserData} className="retry-btn">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="profile-container">
                <NavBar />
                <div className="error-container">
                    <p>No user data found. Please log in again.</p>
                    <button onClick={() => navigate('/signin')} className="login-btn">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <NavBar />
            <div className="profile-content">
                <div className="profile-header">
                    <div className="profile-content-wrapper">
                        <div className="profile-image-section">
                            <div className="profile-image-container">
                                <div className="profile-avatar">
                                    {userData.name ? userData.name.charAt(0).toUpperCase() : '?'}
                                </div>
                            </div>
                        </div>
                        <div className="profile-info">
                            <h1>{userData.name}</h1>
                            <p className="join-date">Member since {userData.createdAt}</p>
                            <div className="profile-details">
                                <div className="detail-item">
                                    <h3>Email</h3>
                                    <p>{userData.email}</p>
                                </div>
                                <div className="detail-item">
                                    <h3>Account Type</h3>
                                    <p>{userData.type}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="posted-ads-section">
                    <h2>Your Posted Ads</h2>
                    <div className="listings-grid">
                        {userProducts.length > 0 ? (
                            userProducts.map(product => (
                                <div key={product._id} className="listing-card">
                                    <img src={`http://localhost:3000/uploads/${product.image}`} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <p>${product.price}</p>
                                    <div className="product-actions">
                                        <button 
                                            className="view-details-btn"
                                            onClick={() => handleViewDetails(product._id)}
                                        >
                                            View Details
                                        </button>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDeleteProduct(product._id)}
                                        >
                                            Sold
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-items">No ads posted yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
