// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// custom components:
import Rating from "../../components/rating/rating.component";

// icons:
import FavoriteIcon from "@material-ui/icons/Favorite";
import LoyaltyIcon from "@material-ui/icons/Loyalty";

// custom stylesheet:
import "./error-page.styles.scss";

const ErrorPage = ({ match }) => {
  const [rating, setRating] = useState(0);
  return (
    <div className="error-page-container">
      <h1>404 NOT FOUND</h1>
      <p>This page does not exist.</p>
      <p>Are you lost sweet summer child?</p>
      <Rating input setRating={setRating} />
      ~
      <Rating vertical maxRating={9} />
      ~
      <Rating rating={3} />
      ~
      <Rating input icon={<FavoriteIcon />} setRating={setRating} />
      ~
      <Rating
        input
        vertical
        icon={<LoyaltyIcon />}
        setRating={setRating}
        maxRating={13}
      />
      {console.log(rating)}
    </div>
  );
};

export default ErrorPage;
