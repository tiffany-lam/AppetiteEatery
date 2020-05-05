import React, { useState, useEffect } from "react";

// custom components:
import Tag from "../tag/tag-v2.component";
import CustomButton from "../custom-button/custom-button.component";

// custom style sheet:
import "./add-tag-input.styles.scss";

import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

const AddTagInput = ({
  htmlFor,
  index = 0,
  className,
  type = "read-only",
  value,
  handleChange,
  ...props
}) => {
  const [tags, setTags] = useState([""]);

  const addTagInput = (e) => {
    e.preventDefault();
    setTags([...tags, ""]);
  };

  return (
    <ul className="add-tag-list">
      {tags.map((tag, i) => (
        <Tag key={i} index={i} htmlFor="tag" type="input" />
      ))}

      <CustomButton
        type="button"
        className="add-tag-btn"
        onClick={addTagInput}
        icon={<AddIcon />}
      >
        add
      </CustomButton>
    </ul>
  );
};

export default AddTagInput;
