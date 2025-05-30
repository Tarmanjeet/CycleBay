import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar';
import { useNavigate } from 'react-router-dom';
import './liked.css';

function LikedProducts() {
    const navigate = useNavigate();
    const [likedProducts, setLikedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLikedProducts();
    }, []);

    const fetchLikedProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
                return;
            }

            const response = await fetch('https://cyclebay-backend.onrender.com/product', {
                headers: {
                    'x-access-token': token
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/signin');
                    return;
                }
                throw new Error('Failed to fetch liked products');
            }

            const data = await response.json();
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const filteredProducts = (data.data || data)
                .filter(product => product.likedBy?.includes(userData.userId))
                .map(product => ({
                    ...product,
                    isLiked: true
                }));
            setLikedProducts(filteredProducts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching liked products:', error);
            setError(error.message || 'Failed to fetch liked products');
            setLoading(false);
        }
    };

    const handleRemoveLike = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
                return;
            }

            const response = await fetch(`https://cyclebay-backend.onrender.com/product/unlike/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/signin');
                    return;
                }
                throw new Error('Failed to remove like');
            }

            const data = await response.json();
            if (data.success) {
                setLikedProducts(prevProducts => 
                    prevProducts.filter(product => product._id !== productId)
                );
            } else {
                throw new Error(data.message || 'Failed to remove like');
            }
        } catch (error) {
            console.error('Error removing like:', error);
            setError(error.message || 'Failed to remove like');
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const productClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (loading) {
        return (
            <div className="home-page">
                <NavBar />
                <div className="loading">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-page">
                <NavBar />
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="home-page">
            <NavBar />
            <div className="Products-container">
                <h2 className="liked-title">Your Liked Products</h2>
                {likedProducts.length > 0 ? (
                    <div className="Products-Grid">
                        {likedProducts.map((product) => (
                            <div key={product._id} className="Products-Card" onClick={() => productClick(product._id)}>
                                <img 
                                    src={`https://cyclebay-backend.onrender.com/uploads/${product.image}`}
                                    alt={product.name} 
                                />
                                <h3>{product.name}</h3>
                                <p className="description">{product.desc}</p>
                                <button 
                                    className="likeIcon" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveLike(product._id);
                                    }}
                                >
                                    <img 
                                        src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
                                        alt="Unlike"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </button>
                                <h3 className="price">{formatPrice(product.price)}</h3>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-products">
                        <p>No liked products found.</p>
                        <button className="browse-button" onClick={() => navigate('/')}>
                            Browse Products
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LikedProducts;