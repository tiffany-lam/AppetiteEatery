import React from "react";

import Rating from "../rating/rating.component";
import Carousel from "../carousel/carousel.component";
import FavoriteIcon from "@material-ui/icons/Favorite";

import "./review.styles.scss";

const Review = (props) => {
  return (
    <section className="review">
      <div className="review-user-info">
        <img src={props.avatar} alt="User Profile Image"></img>
        <p>{props.user}</p> <p>{props.date}</p>
      </div>
      <div className="review-content">
        <Rating
          rating={props.rating}
          maxRating={5}
          icon={<FavoriteIcon />}
        ></Rating>
        <p>{props.content}</p>
      </div>
      <div className="review-photos">
        <Carousel images={props.images} size={3} vertical></Carousel>
      </div>
    </section>
  );
};

export default Review;
