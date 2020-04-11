import React, { useState, useEffect } from "react";

// icons:
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

// custom stylesheet:
import "./logo.styles.scss";

const letterE = ["e", "ë", "è", "é", "ê"];

const Logo = ({ className, eVersion = 0, uppercase = false }) => {
  // useEffect(() => {
  // }, []);

  // sets eVersion to the default 0 (a regular e) if the eVersion does not exist
  if (eVersion >= letterE.length) eVersion = 0;

  return (
    <p className={`${className} ${uppercase ? "uppercase" : ""}`}>
      {/* <LocalDiningIcon id="fork-knife-icon" /> */}

      <span id="ap-text">ap</span>
      <span id="petite-text">p{letterE[eVersion]}tite</span>
      <LocalDiningIcon id="fork-knife-icon" />
      {/* <FiberManualRecordIcon id="small-dot-icon" /> */}
      <span id="eatery-text">eatery</span>
    </p>
  );
};

export default Logo;
