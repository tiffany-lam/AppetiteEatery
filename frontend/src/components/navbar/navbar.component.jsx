import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// custom components:
import Logo from "../logo/logo.component";
import CircleButton from "../circle-btn/circle-btn.component";

// mui icons:
import MenuIcon from "@material-ui/icons/Menu";

// custom stylesheet:
import "./navbar.styles.scss";

const Navbar = ({ className }) => {
  const [hideNav, setHideNav] = useState(true);

  const toggleNavBar = () => {
    setHideNav(!hideNav);
  };
  return (
    <nav className="header-nav">
      <div className="logo-container-flex">
        <Link to="/">
          <Logo eVersion={1} uppercase={true} />
        </Link>
      </div>

      <CircleButton id="menu-btn" onClick={toggleNavBar} hoverRotate={true}>
        <MenuIcon />
      </CircleButton>

      <ul className={hideNav ? "mobile-hidden" : ""}>
        {/* <ul> */}
        <li>
          <div className="nav-item-mask"></div>
          <Link to="/">Home</Link>
        </li>
        <li>
          <div className="nav-item-mask"></div>
          <Link to="/graduated">Graduated</Link>
        </li>
        <li>
          <div className="nav-item-mask"></div>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <div className="nav-item-mask"></div>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
