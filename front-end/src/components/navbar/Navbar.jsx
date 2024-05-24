import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/food del assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate()
  const [menu, setMenu] = useState('home');
    const {token,setToken} = useContext(StoreContext)
    const logout = () => {
        localStorage.removeItem("token");
        setToken("")
        navigate("/")
    }
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

  return (
    <div className='navbar'>
      <img src='/logo.svg' alt="" className="logo" />
      <ul className="navbar-menu">
        <li onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</li>
        <li onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</li>
        <li onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>Contact Us</li>
      </ul>
      {!token?<button onClick={() => { setShowLogin(true); }}>Sign In</button>
      :<div className='navbar-profile'>
        <img src={assets.profile_icon} alt="" />
        <ul className="nav-profile-dropdown">
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
        </ul>
        </div>}
    </div>
  );
};

export default Navbar;
