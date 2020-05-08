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
  ...props
}) => {
  if (type === "read-only")
    return (
      <span className={`tag-container ${className ? className : ""}`}>
        {value}
      </span>
    );
  else if (type === "input")
    return (
      // <div className={`tag-container ${className ? className : ""}`}>
      <label
        htmlFor={`${htmlFor}-${index}`}
        className={`tag-container ${className ? className : ""}`}
      >
        <input
          placeholder="add a tag..."
          id={`${htmlFor}-${index}`}
          className="tag-input"
          value={value}
          onChange={handleChange}
        ></input>
      </label>
      // </div>
    );
  else return <p>wrong prop value passed for type</p>;
};

export default Tag;
