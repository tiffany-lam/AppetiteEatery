import React, { Component, useEffect, useState } from "react";
import RestaurantCard from "../restaurant-listing-card/restaurantCard.component";
import { Link } from "react-router-dom";

const Results = ({results, loading}) =>{
    if(loading){
        return <h2>Loading...</h2>;
    }
    return(
        /* Using bootstrap for pagination*/
        <div>
            {results.map((restaurant, i) => (
            <Link key={i} to={`/restaurant/${restaurant._id}`}>
              <RestaurantCard restaurant={restaurant} className="card-margin" />
            </Link>
          ))}
        </div>
 
    )
}
export default Results;