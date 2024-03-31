import React from "react";
import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PortfolioOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined"; // Import portfolio icon
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WalletOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Import help icon

import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        {/* Add Link to the home page */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Zerodha</span>
        </Link>
        {/* Add Link to the home page */}
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <PersonOutlinedIcon />
        </Link>
        {/* Add Link to the portfolio page */}
        <Link to="/portfolio" style={{ textDecoration: "none" }}>
          <PortfolioOutlinedIcon />
        </Link>
        {/* Add Link to the wallet page */}
        <Link to="/wallet" style={{ textDecoration: "none" }}>
          <WalletOutlinedIcon />
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <Link to="/help" style={{ textDecoration: "none" }}>
          <HelpOutlineIcon />
        </Link>
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;