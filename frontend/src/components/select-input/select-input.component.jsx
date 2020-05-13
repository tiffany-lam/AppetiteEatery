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
  value = "",
  children,
  disabled,
  ...props
}) => {
  // const [option, setOption] = useState(value);

  return (
    <div id={id} className={`select-input-container ${className}`}>
      <label
        className={`select-input-label ${value !== "" ? "shrink" : ""}`}
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
          handleChange(e);
        }}
        value={value}
        disabled={disabled}
        onClick={(e) => {
          console.log(value);
        }}
        // onChange={(e) => {
        //   setOption(e.target.value);
        // }}
      >
        <option value=""></option>
        {children}
      </select>
    </div>
  );
};
export default SelectInput;
