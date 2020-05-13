/*
  Contributors: Julie Do 014101748
  Course: CECS 470

  Description: This class is a simple divider component using the hr tag. It is styled so that all uses of it do not need to style it according to our websites theme. It should only be used when there is a thematic break or change in the content it is separated. 
*/

// IMPORT MAIN PACKAGES
import React from "react";

// IMPORT STYLES
import "./divider.styles.scss";

// Functional Component Divider
const Divider = (props) => {
  // Returns a simple hr, styled according to our theme
  return (
    <React.Fragment>
      <hr
        className={
          props.full
            ? `${props.className} divider-full`
            : `${props.className} divider-edge`
        }
      />
    </React.Fragment>
  );
};

// Export the Divider function, which returns a dynamically rendered component, as the default.
export default Divider;
