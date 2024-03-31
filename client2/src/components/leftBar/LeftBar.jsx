import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const LeftBar = () => {
  const navigate = useNavigate(); // Hook for navigation

  const { currentUser } = useContext(AuthContext);

  const handleBuyStocks = () => {
    navigate('/buy-stocks');
  };

  const handleSellStocks = () => {
    navigate('/sell-stocks');
  };

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
          <div className="item" onClick={handleBuyStocks}>
            <img src={Market} alt="" />
            <span>Buy Stocks</span>
          </div>
          {/* Add the "Sell Stocks" option */}
          <div className="item" onClick={handleSellStocks}>
            <img src={Market} alt="" />
            <span>Sell Stocks</span>
          </div>
          {/* Other menu items */}
        </div>
        <hr />
        {/* Other menu sections */}
      </div>
    </div>
  );
};

export default LeftBar;