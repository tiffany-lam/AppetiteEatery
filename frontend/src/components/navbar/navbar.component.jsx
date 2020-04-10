import React from "react";
import { Link } from "react-router-dom";

// custom components:
import Logo from "../logo/logo.component";

import "./navbar.styles.scss";

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <Logo className="logo" />

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/graduated">Graduated</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
