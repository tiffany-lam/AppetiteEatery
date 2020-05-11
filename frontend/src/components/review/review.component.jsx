import React from "react";

import Rating from "../rating/rating.component";
import Carousel from "../carousel/carousel.component";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FaceIcon from "@material-ui/icons/Face";
import { BASE_API_URL } from "../../utils";

import "./review.styles.scss";

const Review = (props) => {
  return (
    <section className="review">
      <div className="review-user-info">
        <p className="username">{props.user}</p>
        {props.avatar ? (
          <img
            src={`${BASE_API_URL}/img-get?url=${props.avatar}`}
            alt={props.avatar}
            onClick={(e) => {
              console.log(props.avatar ? "yes" : "no");
            }}
          ></img>
        ) : (
          <FaceIcon></FaceIcon>
        )}
        <p>{props.date.split(" ")[0]}</p>
      </div>
      <div className="review-content">
        <Rating
          rating={props.rating}
          maxRating={5}
          icon={<FavoriteIcon />}
        ></Rating>
        {props.restaurant ? <p>{props.restaurant}</p> : null}
        <p>{props.content}</p>
      </div>
      <div className="review-photos">
        <Carousel images={props.images} size={3} vertical></Carousel>
      </div>
    </section>
  );
};

export default Review;
