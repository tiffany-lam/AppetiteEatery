import React, { useState, useEffect } from "react";

import "./custom-button.styles.scss";

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
