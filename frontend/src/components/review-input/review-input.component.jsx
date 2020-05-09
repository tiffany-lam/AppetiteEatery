import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../../utils";

import Rating from "../rating/rating.component";
import FaceIcon from "@material-ui/icons/Face";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import StarsRoundedIcon from "@material-ui/icons/StarsRounded";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import "./review-input.styles.scss";

class ReviewInput extends Component {
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

  componentWillUnmount() {
    this.source.cancel(
      "Review input component unamounting, axios requests cancelled."
    );
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

  setRating = (rating) => {
    this.setState({ rating: rating });
  };

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

    // console.log(datae)

    await axios
      .post("http://127.0.0.1:5000/api/review", newReview)
      .then(async (res) => {
        console.log("Review created: \n");
        console.log(res.data);

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
        console.log("Review images uploaded: \n");
        console.log(res.data);
        let updatedReview = res.data;
        updatedReview.user = this.props.currentUser;
        updatedReview.date = date;
        this.props.updateReviews(updatedReview);
      })
      .catch((error) => console.error(error));
  };

  render() {
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

    return (
      <section className="review-input">
        <div className="review-extra">
          <div className="review-user">
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
          </div>
          <Rating
            input
            maxRating={5}
            icon={<FavoriteIcon />}
            setRating={this.setRating}
          />
        </div>
        <form className="review-form" onSubmit={this.submitReview}>
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
          <div className="review-form-submit">
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
            <div className="review-preview-container">{preview}</div>
            <input type="submit" value="Post Review" />
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(ReviewInput);
