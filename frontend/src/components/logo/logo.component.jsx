import React, { useState, useEffect } from "react";

// icons:
import SearchIcon from "@material-ui/icons/Search";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

// custom stylesheet:
import "./logo.styles.scss";

const Logo = ({ className }) => {
  // useEffect(() => {
  //   // same as componentDidMount() (not really but sorta; read up on this)
  // }, []);

  return (
    <p className={`${className}`}>
      {/* <LocalDiningIcon id="fork-knife-icon" /> */}

      <span id="ap-text">ap</span>
      <span id="petite-text">petite</span>
      <LocalDiningIcon id="fork-knife-icon" />
      {/* <FiberManualRecordIcon id="small-dot-icon" /> */}
      <span id="eatery-text">eatery</span>
    </p>
  );
};

export default Logo;
