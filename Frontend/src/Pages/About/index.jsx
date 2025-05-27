import React from 'react';
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';
import './about.css';

const About = () => {
  return (
    <div className="about-page">
      <NavBar />
      <div className="about-container">
        <div className="about-header">
          <h1>About Cycle Bay</h1>
          <div className="header-underline"></div>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Our Story</h2>
            <p>
              Cycle Bay was founded with a vision to transform how we think about consumption. 
              In a world where waste is growing and resources are finite, we created a platform 
              that promotes sustainability through a peer-to-peer marketplace for refurbished, 
              second-hand, and upcycled goods. We believe that every item deserves a second chance 
              to bring value to someone's life.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              We're committed to building a sustainable future by making it easy and rewarding 
              to participate in the circular economy. Our platform connects environmentally 
              conscious consumers and sellers, making it simple to give pre-loved items a new 
              life while reducing waste and promoting responsible consumption.
            </p>
          </section>

          <section className="about-section">
            <h2>What We Offer</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>Sustainable Marketplace</h3>
                <p>A platform dedicated to eco-friendly buying and selling</p>
              </div>
              <div className="feature-card">
                <h3>Easy Listing</h3>
                <p>Simple process to list your pre-loved items</p>
              </div>
              <div className="feature-card">
                <h3>Quality Assurance</h3>
                <p>Verified sellers and authentic sustainable products</p>
              </div>
              <div className="feature-card">
                <h3>Community Focus</h3>
                <p>Connect with like-minded eco-conscious users</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Why Choose Us</h2>
            <ul className="benefits-list">
              <li> Dedicated to sustainable consumption</li>
              <li> Promotes circular economy principles</li>
              <li> Community-driven recycling initiative</li>
              <li> Eco-friendly marketplace</li>
              <li> Growing network of conscious consumers</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Our Impact</h2>
            <p>
              By choosing Cycle Bay, you're not just buying or selling items - you're actively 
              participating in reducing waste and promoting sustainable consumption. Every 
              transaction on our platform contributes to a larger movement towards a more 
              sustainable future.
            </p>
          </section>

          <section className="about-section contact-section">
            <h2>Join Our Movement</h2>
            <p>
              Ready to make a difference? Start buying and selling sustainably today! 
              Have questions? Reach out to us at support@cyclebay.com
            </p>
          </section>
        </div>
      </div>
    
    </div>
  );
};

export default About;