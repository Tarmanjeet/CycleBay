import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import './home.css'

function Home() {
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
                    console.log(result.data);
                    setProducts(result.data);
                } else if (Array.isArray(result)) {
                    console.log(result);
                    setProducts(result);
                } else {
                    throw new Error("Data not found");
                }
            } catch (err) {
                setError(err.message);
                console.error("Error fetching products:", err);
            }
        }
        
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

    return (
        <>
            <div className="home">
                <NavBar/>
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
                            <div key={index} className="Products-Card">
                                <img 
                                    src={product.imgUrl} 
                                    alt={product.name} 
                                />
                                <h3>{product.name}</h3>
                                <h3 className="price">{formatPrice(product.price)}</h3>
                            </div>
                        ))
                    ) : (
                        <p>Loading products...</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;