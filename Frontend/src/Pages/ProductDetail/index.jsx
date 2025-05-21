import React, {useEffect, useState} from 'react'
import NavBar from '../../Components/NavBar'
import {useParams} from 'react-router-dom'
import './productDetail.css'

function ProductDetail() {
  const {id} = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/product/${id}`)
        if(!response.ok)throw new Error("Failed to fetch product details")
        const result = await response.json()

        if(result.success){
          setProduct(result.data)
        }
        else{
          throw new Error(result.message || "Failed to fetch product details")
        }
      }
      catch(err){
        setError(err.message)
        console.error("Error fetching product details:", err)
      }
      finally{
        setLoading(false)
      }
    }
    fetchProductDetails()
  }, [id])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  if(loading)return (
    <>
      <NavBar />
      <div className="product-container">
        <p>Loading product details...</p>
      </div>
    </>
  )

  if(error)return (
    <>
      <NavBar />
      <div className="product-container">
        <p>Error: {error}</p>
      </div>
    </>
  )

  if(!product)return (
    <>
      <NavBar /> 
      <div className="product-container">
        <p>Product not found</p>
      </div>
    </>
  )

  return (
    <>
      <NavBar />
      <div className="product-container">
        <div className="image-wrapper">
          <img src={product.imgUrl} alt={product.name} className="product-image" />
        </div>

        <div className="info-box">
          <h1 className="product-title">{product.name}</h1>
          <h2 className="product-price">{formatPrice(product.price)}</h2>

          <div className="product-description">
            <div className="overview-header">
              <h3>Overview</h3>
              <div className="price-action-section">
                <h2 className="overview-price">{formatPrice(product.price)}</h2>
                <button className="make-offer-btn">Make Offer</button>
              </div>
            </div> 
            <div className="description-details">
              <div className="overview-list">
                {Object.entries(product.description || {}).map(([key, value]) => (
                  <div key={key} className="overview-item">
                    <span className="item-label">{key}:</span>
                    <span className="item-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="seller-info-section">
            <div className="seller-header">
              <h3>Seller Information</h3>
            </div>
            <div className="seller-details">
              <div className="seller-info">
                <div className="info-item">
                  <span className="info-label">Posted by:</span>
                  <span className="info-value">{product.createdBy?.name || 'Anonymous'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Posted on:</span>
                  <span className="info-value">{new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button className="chat-seller-btn">
                <img src="https://cdn-icons-png.flaticon.com/128/134/134914.png" alt="chat" />
                Chat with Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
