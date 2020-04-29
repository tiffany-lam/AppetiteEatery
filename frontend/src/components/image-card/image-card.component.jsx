import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Rating from "../../components/rating/rating.component";
import "./image-card.styles.scss";

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2002&q=80";

const ImageCard = ({
  name = "none",
  rating = 3,
  imageUrl = DEFAULT_IMAGE_URL,
  className,
  to = "/",
  onMouseEnter,
  onMouseLeave,
}) => {
  // const [varA, setVarA] = useState("");
  // const [varB, setVarB] = useState([]);

  // useEffect(() => {
  //   // console.log("rendered");
  // });

  return (
    <Link
      to={to}
      className={`image-container ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="pop-up-details-container">
        <div className="pop-up-details-box">
          <h2>{name}</h2>
          <Rating rating={rating} />
        </div>
      </div>
      <div className="spotlight-mask"></div>
      <img src={`${imageUrl}`} alt=""></img>
    </Link>
  );
};

export default ImageCard;
