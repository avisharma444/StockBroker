import React from 'react'
import './Footer.css' 
import { assets } from '../../assets/food del assets/frontend_assets/assets'
const Footer = () => {
  return (
    <div className='Footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src="/logo.svg" alt="" className="logo" />
            <p>"  Stay updated with real-time market data, track your portfolio performance, and explore a wide range of stocks to diversify your investments. With our user-friendly interface and secure transactions, investing in the stock market has never been simpler. Join our community of investors and start trading with confidence today!"</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                    <li>Creators</li>
                </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-8178231911</li>
                <li>avi22119@iiitd.ac.in</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">© Copyright 2024, Zerodha Inc. - All Rights Reserved</p>
    </div>
  )
}

export default Footer
