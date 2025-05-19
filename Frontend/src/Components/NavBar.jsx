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
                        <DropdownButton id="dropdown-basic-button" title=<img className="profile-icon" src="https://i.pinimg.com/736x/29/db/41/29db41559392929eb786e412a9dbfff3.jpg"></img>>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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