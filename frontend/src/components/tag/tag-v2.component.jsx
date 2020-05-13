/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component returns a stylized tag. These tags can be related to a restaurant or a user, or can be used for other such things. This component renders the tag as a text input which can be used to update or edit the value displayed in the tag.
*/

// main packages:
import React from "react";

// custom stylesheets:
import "./tag-v2.styles.scss";

// returns a functional tag component which renders the value of a tag in an input text and allows updating/editing of the value based on props passed in
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
  // if prop type passed in is read only, or no prop type is passed in, the tag is defaulted to displaying a value only without allowing any changes
  if (type === "read-only")
    return (
      <span className={`tag-container ${className ? className : ""}`}>
        {value}
      </span>
    );
  // if type passed in is input, the tag is editable and can be modified as a text input
  else if (type === "input")
    return (
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
          disabled={disabled}
        ></input>
      </label>
    );
  else return <p>wrong prop value passed for type</p>;
};

export default Tag;
