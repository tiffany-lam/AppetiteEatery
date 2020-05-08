import React, { useState } from "react";

import "./tag-v2.styles.scss";

import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

const Tag = ({
  htmlFor,
  index = 0,
  className,
  type = "read-only",
  value,
  handleChange,
  disabled,
  ...props
}) => {
  if (type === "read-only")
    return (
      <li className={`tag-container ${className ? className : ""}`}>{value}</li>
    );
  else if (type === "input")
    return (
      <li className={`tag-container ${className ? className : ""}`}>
        <label htmlFor={`${htmlFor}-${index}`} className="hidden"></label>
        <input
          placeholder="add a tag..."
          id={`${htmlFor}-${index}`}
          className="tag-input"
          value={value}
          onChange={handleChange}
          disabled={disabled}
        ></input>
      </li>
    );
  else return <p>wrong prop value passed for type</p>;
};

export default Tag;
