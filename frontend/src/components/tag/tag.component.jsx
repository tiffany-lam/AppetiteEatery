import React, { useState } from "react";

import "./tag.styles.scss";

import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

const Tag = (props) => {
  const [expand, setExpand] = useState(false);
  const [input, setInput] = useState("");

  const handleExpand = () => {
    setExpand(!expand);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  if (props.type === "add") {
    return (
      <div className={props.className ? `${props.className} form` : `form`}>
        <label htmlFor="add-button" className="visually-hidden">
          Add a Tag
        </label>
        <button className="button" type="button" onClick={handleExpand}>
          <AddIcon />
        </button>
        <label className="input">
          <span className="visually-hidden">Add a tag</span>{" "}
          <input
            className="input-text"
            type="text"
            name="tag-add"
            id="tag-add"
            aria-label="Add a Tag"
            placeholder="Poke"
            value={input}
            onChange={handleChange}
          ></input>
        </label>
      </div>
    );
  } else if (props.type === "delete") {
    return (
      <li className="tag-delete">
        <label htmlFor="delete-button">#{props.children}</label>
        <button className="button" type="button">
          <CloseIcon></CloseIcon>
        </button>
      </li>
    );
  } else {
    return <li className="tag-view">#{props.children}</li>;
  }
};

export default Tag;
