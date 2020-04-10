import React from "react";

import "./tag.styles.scss";

import CloseIcon from "@material-ui/icons/Close";

const Tag = (props) => {
  if (props.type === "add") {
    return (
      <form className="tag-add">
        <label for="tag-add">Add a tag</label>
        <input type="text" name="tag-add" id="tag-add"></input>
      </form>
    );
  } else if (props.type === "delete") {
    return (
      <li className="tag-delete">
        <p>#{props.children}</p>
        <CloseIcon></CloseIcon>
      </li>
    );
  } else {
    return <li className="tag-view">#{props.children}</li>;
  }
};

export default Tag;
