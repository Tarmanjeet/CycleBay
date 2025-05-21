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
                const response = await fetch('http://localhost:3000/product');
                if (!response.ok) throw new Error("Failed to fetch Products");
                const result = await response.json();
                console.log(result);

                if (result.success && Array.isArray(result.data)) {
                    const updatedProducts = result.data.map(product => ({
                        ...product,
                        isLiked: false,
                    }));
                    setProducts(updatedProducts);
                } else if (Array.isArray(result)) {
                    const updatedProducts = result.map(product => ({
                        ...product,
                        isLiked: false, 
                    }));
                    setProducts(updatedProducts);
                } else {
                    throw new Error("Data not found");
                }
            } catch (err) {
                setError(err.message);
                console.error("Error fetching products:", err);
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

    const handleLikeClick = (index) => {
        setProducts(prevProducts => 
            prevProducts.map((product, i) =>
                i === index ? { ...product, isLiked: !product.isLiked } : product
            )
        );
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
                                    onClick={() => handleLikeClick(index)}
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
