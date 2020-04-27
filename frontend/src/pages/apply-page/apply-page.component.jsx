// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// custom components:
import ImageCard from "../../components/image-card/image-card.component";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

// custom stylesheet:
import "./apply-page.styles.scss";

const ApplyPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [pw, setPw] = useState("");

  return (
    <div className="apply-page-container">
      <form action="">
        <FormInput
          label="restaurant name"
          value={restaurantName}
          handleChange={(e) => {
            setRestaurantName(e.target.value);
          }}
        />

        <FormInput
          label="restaurant name"
          value={restaurantName}
          handleChange={(e) => {
            setRestaurantName(e.target.value);
          }}
          required
        />
        <FormInput
          label="password"
          type="password"
          value={pw}
          handleChange={(e) => {
            setPw(e.target.value);
          }}
          minLength={8}
        />
        <CustomButton margin>submit</CustomButton>
      </form>
    </div>
  );
};

export default ApplyPage;
