// import React from "react";
import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

// custom components:
import Rating from "../../components/rating/rating.component";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

// icons:
import FavoriteIcon from "@material-ui/icons/Favorite";
import LoyaltyIcon from "@material-ui/icons/Loyalty";

// custom stylesheet:
import "./error-page.styles.scss";

// const ErrorPage = ({ match }) => {
class ErrorPage extends React.Component {
 
  

  
  render() {
    return (
      <div className="error-page-container">
        <h1>404 NOT FOUND</h1>
        <p>This page does not exist.</p>
        <p>Are you lost sweet summer child?</p>
      </div>
    );
  }

} 

export default ErrorPage;
