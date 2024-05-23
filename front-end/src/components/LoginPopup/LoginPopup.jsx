import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/food del assets/frontend_assets/assets'
const LoginPopup = () => {
    const [currState,setCurrState] = useState("Sign Up")
  return (
    <div className='LoginPopup'>
      <form action="" className="login-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img  onClick={()=>{}} src={assets.cross_icon} alt="" />
        </div>
      </form>
    </div>
  )
}

export default LoginPopup
