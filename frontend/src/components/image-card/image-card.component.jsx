import React, { useState, useEffect } from "react";
import "./image-card.styles.scss";
import Rating from "../../components/rating/rating.component";

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2002&q=80";

const ImageCard = ({
  name = "none",
  rating = 3,
  imageUrl = DEFAULT_IMAGE_URL,
}) => {
  // const [varA, setVarA] = useState("");
  // const [varB, setVarB] = useState([]);

  // useEffect(() => {
  //   // same as componentDidMount() (not really but sorta; read up on this)
  //   // console.log("rendered");
  // });

  return (
    <div className="image-container">
      <div className="pop-up-details-container">
        <div className="pop-up-details-box">
          <h2>{name}</h2>
          <Rating rating={rating} />
        </div>
      </div>
      <div className="spotlight-mask"></div>
      <img src={`${imageUrl}`} alt=""></img>
    </div>
  );
};

export default ImageCard;
