import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/food del assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState('home');
    const { token, setToken } = useContext(StoreContext);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollButton = document.getElementById('scrollToBottomButton');
            if (scrollButton) {
                scrollButton.scrollIntoView({ behavior: 'smooth' });
            }
        };

        if (menu === 'contact-us') {
            handleScroll();
        }
    }, [menu]);

    const handleMenuClick = (newMenu) => {
        setMenu(newMenu);
        if (newMenu === 'menu') {
            navigate('/order');
        }
        if (newMenu === 'home') {
            navigate('/');
        }
    };

    return (
        <div className='navbar'>
            <img src='/logo.svg' alt="Logo" className="logo" />
            <ul className="navbar-menu">
                <li onClick={() => handleMenuClick('home')} className={menu === 'home' ? 'active' : ''}>Home</li>
                <li onClick={() => handleMenuClick('menu')} className={menu === 'menu' ? 'active' : ''}>Buy / Sell</li>
                <li onClick={() => handleMenuClick('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>Contact Us</li>
            </ul>
            {!token ? (
                <button onClick={() => setShowLogin(true)}>Sign In</button>
            ) : (
                <div className='navbar-profile'>
                    <img src={assets.profile_icon} alt="Profile" />
                    <ul className="nav-profile-dropdown">
                        <li onClick={logout}><img src={assets.logout_icon} alt="Logout" /><p>Logout</p></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
