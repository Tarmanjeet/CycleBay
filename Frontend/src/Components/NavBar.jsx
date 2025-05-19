import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        setIsLoggedIn(!!token);
        
        try {
            if (userData) {
                const user = JSON.parse(userData);
                setUserEmail(user.email || '');
            } else {
                setUserEmail('');
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            setUserEmail('');
        }
    };

    useEffect(() => {
        checkAuth();
        window.addEventListener('authStateChange', checkAuth);
        return () => {
            window.removeEventListener('authStateChange', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserEmail('');
        window.dispatchEvent(new Event('authStateChange'));
        navigate('/');
    };

    return (
        <>
            <header>
                <div className="navbar">
                    <nav>
                        <ul className="nav-left">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            {isLoggedIn && (
                                <>
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><Link to="/sell">Sell</Link></li>
                                </>
                            )}
                        </ul>
                        <div className="nav-right">
                            {isLoggedIn ? (
                                <>
                                    <span className="user-email">{userEmail}</span>
                                    <button onClick={handleLogout} className="nav-button">Logout</button>
                                </>
                            ) : (
                                <Link to="/signin" className="nav-button">Login</Link>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default NavBar;