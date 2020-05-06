// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

const OwnerRestaurantPage = ({ ...props }) => {
  return (
    <div className="owner-restaurant-page">
      <div className="">OWNERS RES PAGE</div>
      <Link to="/apply">Button</Link>
    </div>
  );
};

export default OwnerRestaurantPage;
