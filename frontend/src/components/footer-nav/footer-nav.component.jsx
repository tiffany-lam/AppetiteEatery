import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./footer-nav.styles.scss";

class FooterNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="footer-nav">
        <ul>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default FooterNav;
