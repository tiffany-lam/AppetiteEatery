import React, { useState, useEffect } from "react";

import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

import "./select-input.styles.scss";

const SelectInput = ({
  id,
  handleChange,
  label = "please pass a label prop",
  className,
  type,
  htmlFor, // used for accessibility
  // required,
  children,
  ...props
}) => {
  const [option, setOption] = useState("");

  return (
    <div className={`select-input-container ${className}`}>
      <label
        className={`select-input-label ${option !== "" ? "shrink" : ""}`}
        htmlFor={htmlFor}
      >
        <React.Fragment>
          {label}
          <span className="required-asterisk">*</span>
        </React.Fragment>
      </label>

      <select
        {...props}
        className="select-input"
        name="pets"
        id={htmlFor}
        onChange={(e) => {
          setOption(e.target.value);
        }}
      >
        <option value=""></option>
        {children}
      </select>
    </div>
  );
};
export default SelectInput;