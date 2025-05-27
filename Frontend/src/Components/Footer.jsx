import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>CycleBay</h3>
                    <p>Your trusted marketplace for buying and selling products. Join our community of buyers and sellers today.</p>
                </div>
                
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/sell">Sell</Link></li>
                        <li><Link to="/profile">My Profile</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <ul className="contact-info">
                        <li>
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:support@cyclebay.com">support@cyclebay.com</a>
                        </li>
                        <li>
                            <i className="fas fa-phone"></i>
                            <a href="tel:+1234567890">+1 (234) 567-890</a>
                        </li>
                        <li>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>123 Market Street, City, Country</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                
                <p>&copy; 2025 CycleBay. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer; 