// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  setUserAuth,
  setCurrentUser,
  resetUserRedux,
} from "../../redux/user/user.actions";

import axios from "axios";

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

  useEffect(() => {}, []);

  if (ownersRestaurants.length !== 0)
    return (
      <div className="owner-restaurant-page">
        <div className="">OWNERS RES PAGE</div>
        <Link to="/apply">Button</Link>
      </div>
    );
  else
    return <div className="owner-restaurant-page">you have no restaurants</div>;
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
