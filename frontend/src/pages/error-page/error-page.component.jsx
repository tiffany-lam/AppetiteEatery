// import React from "react";
import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

// custom components:
import Rating from "../../components/rating/rating.component";

// icons:
import FavoriteIcon from "@material-ui/icons/Favorite";
import LoyaltyIcon from "@material-ui/icons/Loyalty";

// custom stylesheet:
import "./error-page.styles.scss";

// const ErrorPage = ({ match }) => {
class ErrorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      client_add: {
        id: "",
        fname: "",
        lname: "",
        email: ""
      },
      client_image: {
        form: {
          id: ""
        },
        file: null
      },
      client_delete: {
        id: ""
      },
      review_add: {
        form: {
          user: "",
          restaurant: "",
          rating: 0,
          date: "",
          content: ""
        },
        images: []
      }, 
      review_delete: {
        id: ""
      },
      restaurant_new: {
        form: { 
          hours: {
            sunday: {
              from: "",
              to: ""
            }, 
            monday: {
              from: "",
              to: ""
            },
            tuesday: {
              from: "",
              to: ""
            },
            wednesday: {
              from: "",
              to: ""
            },
            thursday: {
              from: "",
              to: ""
            },
            friday: {
              from: "",
              to: ""
            }, 
            saturday: {
              from: "",
              to: ""
            }
          },
          details: {
            parking: "",
            reservation: false,
            petsAllowed: false,
            takeout: false,
            wifi: false,
            waitTime: ""
          },
          restaurantName: "",
          restaurantTags: "",
          description: "",
          dateOpen: "",
          ownerid: "",
          address: "",
          city: "",
          zipcode: "",
          state: "",
          location: [],
          website: ""
        },
        images: [],
        menu: []
      },
      a_restaurant: {
        id: ""
      },
      restaurant_update: {
        id: "",
        query: "",
        menu: [],
        images: []
      },
      restaurant_delete: {
        id: ""
      },
      restaurant_images: {
        id: "",
        images: []
      }
    }
  }

  setRating = (rating) => {
    this.setState(rating)
  }

  handleInput = async (e) => {
    e.preventDefault(); 

  }

  addPatron = async (e) => {

  }

  addOwner = async (e) => {

  }

  uploadClientImage = async (e) => {

  }

  deleteClient = async (e) => {

  }

  addReview = async (e) => {

  }

  deleteReview = async (e) => {

  }

  newRestaurant = async (e) => {

  }

  allRestaurants = async (e) => {

  }

  aRestaurant = async (e) => {

  }

  updatedARestaurant = async (e) => {

  }

  deleteRestaurant = async (e) => {

  }

  uploadRestaurantImages = async (e) => {

  }

  fileHandler = async (files) => {
    const formData = new FormData();
    formData.append("image", files);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };


  }

  render() {
    return (
      <div className="error-page-container">
        <h1>404 NOT FOUND</h1>
        <p>This page does not exist.</p>
        <p>Are you lost sweet summer child?</p>
        <Rating input setRating={this.setRating} />
        ~
        <Rating vertical maxRating={9} />
        ~
        <Rating rating={3} />
        ~
        <Rating input icon={<FavoriteIcon />} setRating={this.setRating} />
        ~
        <Rating
          input
          vertical
          icon={<LoyaltyIcon />}
          setRating={this.acceptsetRating}
          maxRating={13}
        />
        {console.log(rating)}
        <h2>Add a Patron</h2>
        <form onSubmit={this.addPatron}>
          <label>ID: 
            <input type="text"></input>
          </label>
          <label>
            First Name:
            <input type="text"></input>
          </label>
          <label>
            Last Name:
            <input type="text"></input>
          </label>
          <label>
            Email:
            <input type="text"></input>
          </label>
          <input type="submit" value="submit" />
        </form>
        <h2>Add an Owner</h2>
        <form>
          <label>ID: 
            <input type="text"></input>
          </label>
          <label>
            First Name:
            <input type="text"></input>
          </label>
          <label>
            Last Name:
            <input type="text"></input>
          </label>
          <label>
            Email:
            <input type="text"></input>
          </label>
          <input type="submit" value="submit" />
        </form>
        <h2>Upload Client Image</h2>
        <form>
          <label>ID:
            <input type="text"></input>
          </label>
          <label>
            <input type="file" accept="image/jpeg, image/png"></input>
          </label>
          <input type="submit" value="submit" />
        </form>
        <h2>Delete a Client</h2>
        <form>
          <label>ID:
            <input type="text"></input>
          </label>
          <input type="submit" value="submit" />
        </form>
        <h2>Add a review</h2>
        <form>
          <label>User:
            <input type="text"></input>
          </label>
          <label>Restaurant:
            <input type="text"></input>
          </label>
          <label>Rating:
            <input type="text"></input>
          </label>
          <label>Date:
            <input type="text"></input>
          </label>
          <label>Content:
            <input type="text"></input>
          </label>
          <label>Images:
            <input type="file" accept="image/jpeg, image/png" multiple></input>
          </label>
          <input type="submit" value="submit" />
        </form>
        <h2>Delete a reivew</h2>
        <form>
          <label>ID:
            <input type="text"></input>
          </label>
          <input type="submit" value="submit" />
        </form>
        <h2>New restaurant</h2>
        <form>
          <label>Sunday From:
            <input type="text"></input>
          </label>
          <label>Sunday To:
            <input type="text"></input>
          </label>
          <label>Monday From:
            <input type="text"></input>
          </label>
          <label>Monday To:
            <input type="text"></input>
          </label>
          <label>Tuesday From:
            <input type="text"></input>
          </label>
          <label>Tuesday To:
            <input type="text"></input>
          </label>
          <label>Wednesday From:
            <input type="text"></input>
          </label>
          <label>Wednesday To:
            <input type="text"></input>
          </label>
          <label>Thursday From:
            <input type="text"></input>
          </label>
          <label>Thursday To:
            <input type="text"></input>
          </label>
          <label>Friday From:
            <input type="text"></input>
          </label>
          <label>Friday To:
            <input type="text"></input>
          </label>
          <label>Saturday From:
            <input type="text"></input>
          </label>
          <label>Saturday To:
            <input type="text"></input>
          </label>
          <label>Details:
            <input type="text"></input>
          </label>
          <label>Reservation:
            <input type="text"></input>
          </label>
          <label>Pets Allowed:
            <input type="text"></input>
          </label>
          <label>Take Out:
            <input type="text"></input>
          </label>
          <label>Wifi:
            <input type="text"></input>
          </label>
          <label>Wait Time:
            <input type="text"></input>
          </label>
          <label>Restaurant Name:
            <input type="text"></input>
          </label>
          <label>Restaurant Tags:
            <input type="text"></input>
          </label>
          <label>Restaurant Tags:
            <input type="text"></input>
          </label>
          <label>Restaurant Tags:
            <input type="text"></input>
          </label>
          <label>Description:
            <input type="text"></input>
          </label>
          <label>Date Open:
            <input type="text"></input>
          </label>
          <label>Owner ID:
            <input type="text"></input>
          </label>
          <label>Address:
            <input type="text"></input>
          </label>
          <label>City:
            <input type="text"></input>
          </label>
          <label>Zipcode:
            <input type="text"></input>
          </label>
          <label>State:
            <input type="text"></input>
          </label>
          <label>Location:
            <input type="text"></input>
          </label>
          <label>Website Url:
            <input type="text"></input>
          </label>
          <label>Menu Images:
            <input type="file" accept="image/jpeg, image/png" multiple></input>
          </label>
          <label>Images:
            <input type="file" accept="image/jpeg, image/png" multiple></input>
          </label>
          <input type="submit" value="submit" />
        </form>
        <h2>Get all restaurants</h2>
        <button></button>
        <h2>Get a restaurant</h2>
        <form>
          <label>ID:
            <input type="text"></input>
          </label>
          <input type="submit" value="submit" />
        </form>
        <h2>Update a restaurant</h2>
        <form>
          <label>ID:
            <input type="text"></input>
          </label>
          <label>Query String:
            <input type="text"></input>
          </label>
          <label>Menu Images:
            <input type="file" accept="image/jpeg, image/png" multiple></input>
          </label>
          <label>Images:
            <input type="file" accept="image/jpeg, image/png" multiple></input>
          </label>
          <input type="submit" value="submit" />
        </form>
        <h2>Delete a restaurant</h2>
        <form>
          <label>ID:
            <input type="text"></input>
          </label>
          <input type="submit" value="submit" />
        </form>
        <h2>Upload restaurant images</h2>
        <form>
          <label>ID:
            <input type="text"></input>
          </label>
          <label>Images:
            <input type="file" accept="image/jpeg, image/png" multiple></input>
          </label>
          <input type="submit" value="submit" />
        </form>

        <form action="http://127.0.0.1:5000/fronttest" method="POST" onSubmit={test}>
          <label for="tester">tester</label>
          <input name="tester" id="tester" value="tester"/>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
};

export default ErrorPage;
