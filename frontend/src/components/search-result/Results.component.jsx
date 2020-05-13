import React, { Component, useEffect, useState } from "react";
import RestaurantCard from "../restaurant-listing-card/restaurantCard.component";
import { Link } from "react-router-dom";

import "./results.styles.scss";

const Results = ({ results, loading }) => {
  return (
    /* Using bootstrap for pagination*/
    // <div>
    <React.Fragment>
      {results.map((restaurant, i) => (
        <Link
          key={i}
          className="image-card-link"
          to={`/restaurant/${restaurant._id}`}
        >
          <RestaurantCard restaurant={restaurant} className="card-listings" />
        </Link>
      ))}
    </React.Fragment>
    // </div>
  );
};
export default Results;
