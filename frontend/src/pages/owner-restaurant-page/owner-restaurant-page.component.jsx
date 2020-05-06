// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import {
  setUserAuth,
  setCurrentUser,
  resetUserRedux,
} from "../../redux/user/user.actions";

// custom components:
import ImageCard from "../../components/image-card/image-card.component";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ImageUploadInput from "../../components/img-upload-input/img-upload-inputcomponent";
import SelectInput from "../../components/select-input/select-input.component";
import HourRangeInput from "../../components/hour-range-input/hour-range.component";
import Tag from "../../components/tag/tag-v2.component";
import AddTagInput from "../../components/add-tag-input/add-tag-input.component";

// custom stylesheet:
import "./owner-restaurant-page.styles.scss";

const OwnerRestaurantPage = ({ userAuth, ...props }) => {
  const [ownersRestaurants, setOwnersRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = "5ead3201520a017539dfa306";

  useEffect(() => {
    console.log("restaurant page");
    let source = axios.CancelToken.source();
    const validateAcess = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/api/restaurant/owner/${id}`,
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

  if (ownersRestaurants.length !== 0)
    return (
      <div
        className="owner-restaurant-page"
        onClick={() => {
          console.log(ownersRestaurants);
        }}
      >
        <div className="">OWNERS RES PAGE</div>
        <Link to="/apply">Button</Link>
      </div>
    );
  else
    return (
      <div className="owner-restaurant-page">
        <p>you have no restaurants</p>
        <Link to="/apply">Button</Link>
      </div>
    );
};

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  setCurrentUser: (userId) => dispatch(setCurrentUser(userId)),
  resetUserRedux: () => dispatch(resetUserRedux()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnerRestaurantPage);
