/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This class component renders a loading animation class which displays a loading
  animation.
*/

// main packages:
import React, { useEffect } from "react";

// custom components:
import LocalDiningIcon from "@material-ui/icons/LocalDining";

// custom style sheet:
import "./loading-animation.styles.scss";

// returns a loading animation
const LoadingAnimation = ({
  horizontal = false,
  className,
  text1,
  text2,
  background,
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
      {/* displays optional texts */}
      {text1 && <p className="animation-text">{text1}</p>}

      <div className="square-container">
        <div className="outer-square"></div>
        <div className="inner-square">
          <LocalDiningIcon />
        </div>
      </div>
      {/* displays optional texts */}
      {text2 && <p className="animation-text">{text2}</p>}
    </div>
  );
};

export default LoadingAnimation;
