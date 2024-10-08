import React from 'react'
import './Header.css'
const Header = ({setShowLogin}) => {
  return (
    <div className='Header'>
      <div className="Header-contents">
        <h2>
            Buy Sell Your Favourite Stocks in Seconds
        </h2>
        <p>
            "Experience the ease of trading with our app, designed to help you buy and sell your favorite stocks effortlessly. . Join our community of investors and start trading with confidence today!"
        </p>
        <button onClick={()=>{setShowLogin(true)}}>
            Register Now
        </button >
        
      </div>
    </div>
  )
}

export default Header
