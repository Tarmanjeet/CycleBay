import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar';
import './home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = token ? {
                    'x-access-token': token
                } : {};

                const response = await fetch('http://localhost:3000/product', {
                    headers
                });
                
                if (!response.ok) {
                    if (response.status === 404) {
                        setError("No products found");
                    } else {
                        throw new Error(`Failed to fetch Products: ${response.statusText}`);
                    }
                    return;
                }
                const result = await response.json();
                console.log(result);

                if (result.success && Array.isArray(result.data)) {
                    const userData = JSON.parse(localStorage.getItem('user') || '{}');
                    const updatedProducts = result.data.map(product => ({
                        ...product,
                        isLiked: product.likedBy?.includes(userData.userId) || false,
                    }));
                    setProducts(updatedProducts);
                } else if (Array.isArray(result)) {
                    const userData = JSON.parse(localStorage.getItem('user') || '{}');
                    const updatedProducts = result.map(product => ({
                        ...product,
                        isLiked: product.likedBy?.includes(userData.userId) || false,
                    }));
                    setProducts(updatedProducts);
                } else {
                    throw new Error("Invalid data format received");
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                if (err.message === "Failed to fetch") {
                    setError("Unable to connect to the server. Please make sure the backend server is running.");
                } else {
                    setError(err.message || "An error occurred while fetching products");
                }
            }
        };

        fetchProducts();
    }, []);

    const categories = [
        "All",
        "Electronics",
        "Mobile Phones",
        "Clothes",
        "Footwear",
        "Accessories",
        "Books",
        "Beauty Products",
        "Sports"
    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleLikeClick = async (index, productId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
                return;
            }

            const product = products[index];
            const isLiked = product.isLiked;
            const endpoint = isLiked ? 'unlike' : 'like';
            
            const response = await fetch(`http://localhost:3000/product/${endpoint}/${productId}`, {
                method: 'POST',
                headers: {
                    'x-access-token': token
                }
            });

            if (!response.ok) {
                throw new Error('Failed to update like status');
            }

            setProducts(prevProducts => 
                prevProducts.map((p, i) =>
                    i === index ? { ...p, isLiked: !p.isLiked } : p
                )
            );
        } catch (error) {
            console.error('Error updating like status:', error);
            alert('Failed to update like status. Please try again.');
        }
    };
    
    const productClick=(prductId)=>{
        navigate(`/product/${prductId}`);
    }

    return (
        <>
            <div className="home">
                <NavBar />
            </div>

            <div className="Products-container">
                <div className="home-nav">
                    <div className="search-section">
                        <div className="search-bar">
                            <input type="text" placeholder="Search products..." />
                        </div>
                        <button className="filter-button">Filter</button>
                    </div>
                    <div className="categories">
                        {categories.map((category, index) => (
                            <button 
                                key={index} 
                                className={`category-button ${index === 0 ? 'active' : ''}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="Products-Grid">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index} className="Products-Card"
                              onClick={()=>productClick(product._id)}>
                                <img 
                                    src={product.imgUrl}
                                    alt={product.name} 
                                />
                                <h3>{product.name}</h3>
                                <button 
                                    className="likeIcon" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLikeClick(index, product._id);
                                    }}
                                >
                                    <img 
                                        src={product.isLiked 
                                            ? "https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
                                            : "https://cdn-icons-png.flaticon.com/128/2589/2589197.png"
                                        } // https://cdn-icons-png.flaticon.com/128/2589/2589175.png
                                        alt="Like"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </button>
                                <h3 className="price">{formatPrice(product.price)}</h3>
                            </div>
                        ))
                    ) : (
                        <p>Loading products...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;
