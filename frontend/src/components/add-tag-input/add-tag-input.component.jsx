/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component renders list of tag components designed and styled 
  thematically. This list may contain read only tags, or editable tags, which means you may edit 
  pre-existing tag values, you may delete unwanted tag values, and/or you may add a new tag value 
  to the list.
*/

// main packages:
import React, { useState, useEffect } from "react";

// custom style sheet:
import "./add-tag-input.styles.scss";

// custom components:
import Tag from "../tag/tag-v2.component";
import CustomButton from "../custom-button/custom-button.component";

// icons:
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

// Functional component Add Tag Input
const AddTagInput = ({
  htmlFor,
  index = 0,
  className,
  type = "read-only",
  value,
  tagValues,
  handleChange,
  handleAnyChange,
  disabled,
  ...props
}) => {
  // These state variables contain all the tag values being rendered.
  const [tags, setTags] = useState(tagValues ? tagValues : [""]);

  useEffect(() => {
    // sets the internal state of this input to the outer state
    handleAnyChange(tags);
  }, [tags]);

  // This function adds a tag value to the tag list.
  const addTagInput = (e) => {
    e.preventDefault();
    setTags([...tags, ""]);
  };

  // This function deletes a tag value from the tag list.
  const deleteTagInput = (e, index) => {
    e.preventDefault();
    setTags([...tags.slice(0, index), ...tags.slice(index + 1, tags.length)]);
  };

  // This function handles changes to the list of tag values, that is if a value edited and or
  // changed in array.
  const replaceTagValue = (e, index, value) => {
    e.preventDefault();
    setTags([
      ...tags.slice(0, index),
      value,
      ...tags.slice(index + 1, tags.length),
    ]);
  };

  // Returns a list of tags as desired
  return (
    <ul className="add-tag-list">
      {/* Dynamically renders tags according to the passed in tag values. It also attaches a 
      button to the end of each tag that is used to delete the tag if clicked. */}
      {tags.map((tag, i) => (
        <li key={i} className="tag-input-close-btn">
          <Tag
            disabled={disabled}
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
            disabled={disabled}
            type="button"
            className="delete-tag-btn"
            onClick={(e) => {
              deleteTagInput(e, i);
            }}
          >
            <CloseIcon />
          </button>
        </li>
      ))}
      {/* This list item is used to add any additional tags to the list. */}
      <li>
        <CustomButton
          disabled={disabled}
          type="button"
          className="add-tag-btn"
          onClick={addTagInput}
          icon={<AddIcon />}
        ></CustomButton>
      </li>
    </ul>
  );
};

// Export the add tag input component as default export
export default AddTagInput;
