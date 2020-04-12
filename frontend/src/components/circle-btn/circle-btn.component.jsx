import React from "react";

// custom components:
import Logo from "../logo/logo.component";

// mui icons:
import MenuIcon from "@material-ui/icons/Menu";

// custom stylesheet:
import "./circle-btn.styles.scss";

const CircleButton = ({
  className,
  children,
  hoverRotate = false,
  ...otherProps
}) => {
  return (
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
