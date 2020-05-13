// import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../utils";
import { Link } from "react-router-dom";

// custom components:
import ImageCard from "../../components/image-card/image-card.component";

// custom stylesheet:
import "./home-page.styles.scss";

const HomePage = () => {
  const [galleryItemHover, setGalleryItemHover] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [limelightContent, setLimelightContent] = useState("");

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
          // console.log("canceled request");
        } else {
          console.error(e);
        }
      }
    };

    fetchData();

    return () => {
      // console.log("canceling axios request");
      setLoading(false);
      source.cancel();
    };
  }, []);

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
