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
      <div className="tag-expand">
        <button className="button" type="button" onClick={handleExpand}>
          <AddIcon />
        </button>
        <form className={"form"}>
          <label htmlFor="tag-add">Add a tag</label>
          <input
            className={expand ? "input" : "input-clicked"}
            type="text"
            name="tag-add"
            id="tag-add"
            aria-label="Add a Tag"
            placeholder="Poke"
            value={input}
            onChange={handleChange}
          ></input>
        </form>
      </div>
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
