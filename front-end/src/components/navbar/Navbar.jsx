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

        if (menu === 'my-orders') {
            handleScroll();
        }
    }, [menu]);

    const handleMenuClick = (newMenu) => {
        setMenu(newMenu);
        if (newMenu === 'menu') {
            navigate('/order');
        } else if (newMenu === 'home') {
            navigate('/');
        } else if (newMenu === 'sell') {
            navigate('/sell');
        } else if (newMenu === 'my-orders') {
            navigate('/my-orders');
        }
    };

    return (
        <div className='navbar'>
            <img src='/logo.svg' alt="Logo" className="logo" />
            <ul className="navbar-menu">
                <li onClick={() => handleMenuClick('home')} className={menu === 'home' ? 'active' : ''}>Home</li>
                <li onClick={() => handleMenuClick('menu')} className={menu === 'menu' ? 'active' : ''}>Buy</li>
                <li onClick={() => handleMenuClick('sell')} className={menu === 'sell' ? 'active' : ''}>Sell</li>
                <li onClick={() => handleMenuClick('my-orders')} className={menu === 'my-orders' ? 'active' : ''}>My Orders</li>
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
