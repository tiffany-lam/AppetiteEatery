import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchbarValue } from "../../redux/ui/ui.actions";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import CircleButton from "../circle-btn/circle-btn.component";
import FormInput from "../form-input/form-input.component";

// mui icons:

import AddIcon from "@material-ui/icons/Add";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";

import "./img-upload-input.styles.scss";

const ImageUploadInput = ({
  label = "test",
  htmlFor = "test",
  handleChange,
  className = "",
  additionInfo,
  defaultSize = 4,
  ...props
}) => {
  const [images, setImages] = useState([]);
  const inputRef = React.createRef();

  useEffect(() => {
    handleChange(images);
  }, [images]);

  const manageImageList = (e) => {
    console.log(e.target.files);
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const addImage = (e) => {
    console.log(e.target.files);

    setImages([...new Set([...images, ...Array.from(e.target.files)])]);
  };

  const deleteImage = (index) => {
    setImages([
      ...images.slice(0, index),
      ...images.slice(index + 1, images.length),
    ]);
  };

  return (
    <div className={`img-upload-container ${className}`}>
      <label className="img-upload-label" htmlFor={htmlFor}>
        {label}
      </label>

      <input
        disabled={props.disabled}
        id={htmlFor}
        type="file"
        accept=".png,.jpeg,.jpg"
        multiple
        className="img-upload-input"
        onChange={(e) => {
          setImages([...images, ...Array.from(e.target.files)]);
        }}
        ref={inputRef}
      />

      <div className="img-list">
        {images.map((img, i) => (
          <div key={i} disabled={props.disabled} className="img-container">
            <img src={URL.createObjectURL(img)}></img>

            <div
              className="img-delete"
              onClick={() => {
                deleteImage(i);
              }}
            >
              <DeleteIcon />
            </div>
          </div>
        ))}

        {images.length === 0
          ? [...Array(defaultSize)].map((el, i) => (
              <button
                key={i}
                disabled={props.disabled}
                type="button"
                className="add-img-btn"
                onClick={(e) => {
                  inputRef.current.click();
                }}
              >
                <ImageIcon />
              </button>
            ))
          : ""}

        <button
          disabled={props.disabled}
          type="button"
          className="add-img-btn"
          onClick={(e) => {
            inputRef.current.click();
          }}
        >
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default ImageUploadInput;
