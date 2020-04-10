import React from "react";
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
          <li>Graduated</li>
          <li>Profile</li>
          <li>Login</li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
