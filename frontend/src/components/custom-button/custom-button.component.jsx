import React, { useState, useEffect } from "react";

import "./custom-button.styles.scss";

const CustomButton = ({
  icon,
  children,
  className,
  type,
  margin,
  minimal,
  ...otherProps
}) => {
  return (
    <button
      {...otherProps}
      type="button"
      className={`custom-btn ${margin ? "btn-margin" : ""} ${
        minimal ? "btn-fit-content" : ""
      } ${className}`}
    >
      {icon || null}
      {children}
    </button>
  );
};
export default CustomButton;
