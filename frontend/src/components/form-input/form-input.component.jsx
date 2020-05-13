/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component returns an input of the desired type (text area, text, etc.), along with another custom option called password. This input is styled and designed according to our website theme and provides accessibility. The custom password input provides a custom text input which hides the text characters and allows a visibility toggle to view the input content.
*/

// main packages:
import React, { useState, useEffect } from "react";

// custom stylesheets:
import "./form-input.styles.scss";

// icons:
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

// renders a form input with desired styles consistent with website theme
const FormInput = ({
  id,
  handleChange,
  label,
  className,
  type,
  htmlFor, // used for accessibility
  additionalInfo,
  disabled,
  error,
  ...props
}) => {
  // state variable for inputs requiring a password visibility button
  const [passwordVisible, setPasswordVisible] = useState(false);

  // function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // function to determine input type and if input type requires a password visibility button
  const determineInputType = () => {
    if (type === "password" && passwordVisible === true) return "text";
    else if (type === "password") return "password";
    else return type;
  };

  // returns customized form input with desired type
  return (
    <div
      id={id}
      className={`input-field ${type === "textarea" ? " textarea" : ""} ${
        className ? className : ""
      }`}
    >
      {/* Displays custom error message. */}
      {error ? <span className="error-msg">{error}</span> : null}
      {/* Displays desired label along with additional information */}
      {label ? (
        <label
          htmlFor={htmlFor}
          className={`${props.value ? "shrink" : ""} form-input-label`}
        >
          <React.Fragment>
            {label}
            {props.required ? (
              <span className="required-asterisk">*</span>
            ) : null}
            {additionalInfo ? (
              <span className="additional-info">{` ${additionalInfo}`}</span>
            ) : null}
          </React.Fragment>
        </label>
      ) : null}

      {/* render textarea element */}
      {type === "textarea" ? (
        <textarea
          {...props}
          id={htmlFor}
          onChange={handleChange}
          className="form-input"
          disabled={disabled}
        ></textarea>
      ) : null}

      {/* render regular input types */}
      {type !== "textarea" ? (
        <input
          {...props}
          id={htmlFor}
          type={determineInputType()}
          onChange={handleChange}
          className={`form-input`}
          disabled={disabled}
        ></input>
      ) : null}

      {/* render password visibility icon */}
      {type === "password" ? (
        <div
          className="visibility-container"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
