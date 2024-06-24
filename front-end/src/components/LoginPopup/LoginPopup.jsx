import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/food del assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { url, setToken, fetchUserInfo } = useContext(StoreContext); // Add fetchUserInfo to context
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    phone_no: "",
    adhaar: "",
    PAN_card: "",
    email: "",
    password: "",
    dob: "1907-22-21"
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newurl = url;

    if (currState === "Login") {
      newurl += "/api/v1/user/login";
    } else {
      newurl += "/api/v1/user/register";
    }

    const response = await axios.post(newurl, data);
    
    if (response.data.success) {
      const token = response.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      await fetchUserInfo(token); // Fetch user info after setting the token
      setShowLogin(false);
      navigate('/explore');
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className='LoginPopup'>
      <form onSubmit={onLogin} action="" className="login-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />}
          {currState === "Login" ? null : <input name="phone_no" onChange={onChangeHandler} value={data.phone_no} type="text" placeholder="Phone Number" required />}
          {currState === "Login" ? null : <input name="adhaar" onChange={onChangeHandler} value={data.adhaar} type="text" placeholder="Aadhar Card No." required />}
          {currState === "Login" ? null : <input name="PAN_card" onChange={onChangeHandler} value={data.PAN_card} type="text" placeholder="Pan Card No." required />}
          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? null : <p>Already have an Account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>}
        {currState === "Sign Up" ? null : <p>Create a New Account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>}
      </form>
    </div>
  );
};

export default LoginPopup;
