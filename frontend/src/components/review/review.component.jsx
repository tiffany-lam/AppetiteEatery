/*
  Contributors: Julie Do 014101748
  Course: CECS 470

  Description: This functional component renders a review and it's relevant information, such as the review's poster (name and avatar), the date it was posted, and it's contents (review and attached images).
*/

// IMPORT MAIN PACKAGES
import React from "react";
import { BASE_API_URL } from "../../utils";

// IMPORT STYLES
import "./review.styles.scss";

// IMPORT COMPONENTS
import Rating from "../rating/rating.component";
import Carousel from "../carousel/carousel.component";

// IMPORT ICONS
import FavoriteIcon from "@material-ui/icons/Favorite";
import FaceIcon from "@material-ui/icons/Face";

// Functional Component Review
const Review = (props) => {
  // Returns the review component containing desired information
  return (
    // This section is the review's parent container.
    <section className="review">
      {/* This section contains the user's information in the restaurant card, as well as when they posted the review. */}
      <section className="review-user-info">
        <p className="username">{props.user}</p>
        {props.avatar ? (
          <img
            src={`${BASE_API_URL}/img-get?url=${props.avatar}`}
            alt={props.avatar}
          ></img>
        ) : (
          <FaceIcon></FaceIcon>
        )}
        <p>{props.date.split(" ")[0]}</p>
      </section>
      {/* This section contains the review's contents, such as the review's rating and the message of the review. */}
      <section className="review-content">
        <Rating
          rating={props.rating}
          maxRating={5}
          icon={<FavoriteIcon />}
        ></Rating>
        {props.restaurant ? <p>{props.restaurant}</p> : null}
        <p>{props.content}</p>
      </section>
      {/* This section contains the reviews images. */}
      <section className="review-photos">
        <Carousel images={props.images} size={3} vertical></Carousel>
      </section>
    </section>
  );
};

// Export the Review function, which returns a review component that renders a reviews information.
export default Review;
