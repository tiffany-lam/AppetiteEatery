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
