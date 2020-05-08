import React, { useState, useEffect } from "react";

// custom components:
import Tag from "../tag/tag-v2.component";
import CustomButton from "../custom-button/custom-button.component";

// custom style sheet:
import "./add-tag-input.styles.scss";

import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
// import CloseIcon from "@material-ui/icons/Close";

const AddTagInput = ({
  htmlFor,
  index = 0,
  className,
  type = "read-only",
  value,
  tagValues,
  handleChange,
  handleAnyChange,
  ...props
}) => {
  const [tags, setTags] = useState(tagValues ? tagValues : [""]);

  useEffect(() => {
    // sets the internal state of this input to the outer state
    handleAnyChange(tags);
  }, [tags]);

  const addTagInput = (e) => {
    e.preventDefault();
    setTags([...tags, ""]);
  };

  const deleteTagInput = (e, index) => {
    e.preventDefault();
    setTags([...tags.slice(0, index), ...tags.slice(index + 1, tags.length)]);
  };

  const replaceTagValue = (e, index, value) => {
    e.preventDefault();
    setTags([
      ...tags.slice(0, index),
      value,
      ...tags.slice(index + 1, tags.length),
    ]);
  };

  return (
    <ul className="add-tag-list">
      {tags.map((tag, i) => (
        <React.Fragment key={i}>
          <Tag
            className="tag-item"
            index={i}
            htmlFor="tag"
            type="input"
            value={tags[i]}
            handleChange={(e) => {
              replaceTagValue(e, i, e.target.value);
            }}
          />

          <button
            type="button"
            className="delete-tag-btn"
            onClick={(e) => {
              deleteTagInput(e, i);
            }}
          >
            <CloseIcon />
          </button>
        </React.Fragment>
      ))}

      <CustomButton
        type="button"
        className="add-tag-btn"
        onClick={addTagInput}
        icon={<AddIcon />}
      ></CustomButton>
    </ul>
  );
};

export default AddTagInput;
