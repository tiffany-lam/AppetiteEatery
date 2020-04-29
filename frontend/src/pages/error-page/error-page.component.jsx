// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// custom components:
import Rating from "../../components/rating/rating.component";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

// icons:
import FavoriteIcon from "@material-ui/icons/Favorite";
import LoyaltyIcon from "@material-ui/icons/Loyalty";

// custom stylesheet:
import "./error-page.styles.scss";

const ErrorPage = ({ match }) => {
  const [rating, setRating] = useState(0);
  const [fieldValue, setFieldValue] = useState("");

  const handleFieldChange = (e) => {
    setFieldValue(e.target.value);
  };

  return (
    <div className="error-page-container">
      <h1>404 NOT FOUND</h1>
      <p>This page does not exist.</p>
      <p>Are you lost sweet summer child?</p>
      <Rating input setRating={setRating} />
      <FormInput
        label="test"
        value={fieldValue}
        handleChange={handleFieldChange}
      />
      <CustomButton icon={<FavoriteIcon />} margin minimal>
        submit
      </CustomButton>

      <CustomButton icon={<FavoriteIcon />}>submit</CustomButton>
    </div>
  );
};

export default ErrorPage;
