import React from "react";

import "./navbar.styles.scss";

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="searchbar">OUR SEARCH COMPONENT HERE</div>
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
