/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component renders the restaurant-owner page, which displays all the restaurants an owner has listed on the website. This page is only accessible by a user who is an owner.
*/

// main packages:
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { BASE_API_URL } from "../../utils";

// redux:
import {
  setUserAuth,
  setCurrentUser,
  resetUserRedux,
} from "../../redux/user/user.actions";

// custom components:
import RestaurantCard from "../../components/restaurant-listing-card/restaurantCard.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import LoadingAnimation from "../../components/loading-animation/loading-animation.component";

// custom stylesheet:
import "./owner-restaurant-page.styles.scss";

// returns the owner restaurant page, displaying all restaurant listings owned by the user
const OwnerRestaurantPage = ({ userAuth, ...props }) => {
  // state variable contains list of owner restaurants
  const [ownersRestaurants, setOwnersRestaurants] = useState([]);
  // state variable determines of the page is still loading/fetching the owners restaurant data
  const [loading, setLoading] = useState(false);

  // function calls on component mount, fetching all the owners restaurant data and loading it into the component
  useEffect(() => {
    let source = axios.CancelToken.source();
    const validateAcess = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_API_URL}/restaurant/owner/${userAuth.uid}`,
          {
            cancelToken: source.token,
          }
        );

        setLoading(false);
        setOwnersRestaurants(res.data.results);
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

  // returns the owner restaurant page with all of the owners restaurant listings
  return (
    <div className="owner-restaurant-page">
      {/* if the owner has at least one restaurant, title the page as your restaurants, else if the owner has no restaurants, title the page with you have not submitted a restaurant to our website */}
      <h1 className="owner-header">
        {ownersRestaurants.length !== 0 && !loading ? "Your Restaurants" : ""}
        {ownersRestaurants.length === 0 && !loading
          ? "You have not submitted a restaurant to our website :("
          : ""}
      </h1>

      {/* if the page is still fetching the restaurant data/loading, then display the loading animation */}
      {loading ? (
        <LoadingAnimation
          text1="fetching your restaurants"
          text2="please wait"
        />
      ) : null}

      {/* display the restaurant owners list of restaurants */}
      {ownersRestaurants.map((restaurant, i) => (
        <Link key={i} to={`/restaurant/${restaurant._id}`}>
          <RestaurantCard restaurant={restaurant} className="card-margin" />
        </Link>
      ))}

      {/* display a link to the submit/apply page to create another restaurant */}
      <Link to="/apply">
        <CustomButton className="submit-res-btn">
          Submit a new restaurant!
        </CustomButton>
      </Link>
    </div>
  );
};

// map redux state to owner restaurant page props
const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
});

// map redux functions to owner restaurant page props
const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  setCurrentUser: (userId) => dispatch(setCurrentUser(userId)),
  resetUserRedux: () => dispatch(resetUserRedux()),
});

// export owner restaurant page as a higher order component with redux wrapper
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnerRestaurantPage);
