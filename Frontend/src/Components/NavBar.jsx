import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

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
                        <li><h1><Link to="/">CycleBay</Link></h1></li>
                        <li><Link to="/">Home</Link></li>
                        
                        <li>
                            <span 
                                onClick={() => handleNavigation('/sell')}>
                                Sell
                            </span>
                        </li>
                    </ul>
                    <div className="nav-right">
                    <li>
                            <span 
                                onClick={() => handleNavigation('/likedProducts')}>
                                <img className="likedIcon" src="https://i.pinimgproxy.com/?url=aHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS8yNTYvMTAyOS8xMDI5MTMyLnBuZw==&ts=1747657665&sig=c65fb94b0a47cd84484086d72b3256034b6a3508ea1c1842a6524a67fed134d9"></img>
                            </span>
                        </li>
                        <DropdownButton id="dropdown-basic-button" title=<img className="profile-icon" src="https://i.pinimg.com/736x/29/db/41/29db41559392929eb786e412a9dbfff3.jpg"></img>>
                            <Dropdown.Item href="#/action-1">Your Profile</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Your Ads</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
                        </DropdownButton>
                    
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
    );
}

export default NavBar;