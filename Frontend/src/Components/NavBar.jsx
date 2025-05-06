import React from 'react';
import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';

function NavBar() {
    return (
        <>
        <header>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/signin">Login</Link></li>
                        <li><Link to="/signup">Register</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
        </>
        
    )
}

export default NavBar;