/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component renders the home page of our website, which contains a list of links to our more popular restaurants. These links display the restaurant name, rating, and an image from the restaurant.
*/

// main packages:
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../utils";

// custom components:
import ImageCard from "../../components/image-card/image-card.component";

// custom stylesheet:
import "./home-page.styles.scss";

// home page renders a list of links to popular restaurants
const HomePage = () => {
  // state variable determines css style of the restaurant listing that is currently being hovered on
  const [galleryItemHover, setGalleryItemHover] = useState(false);
  // state variabel holds restaurants to be displayed
  const [results, setResults] = useState([]);
  // state variable determines whether or not the page is currently loading/fetching data
  const [loading, setLoading] = useState(false);

  // called on component mount and fecthes restaurant data from backend
  useEffect(() => {
    let source = axios.CancelToken.source();
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`${BASE_API_URL}/restaurant/limelight`, {
          cancelToken: source.token,
        });

        if (res.data.results) setResults(res.data.results);
        setLoading(false);
      } catch (e) {
        if (axios.isCancel(e)) {
        } else {
          console.error(e);
        }
      }
    };

    fetchData();

    return () => {
      setLoading(false);
      source.cancel();
    };
  }, []);

  // sets the galleryItemHover variable to true/to animate the limelight
  const enableLimelightGlow = () => {
    setGalleryItemHover(true);
  };

  // sets the galleryItemHover variable to false/to stop animating the limelight
  const disableLimeLightGlow = () => {
    setGalleryItemHover(false);
  };

  // returns home page with a list of popular restaurants
  return (
    <div className="home-page-container">
      <div className="limelight-container">
        {/* the first container displayed on the page is a css styled lime with a spotlight which animates if you hover on it */}
        <div
          className="header-box"
          onMouseEnter={enableLimelightGlow}
          onMouseLeave={disableLimeLightGlow}
        >
          <svg viewBox="0 0 88 18">
            <text x="1" y="14.5">
              limelight
            </text>
          </svg>
          <div className="lime"></div>
          <div
            className={`spotlight-wrap-glow ${galleryItemHover ? "glow" : ""}`}
          >
            <div
              className={`spotlight ${galleryItemHover ? "expand-light" : ""}`}
            ></div>
          </div>
        </div>

        {/* the rest of the cards displayed on the page are restaurant image cards */}
        {results.map((restaurant, i) => (
          <ImageCard
            key={i}
            to={`/restaurant/${restaurant.id}`}
            className="image-lights-up-limelight"
            onMouseEnter={enableLimelightGlow}
            onMouseLeave={disableLimeLightGlow}
            name={restaurant.restaurantName}
            rating={restaurant.reviewAverage}
            imageUrl={`${BASE_API_URL}/img-get?url=${restaurant.images[0]}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
