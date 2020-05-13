/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component returns a stylized and thematically uniform button.
*/

// main packages:
import React from "react";

// custom stylesheet:
import "./circle-btn.styles.scss";

// custom components:
import Logo from "../logo/logo.component";

// mui icons:
import MenuIcon from "@material-ui/icons/Menu";

// functional component icon button returns a uniform button styled according to theme
const CircleButton = ({
  className,
  children,
  hoverRotate = false,
  ...otherProps
}) => {
  return (
    // button is styled to look a certain way and hover if prop is passed
    <button
      {...otherProps}
      className={`circle-btn-container ${className} ${
        hoverRotate ? "hover-rotate" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default CircleButton;
