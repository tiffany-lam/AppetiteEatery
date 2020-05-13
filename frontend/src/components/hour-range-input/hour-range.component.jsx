/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component returns a styled input for an hour range, in other words 
  a range of hours starting from one hour to another hour. For example, it can be used to display 
  an open time for a certain day, such as Sunday 10:00 AM - 11:00 PM.
*/

// main packages:
import React, { useState, useEffect } from "react";

// custom stylesheets:
import "./hour-range.styles.scss";

// returns an input for an hour range, which includes a from hour and a to hour
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

  // returns two inputs for an hour range
  return (
    <div className={`hour-range-input-container ${className}`}>
      {/* this span is the viewed label of the inputs */}
      <span
        onClick={() => {
          inputRef.current.focus();
        }}
        className={`hour-range-input-label`}
      >
        {label}
      </span>

      {/* label and input for the from hour */}
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

      {/* label and input for the to hour */}
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
