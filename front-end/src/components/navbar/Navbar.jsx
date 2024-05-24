import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/food del assets/frontend_assets/assets';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');

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
      <button onClick={() => { setShowLogin(true); }}>Sign In</button>
    </div>
  );
};

export default Navbar;
