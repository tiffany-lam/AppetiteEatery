/*
  Contributors: Julie Do 014101748
  Course: CECS 470

  Description: This class component renders a review input used for users to post a review to a 
  specifc restaurant. It allows users to upload images with their review, and preview these as 
  well. They may post some message in the review, and select a max rating of 5 hearts.
*/

// IMPORT MAIN PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../../utils";

// IMPORT STYLES
import "./review-input.styles.scss";

// IMPORT COMPONENTS
import Rating from "../rating/rating.component";

// IMPORT ICONS
import FaceIcon from "@material-ui/icons/Face";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

// Class Component Review Input
class ReviewInput extends Component {
  // The class components contructor intializes a state which contains a files variable to hold
  // all image files uploaded by the user, a rating value defaulted to 1 (as 0 is not allowed),
  // and a contents variable to contain the message posted by the user. The constructor also sets
  // two variables used for API request cancelling.
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      rating: 1,
      content: "",
    };

    this.cancelToken = axios.CancelToken;
    this.source = this.cancelToken.source();
  }

  // When the component unmounts, cancel all API requests to avoid a memory leak.
  componentWillUnmount() {
    this.source.cancel(
      "Review input component unmounting, axios requests cancelled."
    );
  }

  // This handles any changes on an image upload and stores the images into the state variable.
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

  // This function removes any images removed by the user.
  removeImg = (url) => {
    let newFiles = this.state.files.filter((fileObj) => {
      return fileObj.url !== url;
    });
    this.setState({ files: newFiles });
  };

  // This function allows the user to set their reviews rating.
  setRating = (rating) => {
    this.setState({ rating: rating });
  };

  // This function submits an API request to the backend server to post a new review.
  submitReview = async (e) => {
    e.preventDefault();

    let currentDate = new Date();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();

    let date = year + "-" + month + "-" + day;

    let newReview = {
      user: this.props.userAuth.uid,
      restaurant: this.props.restaurant,
      rating: this.state.rating,
      date: date,
      content: this.state.content,
    };

    await axios
      .post("http://127.0.0.1:5000/api/review", newReview)
      .then(async (res) => {
        let id = res.data._id.$oid;
        let formData = new FormData();

        for (let i = 0; i < this.state.files.length; i++) {
          formData.append("images[]", this.state.files[i].file);
        }

        return await axios.post(
          `http://127.0.0.1:5000/api/review/img-upload/${id}`,
          formData,
          { "Content-Type": "multipart/form-data" }
        );
      })
      .then((res) => {
        let updatedReview = res.data;
        updatedReview.user = this.props.currentUser;
        updatedReview.date = date;
        this.props.updateReviews(updatedReview);
      })
      .catch((error) => console.error(error));
  };

  // Render the review input component with it's information.
  render() {
    // This variable displays any images that a user has uploaded as a preview on the review
    // input component.
    const preview = this.state.files.map((fileObj, index) => (
      <div className="review-preview" key={index}>
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

    // Return the review input component with all of it's forms and relevant information.
    return (
      // This section is the parent container of the review input component.
      <section className="review-input">
        {/* This div is used purely to style the top of the review-input component. */}
        <div className="review-head">
          {/* This section contains all of the reviewing user's relevant information. */}
          <section className="review-user">
            {this.props.currentUser.avatar ? (
              <img
                src={`${BASE_API_URL}/img-get?url=${this.props.currentUser.avatar}`}
                alt={this.props.currentUser.avatar}
              />
            ) : (
              <FaceIcon></FaceIcon>
            )}
            <p>
              {this.props.currentUser.fname} {this.props.currentUser.lname}
            </p>
          </section>
          {/* This component allows the user to set a rating. */}
          <Rating
            input
            maxRating={5}
            icon={<FavoriteIcon />}
            setRating={this.setRating}
          />
        </div>
        {/* This form contains the review inputs. */}
        <form className="review-form" onSubmit={this.submitReview}>
          {/* This is the textarea for the review's input message. */}
          <label htmlFor="review-input"></label>
          <textarea
            id="review-input"
            name="review-input"
            rows="8"
            cols="33"
            value={this.state.content}
            placeholder="Write your review here..."
            onChange={(e) => {
              this.setState({ content: e.target.value });
            }}
          ></textarea>
          {/* This div is used purely to style the bottom of the review component. */}
          <div className="review-form-bottom">
            {/* This input is to upload images. */}
            <label htmlFor="upload-img">
              <AddIcon></AddIcon>
              <input
                type="file"
                id="upload-img"
                name="img"
                accept="image/jpeg, image/png"
                multiple
                onChange={this.handleChange}
              />
            </label>
            {/* This div is purely to style the image previews. */}
            <div className="review-preview-container">{preview}</div>
            {/* This is the submit button. */}
            <input type="submit" value="Post Review" />
          </div>
        </form>
      </section>
    );
  }
}

// This is a variable used to wrap the functional Review Input component as a higher order component to attach user redux variables shared globally. The user redux variables here are the logged in user's information.
const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  currentUser: user.currentUser,
});

// Attach the redux values as a higher order component to the review input and export as the default component of this file.
export default connect(mapStateToProps)(ReviewInput);
