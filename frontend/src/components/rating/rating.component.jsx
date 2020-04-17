import React, { useState, useEffect } from "react";
import StarsIcon from "@material-ui/icons/Stars";

import "./rating.styles.scss";

const Rating = ({
  rating = 0,
  input = false,
  setRating = (value) => {
    return;
  },
  maxRating = 5,
  vertical = false,
}) => {
  const [ratingSelected, setRatingSelected] = useState(0);

  useEffect(() => {
    if (!input) setRatingSelected(rating);
  }, [ratingSelected]);

  return (
    <div
      className={`rating-container ${
        vertical ? "rating-vertical" : "rating-horizontal"
      }`}
    >
      {console.log("Rating Rendering")}
      {[...Array(maxRating)].map((e, i) => (
        <StarsIcon
          key={i}
          onClick={(e) => {
            if (input) {
              setRatingSelected(i + 1);
              setRating(i + 1);
            }
          }}
          className={ratingSelected > i ? "rating-filled" : "rating-unfilled"}
        />
      ))}
    </div>
  );
};

export default Rating;
