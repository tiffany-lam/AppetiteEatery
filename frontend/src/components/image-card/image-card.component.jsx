/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component returns a image card for restaurants with a link attached that redirects the user, on click, to the associated restaurant. It displays a restaurant image, the restaurant name, and the restaurants rating. This image card is used to expose and feature a restaurant with minimal information.
*/

// main packages:
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// custom stylesheets:
import "./image-card.styles.scss";

// custom components:
import Rating from "../../components/rating/rating.component";

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2002&q=80";

// returns an designed card displaying a restaurant image, name, and rating
const ImageCard = ({
  name = "none",
  rating = 3,
  imageUrl = DEFAULT_IMAGE_URL,
  className,
  to = "/",
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    // each card is a link/anchor to it's associated restaurant page
    <Link
      to={to}
      className={`image-container ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="pop-up-details-container">
        {/* name and ratining container */}
        <div className="pop-up-details-box">
          <h2>{name}</h2>
          <Rating rating={rating} />
        </div>
      </div>
      <div className="spotlight-mask"></div>
      {/* image to be displayed */}
      <img src={`${imageUrl}`} alt=""></img>
    </Link>
  );
};

export default ImageCard;
