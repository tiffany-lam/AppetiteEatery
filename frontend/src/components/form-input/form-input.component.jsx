import React, { useState, useEffect } from "react";

import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

import "./form-input.styles.scss";

const FormInput = ({
  handleChange,
  label,
  className,
  type,
  // required,
  ...otherProps
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
    <div className={`input-field ${className ? className : ""}`}>
      <input
        {...otherProps}
        type={determineInputType()}
        onChange={handleChange}
        className="form-input"
      ></input>

      {label ? (
        <label
          className={`${otherProps.value ? "shrink" : ""} form-input-label`}
        >
          {otherProps.required ? (
            <React.Fragment>
              {label}
              <span className="required">*</span>
            </React.Fragment>
          ) : (
            label
          )}
        </label>
      ) : null}

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
