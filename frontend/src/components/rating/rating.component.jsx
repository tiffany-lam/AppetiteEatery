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
  htmlFor = "rating",
  rating = 0,
  input = false,
  setRating = () => {},
  maxRating = 5,
  vertical = false,
  icon = <StarsIcon />,
  ...props
}) => {
  const [ratingSelected, setRatingSelected] = useState(0);
  const [ratingRefs, setRatingRefs] = useState([]);

  useEffect(() => {
    const refs = [];
    [...Array(maxRating)].forEach(() => {
      refs.push(React.createRef());
    });
    setRatingRefs(refs);
  }, []);

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
      role="img"
      aria-label={`Rating for ${htmlFor}: ${ratingSelected} of ${maxRating}`}
      className={`rating-container ${
        vertical ? "rating-vertical" : "rating-horizontal"
      } ${input ? "rating-input" : ""}`}
    >
      {[...Array(maxRating)].map((e, i) => (
        <React.Fragment key={i}>
          {createIcon(
            i,
            () => {
              if (input) {
                setRatingSelected(i + 1);
                setRating(i + 1);
                ratingRefs[i].current.click();
              }
            },
            input
              ? ratingSelected > i
                ? ""
                : "rating-unfilled"
              : rating > i
              ? ""
              : "rating-unfilled",
            input ? "rating-input rating-big" : ""
          )}
          <label htmlFor={`${htmlFor}-${i}`}>
            <input
              required={props.required}
              type="radio"
              className="rating-hidden"
              id={`${htmlFor}-${i}`}
              name={htmlFor}
              ref={ratingRefs[i]}
            ></input>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Rating;
