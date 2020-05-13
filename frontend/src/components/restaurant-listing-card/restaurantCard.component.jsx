/*
  Contributors: Julie Do 014101748, Sam Alhaqab 017018649, Tiffany Lam 015181853
  Course: CECS 470

  Description: This functional component renders a restaurant listing card, which contains snippets of important information, such as address/location, ratings (average and amount), restaurant name, and restaurant tags. It also displays an image from the restaurants images. This component is meant to provide a brief summary of each restaurant for user viewing.
*/

// IMPORT MAIN PACKAGES
import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "../../utils";

// IMPORT STYLES
import "./restaurantCard.styles.scss";

// IMPORT COMPONENTS
import Tag from "../../components/tag/tag-v2.component";
import Rating from "../../components/rating/rating.component";
import FavoriteIcon from "@material-ui/icons/Favorite";

// This variable is the initial state of the card information, used to render the card when no information has been passed into it.
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

// Functional Component Restaurant Card with props explicitly spread
const RestaurantCard = ({
  className,
  restaurant = INITIAL_STATE,
  ...props
}) => {
  return (
    // This is the parent container of the restaurant card. An article was used as each card can be imported out of the page without a need for context.
    <article
      className={`restaurant-card-container ${className ? className : ""}`}
    >
      {/* Each card will display the restaurants first image. */}
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
      {/* This section is used to style the card's relevant information. */}
      <section className="restaurant-info">
        {/* This div is a wrapper used purely for styling the card's header information, which includes the restaurant name, the restaurants rating, the amount of restaurants, and the restaurants opening date. */}
        <div className="res-header">
          <h2 className="res-name">{restaurant.restaurantName}</h2>
          {/* This div is used purely for styling the cards rating information and opening date to the upper right corner of the card. */}
          <div className="res-extra-normal">
            <p>({restaurant.reviews.length})</p>
            <Rating
              rating={Math.floor(restaurant.average)}
              icon={<FavoriteIcon></FavoriteIcon>}
            ></Rating>
            <p className="res-date">{restaurant.dateOpen.split(" ")[0]}</p>
          </div>
          {/* This div is used purely for styling the cards rating information and opening date to the upper right corner of the card. */}
          <div className="res-extra-shrink">
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
      </section>
    </article>
  );
};

// Export the RestaurantCard function, which returns a restaurant listing card.
export default RestaurantCard;
