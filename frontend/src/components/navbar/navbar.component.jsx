import React from "react";
import { Link } from "react-router-dom";

// custom components:
import Logo from "../logo/logo.component";

import "./navbar.styles.scss";

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="logo-container-flex">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <ul>
          <li>
            <div className="circle-mask"></div>
            <Link to="/">Home</Link>
          </li>
          <li>
            <div className="circle-mask"></div>
            <Link to="/graduated">Graduated</Link>
          </li>
          <li>
            <div className="circle-mask"></div>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <div className="circle-mask"></div>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
