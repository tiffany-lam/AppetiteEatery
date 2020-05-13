/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component renders an apply page. The page contains a form with inputs that allow a user to create a new restaurant. These inputs include such things as the restaurant name, restaurant description, restaurant tags, images, menu, and other details. Submitting this form will create a new restaurant under the logged in owner. This page can only be viewed by users registered as an owner.
*/

// main packages:
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../../utils";
import { Link } from "react-router-dom";

// custom components:
import RestaurantCard from "../../components/restaurant-listing-card/restaurantCard.component";
// custom stylesheet:
import "./graduated-page.styles.scss";

const GraduatedPage = ({ userAuth, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const validateAcess = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_API_URL}/restaurant/graduated`, {
          cancelToken: source.token,
        });

        setLoading(false);

        setResults(res.data.results);
        // setOwnersRestaurants(res.data.results);
      } catch (e) {
        if (axios.isCancel(e)) {
        } else {
          console.error(e);
        }
      }
    };

    validateAcess();

    return () => {
      setLoading(false);
      source.cancel();
    };
  }, []);

  return (
    // section contains the apply page html
    <section className="graduated-page-container">
      <section>
        {results.map((restaurant, i) => (
          <Link
            key={i}
            className="image-card-link-2"
            to={`/restaurant/${restaurant._id}`}
          >
            <RestaurantCard
              restaurant={restaurant}
              className="card-listings-2"
            />
          </Link>
        ))}
      </section>
    </section>
  );
};

// maps redux state to the components prop values as a higher order component
const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
});

// exports apply page as the default while wrapping redux state as props to apply page via higher order component
export default connect(mapStateToProps)(GraduatedPage);
