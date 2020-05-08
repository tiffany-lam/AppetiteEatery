import React from "react";

import Rating from "../rating/rating.component";
import Carousel from "../carousel/carousel.component";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { BASE_API_URL } from "../../utils";

import "./review.styles.scss";

const Review = (props) => {
  return (
    <section className="review">
      <div className="review-user-info">
        {/* <button
          onClick={() => {
            console.log(props.avatar);
          }}
        >
          CLICK
        </button> */}
        <p className="username">{props.user}</p>
        <img
          src={
            props.avatar
              ? `${BASE_API_URL}/img-get?url=${props.avatar}`
              : "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          }
          // src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          // alt="User Profile Image"
        ></img>
        <p>{props.date.split(" ")[0]}</p>
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
