import React, { useState, useEffect } from "react";

import Tag from "../../components/tag/tag-v2.component";

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

const RestaurantCard = ({
  className,
  restaurant = INITIAL_STATE,
  ...props
}) => {
  return (
    <section
      className={`restaurant-card-container ${className ? className : ""}`}
    >
      <img
        src={`http://127.0.0.1:5000/api/img-get?url=${restaurant.images[0]}`}
        alt=""
      />

      <div className="restaurant-info">
        <p className="res-name">{restaurant.restaurantName}</p>
        <p className="res-address">{`${restaurant.address} ${
          restaurant.city
        } ${restaurant.state.toUpperCase()} USA`}</p>
        <p className="res-description">{`${restaurant.description.slice(
          0,
          100
        )}...`}</p>
        <ul className="tag-list">
          {restaurant.restaurantTags.map((tag, i) => (
            <Tag key={i} value={tag} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RestaurantCard;
