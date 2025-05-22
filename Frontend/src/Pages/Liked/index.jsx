import React, { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar';
import { useNavigate } from 'react-router-dom';
import './liked.css';

function LikedProducts() {
    const [likedProducts, setLikedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLikedProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/signin');
                    return;
                }

                const response = await fetch('http://localhost:3000/product', {
                    headers: {
                        'x-access-token': token
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch liked products');
                }

                const result = await response.json();
                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                
          
                const liked = result.data.filter(product => 
                    product.likedBy?.includes(userData.userId)
                ).map(product => ({
                    ...product,
                    isLiked: true
                }));
                
                setLikedProducts(liked);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching liked products:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchLikedProducts();
    }, [navigate]);

    const handleRemoveLike = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
                return;
            }

            const response = await fetch(`http://localhost:3000/product/unlike/${productId}`, {
                method: 'POST',
                headers: {
                    'x-access-token': token
                }
            });

            if (!response.ok) {
                throw new Error('Failed to remove like');
            }

   
            setLikedProducts(prevProducts => 
                prevProducts.filter(product => product._id !== productId)
            );
        } catch (error) {
            console.error('Error removing like:', error);
            alert('Failed to remove like. Please try again.');
        }
    };

    const handleViewProduct = (productId) => {
        navigate(`/product/${productId}`);
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
            <>
                <NavBar />
                <div className="liked-products-container">
                    <div className="loading">Loading...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBar />
                <div className="liked-products-container">
                    <div className="error-message">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Retry</button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="liked-products-container">
                <h1>Your Liked Products</h1>
                {likedProducts.length === 0 ? (
                    <div className="no-products">
                        <p>You haven't liked any products yet.</p>
                        <button onClick={() => navigate('/')} className="browse-button">
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="products-grid">
                        {likedProducts.map(product => (
                            <div key={product._id} className="product-card">
                                <div className="product-image">
                                    <img src={product.imgUrl} alt={product.name} />
                                    <button 
                                        className="remove-like"
                                        onClick={() => handleRemoveLike(product._id)}>remove</button>
                                </div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p className="price">{formatPrice(product.price)}</p>
                                    <p className="description">{product.desc}</p>
                                    <button 
                                        className="view-button"
                                        onClick={() => handleViewProduct(product._id)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default LikedProducts;