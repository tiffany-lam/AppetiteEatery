// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// custom components:

// custom stylesheet:
import "./restaurant-page.styles.scss";

const RestaurantPage = ({ match }) => {
  // const [limelightContent, setLimelightContent] = useState("");

  console.log(match);

  return (
    <div className="restaurant-page-container">
      Restaurant with id: {match.params.restaurantId}
    </div>
  );
};

export default RestaurantPage;
