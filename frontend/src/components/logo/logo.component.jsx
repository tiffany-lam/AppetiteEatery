/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component returns an image upload input that accepts multiple images to upload. It also displays the uploaded images a preview, and allows users to remove these images from the upload. 
*/

// main packages:
import React, { useState, useEffect } from "react";

// custom components:
import CircleButton from "../circle-btn/circle-btn.component";

// icons:
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

// custom stylesheet:
import "./logo.styles.scss";

// constant variable for different accented characters to be displayed in logo
const letterE = ["e", "ë", "è", "é", "ê"];

// functional component returns designed website logo
const Logo = ({ className, eVersion = 0, uppercase = false }) => {
  // sets eVersion to the default 0 (a regular e) if the eVersion does not exist
  if (eVersion >= letterE.length) eVersion = 0;

  // returns website logo thematically styled
  return (
    <p
      className={`logo-container ${className} ${uppercase ? "uppercase" : ""}`}
    >
      {/* logo containers a fork and knife icon */}
      <CircleButton id="fork-knife-icon">
        <LocalDiningIcon />
      </CircleButton>
      <span id="ap-text">ap</span>
      <span id="petite-text">p{letterE[eVersion]}tite</span>
    </p>
  );
};

export default Logo;
