import React, { useState, useEffect } from "react";

import "./restaurantCard.styles.scss";

const INITIAL_STATE = {
  ownerid: "",
  website: "",
  restaurantName: "",
  description: "",
  dateOpen: "",
  address: "",
  address2: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  location: [],
  restaurantTags: [],
  details: {},
  hours: {},
  images: [],
  menu: [],
  limelightCondition: "",
};
const RestaurantCard = ({ restaurant = INITIAL_STATE, ...props }) => {
  return (
    <section className="restaurant-card-container">
      {restaurant.restaurantName}
    </section>
  );
};

export default RestaurantCard;
