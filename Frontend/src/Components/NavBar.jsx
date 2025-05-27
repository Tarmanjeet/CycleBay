import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import logo from '../assets/images/logo1.png';
import { useTheme } from '../context/ThemeContext';

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        const userEmail = localStorage.getItem('user.email');
        
        if (!token) {
            setIsLoggedIn(false);
            setUserEmail('');
            return;
        }
        
        setIsLoggedIn(true);
        try {
            if (userData) {
                const user = JSON.parse(userData);
                setUserEmail(user.email || '');
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            setUserEmail('');
        }
    };

    useEffect(() => {
        checkAuth();
        window.addEventListener('storage', checkAuth);
        window.addEventListener('authStateChange', checkAuth);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
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

    const handleNavigation = (path) => {
        if (!isLoggedIn && (path === '/profile' || path === '/sell')) {
            alert('Please login to access this feature');
            navigate('/signin');
            return;
        }
        navigate(path);
    };

    return (
        <header>
            <div className="navbar">
                <nav>
                    <ul className="nav-left">
                        <li className="logo-container">
                            <Link to="/">
                                <img src={logo} alt="CycleBay Logo" className="nav-logo" />
                            </Link>
                        </li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li>
                            <span 
                                onClick={() => handleNavigation('/sell')}>
                                Sell
                            </span>
                        </li>
                    </ul>
                    <div className="nav-right">
                        <button 
                            className="theme-toggle" 
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            <img 
                                src="https://cdn-icons-png.flaticon.com/128/8051/8051743.png"
                                alt="Theme Toggle"
                                style={{ width: '24px', height: '24px' }}
                            />
                        </button>
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <span 
                                        onClick={() => handleNavigation('/likedProducts')}>
                                        <img className="likedIcon" src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"></img>
                                    </span>
                                </li>
                                <DropdownButton id="dropdown-basic-button" title=<img className="profile-icon" src="https://cdn-icons-png.flaticon.com/128/456/456283.png"></img>>
                                    <Dropdown.Item onClick={() => handleNavigation('/profile')}>Your Profile</Dropdown.Item>
                                    {/* <Dropdown.Item href="#/action-2">Your Ads</Dropdown.Item> */}
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </DropdownButton>
                                <span className="user-email">{userEmail}</span>
                            </>
                        ) : (
                            <Link to="/signin" className="nav-button">Login</Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;