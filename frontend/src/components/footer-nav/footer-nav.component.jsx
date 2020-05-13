/*
  Contributors: Julie Do 014101748, Sam Alhaqab 017018649
  Course: CECS 470

  Description: This class is the footer component of all our pages. It contains peripheral links to our website that do not display main functionalities. This includes such things as contact us page and about us page.
*/

// IMPORT MAIN PACKAGES
import React, { Component } from "react";
import { Link } from "react-router-dom";

// IMPORT STYLES
import "./footer-nav.styles.scss";

// Class Component FooterNav
class FooterNav extends Component {
  // Constructor of the class
  constructor(props) {
    super(props);
  }

  // When imported, renders a navigational bar that contains peripheral website links. This navigational bar is styled to our websites theme.
  render() {
    return (
      <nav className="footer-nav">
        <ul>
          <li>
            <Link to="/contact-us">Contact</Link>
          </li>
          <li>
            <Link to="/about-us">About</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

// Export the FooterNav class, which returns a navigational bar of our peripheral website links.
export default FooterNav;
