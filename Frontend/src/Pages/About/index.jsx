import React from 'react';
import NavBar from '../../Components/NavBar';
import './about.css';

function About() {
    return (
        <div className="about-page">
            <NavBar />
            <div className="about-container">
                <h1>About CycleBay</h1>
                <div className="about-content">
                    <p>Welcome to CycleBay, your trusted marketplace for buying and selling products.</p>
                    <p>Our mission is to provide a safe and convenient platform for users to trade their items.</p>
                </div>
            </div>
        </div>
    );
}

export default About;