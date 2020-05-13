/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component returns a styled radio input for rating. In order words, 
  it uses radio inputs to show and/or select the desired rating (in our use case, for a review). 
  This component also includes accessibility for screen readers. 
*/

// main packages:
import React, { useState, useEffect } from "react";

// mui icons:
import StarsIcon from "@material-ui/icons/Stars";

// custom stylesheets:
import "./rating.styles.scss";

// returns a rating component which can be optionally used as an input or simply to display
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
  // state variables holding rating references and which rating is currently selected
  const [ratingSelected, setRatingSelected] = useState(0);
  const [ratingRefs, setRatingRefs] = useState([]);

  // on component mount, creates the desired amount of references
  useEffect(() => {
    const refs = [];
    [...Array(maxRating)].forEach(() => {
      refs.push(React.createRef());
    });
    setRatingRefs(refs);
  }, []);

  // on component mount or update of ratingSelected variable, conditionally modifies the
  // ratingSelcted variable
  useEffect(() => {
    if (!input) setRatingSelected(rating);
  }, [ratingSelected]);

  // creates and clones the desired icons
  const createIcon = (key, onClick, className, inputHover = "") => {
    return React.cloneElement(icon, {
      key: key,
      onClick: onClick,
      onMouseUp: onClick,
      className: className + " " + inputHover,
    });
  };

  // returns the rating component with either inputs or icons
  return (
    <div
      role="img"
      aria-label={`Rating for ${htmlFor}: ${ratingSelected} of ${maxRating}`}
      className={`rating-container ${
        vertical ? "rating-vertical" : "rating-horizontal"
      } ${input ? "rating-input" : ""}`}
    >
      {/* clones desired icons according the passing in amount and conditionally sets the
      css class to show if the icon is filled or not */}
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
          {/* radio inputs for each icon displayed */}
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
