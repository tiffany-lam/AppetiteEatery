/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component returns an image upload input that accepts multiple 
  images to upload. It also displays the uploaded images a preview, and allows users to remove 
  these images from the upload.
*/

// main packages:
import React, { useState, useEffect } from "react";

// custom stylesheets:
import "./img-upload-input.styles.scss";

// mui icons:
import AddIcon from "@material-ui/icons/Add";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";

// returns a list of image upload inputs
const ImageUploadInput = ({
  label = "test",
  htmlFor = "test",
  handleChange,
  className = "",
  additionInfo,
  defaultSize = 4,
  multiple = true,
  ...props
}) => {
  // state variable holds the image files
  const [images, setImages] = useState([]);
  const inputRef = React.createRef();

  // anytime the image variable is changed, called handle change (passed in as a prop) on it
  useEffect(() => {
    handleChange(images);
  }, [images]);

  // temporary usage: please do not delete
  const manageImageList = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  // temporary usage: please do not delete
  const addImage = (e) => {
    setImages([...new Set([...images, ...Array.from(e.target.files)])]);
  };

  // if image is no longer desired, removes image from images to be uploaded
  const deleteImage = (index) => {
    setImages([
      ...images.slice(0, index),
      ...images.slice(index + 1, images.length),
    ]);
  };

  // returns image upload inputs along with a preview of the images
  return (
    <div className={`img-upload-container ${className}`}>
      {/* label for image upload */}
      <label className="img-upload-label" htmlFor={htmlFor}>
        {label}
      </label>
      {/* file input for image upload */}
      <input
        disabled={props.disabled}
        id={htmlFor}
        type="file"
        accept=".png,.jpeg,.jpg"
        multiple={multiple}
        className="img-upload-input"
        onChange={(e) => {
          if (multiple) setImages([...images, ...Array.from(e.target.files)]);
          else setImages([...Array.from(e.target.files)]);
        }}
        ref={inputRef}
      />

      {/* displays images that have been uploaded as a preview */}
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
        {/* displays a number of buttons that also provide the ability to upload images by using 
        references */}
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

        {/* button to add images */}
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
