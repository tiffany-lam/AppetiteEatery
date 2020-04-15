import React from "react";

import Rating from "../rating/rating.component";
import CarouselThreeVertical from "../carouselthree-vertical/carouselthree-vertical.component";

import "./review.styles.scss";

const Review = (props) => {
  return (
    <div className="review">
      <div className="review-user-info">
        <img src={props.avatar} alt="User Profile Image"></img>
        <p>{props.user}</p>
        <p>{props.date}</p>
      </div>
      <div className="review-content">
        <Rating></Rating>
        <p>{props.content}</p>
      </div>
      <div className="review-photos">
        <CarouselThreeVertical images={props.images}></CarouselThreeVertical>
      </div>
    </div>
  );
};

export default Review;
