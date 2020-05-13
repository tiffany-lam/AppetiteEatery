import React, { useState, useEffect } from "react";

import Tag from "../../components/tag/tag-v2.component";
import Rating from "../../components/rating/rating.component";
import FavoriteIcon from "@material-ui/icons/Favorite";

import "./restaurantCard.styles.scss";

import { BASE_API_URL } from "../../utils";

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
  average: 0,
};

const RestaurantCard = ({
  className,
  restaurant = INITIAL_STATE,
  ...props
}) => {
  return (
    // article works better since it represents a self-contained composition in a document
    <article
      className={`restaurant-card-container ${className ? className : ""}`}
    >
      <img
        src={`${BASE_API_URL}/img-get?url=${restaurant.images[0]}`}
        alt={`${
          restaurant.images[0] ? restaurant.images[0].slice(0, 5) : "Image"
        }...`}
        onMouseOver={(e) => {
          console.log(restaurant);
          console.log(Math.floor(restaurant.average));
        }}
      />

      <div className="restaurant-info">
        <div className="res-header">
          <h2 className="res-name">{restaurant.restaurantName}</h2>
          <div className="res-rating-normal">
            <p>({restaurant.reviews.length})</p>
            <Rating
              rating={Math.floor(restaurant.average)}
              icon={<FavoriteIcon></FavoriteIcon>}
            ></Rating>
            <p className="res-date">{restaurant.dateOpen.split(" ")[0]}</p>
          </div>
          <div className="res-rating-shrink">
            <Rating
              rating={1}
              maxRating={1}
              icon={<FavoriteIcon></FavoriteIcon>}
            ></Rating>
            <p>{restaurant.average.toFixed(1)}</p>
          </div>
        </div>
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
    </article>
  );
};

export default RestaurantCard;
