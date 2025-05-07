import React from 'react';
import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <>
        <header>
            <div className="navbar">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/signup">Register</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
        </>
        
    )
}

export default NavBar;