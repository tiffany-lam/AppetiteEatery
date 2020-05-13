/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component returns a stylized and thematically uniform button.
*/

// main packages:
import React from "react";

// custom stylesheet:
import "./custom-button.styles.scss";

// renders customized button styled consistently with websites thematic pattern
const CustomButton = ({
  icon,
  children,
  className,
  type,
  margin,
  minimal,
  ...props
}) => {
  return (
    // returns a button that accepts desired props, button type, and styles the button accordingly
    <button
      {...props}
      type={type}
      className={`custom-btn${margin ? " btn-margin" : ""}${
        minimal ? " btn-fit-content" : ""
      } ${className ? className : ""}`}
    >
      {icon || null}
      {children}
    </button>
  );
};
export default CustomButton;
