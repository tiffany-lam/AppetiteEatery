import React, { useState, useEffect } from "react";

// custom components:
import LocalDiningIcon from "@material-ui/icons/LocalDining";

// custom style sheet:
import "./loading-animation.styles.scss";

const LoadingAnimation = ({
  horizontal = false,
  className,
  text1,
  text2,
  background,
  // orientation = "horizontal",
  ...props
}) => {
  useEffect(() => {
    // sets the internal state of this input to the outer state
  }, []);

  return (
    <div
      className={`loading-animation ${
        horizontal ? "" : "animation-text-orientation-vertical"
      } ${background ? "animation-background" : ""}`}
    >
      <p className="animation-text">{text1}</p>
      <div className="square-container">
        <div className="outer-square"></div>
        <div className="inner-square">
          <LocalDiningIcon />
        </div>
      </div>
      <p className="animation-text">{text2}</p>
    </div>
  );
};

export default LoadingAnimation;
