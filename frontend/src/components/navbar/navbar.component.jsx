import React from "react";
import SearchIcon from "@material-ui/icons/Search";

import "./navbar.styles.scss";

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="searchbar">
          OUR SEARCH COMPONENT HERE <SearchIcon />
        </div>

        <ul>
          <li>Home</li>
          <li>Graduated</li>
          <li>Profile</li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
