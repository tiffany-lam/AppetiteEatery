import React from "react";

import { Link } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import "./navbar.styles.scss";

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <p>
          {/* <LocalDiningIcon id="fork-knife-icon" /> */}
          <span id="appetite-text">appetite</span>
          <LocalDiningIcon id="fork-knife-icon" />

          {/* <FiberManualRecordIcon id="small-dot-icon" /> */}
          <span id="eatery-text">eatery</span>
        </p>

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
