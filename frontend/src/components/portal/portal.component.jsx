import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./portal.styles.scss";

const root = document.getElementById("root");

const Portal = ({ children }) => {
  // const [varA, setVarA] = useState("");
  // const [varB, setVarB] = useState([]);

  // useEffect(() => {
  //   console.log("Portal mounted!");
  //   // root.insertAdjacentHTML("afterend", '<div id="portal"></div>');

  //   return () => {
  //     console.log("Portal unmounted!");
  //   };
  // }, []);

  return ReactDOM.createPortal(children, document.getElementById("root"));
};

export default Portal;
