/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component returns a styled radio input for rating. In order words, it uses radio inputs to show and/or select the desired rating (in our use case, for a review). This component also includes accessibility for screen readers. 
*/

// main packages:
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
  icon = <StarsIcon />,
}) => {
  const [ratingSelected, setRatingSelected] = useState(0);

  useEffect(() => {
    if (!input) setRatingSelected(rating);
  }, [ratingSelected]);

  const createIcon = (key, onClick, className, inputHover = "") => {
    return React.cloneElement(icon, {
      key: key,
      onClick: onClick,
      onMouseUp: onClick,
      className: className + " " + inputHover,
    });
  };

  return (
    <div
      className={`rating-container ${
        vertical ? "rating-vertical" : "rating-horizontal"
      } ${input ? "rating-input" : ""}`}
      onMouseOver={() => {
        console.log(rating);
      }}
    >
      {[...Array(maxRating)].map((e, i) =>
        createIcon(
          i,
          () => {
            if (input) {
              setRatingSelected(i + 1);
              setRating(i + 1);
            }
          },
          ratingSelected > i ? "" : "rating-unfilled",
          input ? "rating-input rating-big" : ""
        )
      )}
    </div>
  );
};

export default Rating;
