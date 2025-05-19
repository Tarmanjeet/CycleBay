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
                        <li><h1>CycleBay</h1></li>
                        <li><Link to="/">Home</Link></li>
                      
                        
                        <li>
                            <span 
                                onClick={() => handleNavigation('/sell')}
                                style={{ cursor: 'pointer' }}
                            >
                                Sell
                            </span>
                        </li>
                        
                    </ul>
                    <div className="nav-right">
                        <span 
                            onClick={() => handleNavigation('/profile')}
                            style={{ cursor: 'pointer' }}
                        >
                            <img className="profile-icon" src="https://i.pinimgproxy.com/?url=aHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS8yNTYvODk3Lzg5NzM4OS5wbmc=&ts=1747636590&sig=28d1ccffeb407b0a406e914abefbc13ea1d5015348281ead04159bb47bda2a14"></img>
                        </span>
                        
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