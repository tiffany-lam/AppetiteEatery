/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component returns a customized select input with appropriate accessibility and styling consistent with the web pages themes.
*/

// main packages:
import React from "react";

// custom stylesheets:
import "./select-input.styles.scss";

// returns a styled select input
const SelectInput = ({
  id,
  handleChange,
  label = "please pass a label prop",
  className,
  type,
  htmlFor, // used for accessibility
  value = "",
  children,
  disabled,
  ...props
}) => {
  return (
    <div id={id} className={`select-input-container ${className}`}>
      {/* select label, which overlays on the select input if no value has been selected */}
      <label
        className={`select-input-label ${value !== "" ? "shrink" : ""}`}
        htmlFor={htmlFor}
      >
        <React.Fragment>
          {label}
          {props.required ? <span className="required-asterisk">*</span> : null}
        </React.Fragment>
      </label>

      {/* select input */}
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
      >
        <option value=""></option>
        {children}
      </select>
    </div>
  );
};
export default SelectInput;
