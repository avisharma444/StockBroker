import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/food del assets/frontend_assets/assets'
const LoginPopup = ({setShowLogin}) => {
    const [currState,setCurrState] = useState("Sign Up")
  return (
    <div className='LoginPopup'>
      <form action="" className="login-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img  onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input type="text" placeholder="Your name" required />}
            {currState==="Login"?<></>:<input type="text" placeholder="Phone Number" required />}
            {currState==="Login"?<></>:<input type="text" placeholder="Aadhar Card No." required />}
            {currState==="Login"?<></>:<input type="text" placeholder="Pan Card No." required />}
            <input type="email" placeholder="Your email" required />
            <input type="password" placeholder="Password" required />
        </div>
        <button>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"?<></>:<p>Already have an Account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>}
        {currState==="Sign Up"?<></>:<p>Create a New Account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>}

      </form>
    </div>
  )
}

export default LoginPopup
