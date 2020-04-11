// import React from "react";
import React, { useState, useEffect } from "react";

// custom components:
import ImageCard from "../../components/image-card/image-card.component";

// custom stylesheet:
import "./home-page.styles.scss";

const restaurants = [
  {
    name: "Waffle House",
    url:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1547&q=80",
    rating: 4,
    limelightCondition: "Offering 20% all bread items!!",
  },

  {
    name: "Auntie Maile's",
    url:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
    rating: 3,
    limelightCondition: "Very close to graduating, don't miss out!",
  },
  {
    name: "Vegeta",
    url:
      "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2002&q=80",
    rating: 2,
    limelightCondition: "",
  },
  {
    name: "Joe's",
    url:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80",
    rating: 5,
    limelightCondition: "",
  },
  {
    name: "Prosperitis",
    url:
      "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    rating: 2,
    limelightCondition: "",
  },
  {
    name: "Lime and Lemons",
    url:
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    rating: 1,
    limelightCondition: "",
  },
  {
    name: "Potato's Sack",
    url:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
    rating: 4,
    limelightCondition: "",
  },
  {
    name: "Engrave",
    url:
      "https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    rating: 3,
    limelightCondition: "",
  },
  {
    name: "To Eat or 2Eat",
    url:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    rating: 4,
    limelightCondition: "",
  },
];

const HomePage = () => {
  const [galleryItemHover, setGalleryItemHover] = useState(false);
  // const [limelightContent, setLimelightContent] = useState("");

  const enableLimelightGlow = () => {
    setGalleryItemHover(true);
  };

  const disableLimeLightGlow = () => {
    setGalleryItemHover(false);
    // setLimelightContent("");
  };

  return (
    <div className="home-page-container">
      <div className="limelight-container">
        <div
          className="header-box"
          onMouseEnter={enableLimelightGlow}
          onMouseLeave={disableLimeLightGlow}
        >
          <h1>limelight</h1>
          <div className="lime"></div>
          <div
            className={`spotlight-wrap-glow ${galleryItemHover ? "glow" : ""}`}
          >
            <div
              className={`spotlight ${galleryItemHover ? "expand-light" : ""}`}
            ></div>
          </div>
        </div>
        {restaurants.map((restaurant, i) => (
          <ImageCard
            key={i}
            className="image-lights-up-limelight"
            onMouseEnter={enableLimelightGlow}
            onMouseLeave={disableLimeLightGlow}
            // onMouseEnter={() => {
            //   enableLimelightGlow();
            //   setLimelightContent(restaurant.limelightCondition);
            // }}

            name={restaurant.name}
            rating={restaurant.rating}
            imageUrl={restaurant.url}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;