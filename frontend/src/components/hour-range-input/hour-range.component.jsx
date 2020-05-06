import React, { useState, useEffect } from "react";

import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

import "./hour-range.styles.scss";

const HourRangeInput = ({
  id,
  handleChange1,
  handleChange2,
  value1,
  value2,
  label = "please pass a label prop",
  className,
  type,
  htmlFor = "", // used for accessibility
  disabled,
  ...props
}) => {
  const inputRef = React.createRef();

  return (
    <div className={`hour-range-input-container ${className}`}>
      <span
        onClick={() => {
          inputRef.current.focus();
        }}
        className={`hour-range-input-label`}
      >
        {label}
        {/* <span className="required-asterisk">*</span> */}
      </span>

      <label className="label-from" htmlFor={label + "-from"}></label>
      <input
        {...props}
        type="time"
        className="hour-range-input input-from"
        name="pets"
        id={label + "-from"}
        value={value1}
        onChange={handleChange1}
        ref={inputRef}
        disabled={disabled}
      ></input>

      <label className="label-to" htmlFor={label + "-to"}></label>
      <input
        {...props}
        type="time"
        className="hour-range-input input-to"
        name="pets"
        id={label + "-to"}
        value={value2}
        onChange={handleChange2}
        disabled={disabled}
      ></input>
    </div>
  );
};
export default HourRangeInput;
