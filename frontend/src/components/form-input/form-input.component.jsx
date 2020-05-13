import React, { useState, useEffect } from "react";

import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

import "./form-input.styles.scss";

const FormInput = ({
  id,
  handleChange,
  label,
  className,
  type,
  htmlFor, // used for accessibility
  // required,
  additionalInfo,
  disabled,
  error,
  autoCompleteProps = { value: null },
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const determineInputType = () => {
    if (type === "password" && passwordVisible === true) return "text";
    else if (type === "password") return "password";
    else return type;
  };

  return (
    <div
      id={id}
      className={`input-field ${type === "textarea" ? " textarea" : ""} ${
        className ? className : ""
      }`}
    >
      {error ? <span className="error-msg">{error}</span> : null}
      {label ? (
        <label
          htmlFor={htmlFor}
          className={`${
            props.value || autoCompleteProps.value ? "shrink" : ""
          } form-input-label`}
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
          {...autoCompleteProps}
          value={
            autoCompleteProps.value ? autoCompleteProps.value : props.value
          }
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
