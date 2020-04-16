// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// custom components:

// custom stylesheet:
import "./error-page.styles.scss";

const ErrorPage = ({ match }) => {
  return (
    <div className="error-page-container">
      <h1>404 NOT FOUND</h1>
      <p>This page does not exist.</p>
      <p>Are you lost sweet summer child?</p>
    </div>
  );
};

export default ErrorPage;
