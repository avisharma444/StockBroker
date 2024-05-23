import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/food del assets/frontend_assets/assets'

const Navbar = ({setShowLogin}) => {
    const [menu,setMenu] = useState("home");


  return (
    <div className='navbar'>
      <img src='/logo.svg' alt="" className="logo" />
      <ul className="navbar-menu">
        <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>menu</li>
        <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>mobile-app</li>
        <li onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>home</li>
        <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
      
      <div className="navbar-search-icon">
        <img src={assets.basket_icon} alt="" />
        <div className="dot"></div>
      </div>
      <button onClick={()=>{setShowLogin(true)}}>sign in</button>
      </div>
    </div>
  )
}

export default Navbar
