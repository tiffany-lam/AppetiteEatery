import React, { Component } from "react";

import Rating from "../rating/rating.component";
import FaceIcon from "@material-ui/icons/Face";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CloseIcon from "@material-ui/icons/Close";

import "./review-input.styles.scss";

class ReviewInput extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

  handleChange = (e) => {
    let newFiles = this.state.files;

    for (let i = 0; i < e.target.files.length; i++) {
      newFiles.push({
        url: URL.createObjectURL(e.target.files[i]),
        file: e.target.files[i],
      });
    }
    this.setState({ files: newFiles });
  };

  removeImg = (url) => {
    let newFiles = this.state.files.filter((fileObj) => {
      return fileObj.url !== url;
    });
    this.setState({ files: newFiles });
  };

  resetImg = (e) => {};

  render() {
    const preview = this.state.files.map((fileObj, index) => (
      <div className="review-preview">
        <img
          src={fileObj.url}
          alt={`Preview ${index}`}
          className="review-preview-img "
        ></img>
        <button
          type="button"
          className="review-preview-close"
          onClick={() => this.removeImg(fileObj.url)}
        >
          <CloseIcon></CloseIcon>
        </button>
      </div>
    ));

    return (
      <section className="review-input">
        <div className="review-extra">
          <div className="review-user">
            <FaceIcon></FaceIcon>
            {/* <p>{props.user}</p> */}
            <p>me</p>
          </div>
          {/* <div className="review-rating"> */}
          <Rating rating={3} />
          {/* </div> */}
        </div>
        <form className="review-form">
          <label htmlFor="review-input"></label>
          <textarea
            id="review-input"
            name="review-input"
            rows="8"
            cols="33"
          ></textarea>
          <div className="review-form-submit">
            <label htmlFor="upload-img">
              <AddAPhotoIcon></AddAPhotoIcon>
              <input
                type="file"
                id="upload-img"
                name="img"
                accept="image/jpeg, image/png"
                multiple
                onChange={this.handleChange}
              />
            </label>
            <div className="review-preview-container">{preview}</div>
            <input type="submit" value="Review!" />
          </div>
        </form>
      </section>
    );
  }
}

export default ReviewInput;
