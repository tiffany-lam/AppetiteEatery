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

  handleInput = async (e) => {
    e.preventDefault(); 

  }

  handleClientID = async (e) => {
    e.preventDefault(); 
    this.setState({ client_add: { form: { id: e.target.value } } })
  }

  handleClientFname = async (e) => {
    e.preventDefault(); 
    this.setState({ client_add: { form: { fname: e.target.value } } })
  }

  handleClientLname = async (e) => {
    e.preventDefault(); 
    this.setState({ client_add: { form: { lname: e.target.value } } })
  }

  handleClientEmail = async (e) => {
    e.preventDefault(); 
    this.setState({ client_add: { form: { email: e.target.value } } })
  }

  handleClientImageID = async (e) => {
    e.preventDefault(); 
    this.setState({ client_image: { form: { id: e.target.value } } })
  }

  handleClientImageFile = async (e) => {
    e.preventDefault(); 
    this.setState({ client_image: { file: e.target.files[0] } })
  }

  handleClientDelete = async (e) => {
    e.preventDefault(); 
    this.setState({ client_delete: { id: e.target.value } } )
  }

  handleReviewAddUser = async (e) => {
    e.preventDefault(); 
    this.setState({ review_add: { form: { user: e.target.value } } })
  }

  handleReviewAddRestaurant = async (e) => {
    e.preventDefault(); 
    this.setState({ review_add: { form: { restaurant: e.target.value } } })
  }

  handleReviewAddRating = async (e) => {
    e.preventDefault(); 
    this.setState({ review_add: { form: { rating: e.target.value } } })
  }

  handleReviewAddDate = async (e) => {
    e.preventDefault(); 
    this.setState({ review_add: { form: { date: e.target.value } } })
  }

  handleReviewAddContent = async (e) => {
    e.preventDefault(); 
    this.setState({ review_add: { form: { content: e.target.value } } })
  }

  handleReviewAddImages = async (e) => {
    e.preventDefault(); 
    let images = this.state.review_add.images;

    for (let i = 0; i > e.target.files.length; i++) {
      images.push(e.target.files[i])
    }

    this.setState({ review_add: { images: images } } )
  }

  handleReviewDelete = async (e) => {
    e.preventDefault(); 
    this.setState({ review_delete: { id: e.target.value } } )
  }

  handleNewRestaurantSundayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { sunday: { from: e.target. value } } } } })
  }

  handleNewRestaurantSundayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { sunday: { to: e.target. value } } } } })
  }

  handleNewRestaurantMondayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { monday: { from: e.target. value } } } } })
  }

  handleNewRestaurantMondayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { monday: { to: e.target. value } } } } })
  }

  handleNewRestaurantTuesdayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { tuesday: { from: e.target. value } } } } })
  }

  handleNewRestaurantTuesdayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { tuesday: { to: e.target. value } } } } })
  }

  handleNewRestaurantWednesdayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { wednesday: { from: e.target. value } } } } })
  }

  handleNewRestaurantWednesdayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { wednesday: { to: e.target. value } } } } })
  }

  handleNewRestaurantThursdayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { thursday: { from: e.target. value } } } } })
  }

  handleNewRestaurantThursdayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { thursday: { to: e.target. value } } } } })
  }

  handleNewRestaurantFridayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { friday: { from: e.target. value } } } } })
  }

  handleNewRestaurantFridayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { friday: { to: e.target. value } } } } })
  }

  handleNewRestaurantSaturdayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { saturday: { from: e.target. value } } } } })
  }

  handleNewRestaurantSaturdayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { hours: { saturday: { to: e.target. value } } } } })
  }

  handleNewRestaurantDetailsParking = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { details: { parking: e.target.value } } } })
  }

  handleNewRestaurantDetailsReservation = async (e) => {
    e.preventDefault(); 
    let newval = true;
    if (e.target.value == "false") { newval = false };
    if (e.target.value == "true" ) { newval = true };

    this.setState({ restaurant_new: { form: { details: { parking: newval } } } })
  }

  handleNewRestaurantDetailsPetsAllowed = async (e) => {
    e.preventDefault(); 
    let newval = true;
    if (e.target.value == "false") { newval = false };
    if (e.target.value == "true" ) { newval = true };

    this.setState({ restaurant_new: { form: { details: { petsAllowed: newval } } } })
  }

  handleNewRestaurantDetailsTakeout = async (e) => {
    e.preventDefault(); 
    let newval = true;
    if (e.target.value == "false") { newval = false };
    if (e.target.value == "true" ) { newval = true };

    this.setState({ restaurant_new: { form: { details: { takeout: newval } } } })
  }

  handleNewRestaurantDetailsWifi = async (e) => {
    e.preventDefault(); 
    let newval = true;
    if (e.target.value == "false") { newval = false };
    if (e.target.value == "true" ) { newval = true };

    this.setState({ restaurant_new: { form: { details: { wifi: newval } } } })
  }

  handleNewRestaurantDetailsWaitTime = async (e) => {
    e.preventDefault(); TSTTHISTSGASDGASDG
    this.setState({ restaurant_new: { form: { details: { waitTime: e.target.value } } } })
  }

  handleNewRestaurantName = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { restaurantName: e.target.value } } })
  }

  handleNewRestaurantTags = async (e) => {
    e.preventDefault();
    let tags = this.state.restaurant_new.form.restaurantTags;
    let newtags = tags.append(e.target.value);
    this.setState({ restaurant_new: { form: { restaurantTags: newtags } } });
    e.target.value = "";
  }

  handleNewRestaurantDescription = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { description: e.target.value } } })
  }

  handleNewRestaurantDateOpen = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { dateOpen: e.target.value } } })
  }

  handleNewRestaurantOwnerID = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { ownerid: e.target.value } } })
  }

  handleNewRestaurantAddress = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { address: e.target.value } } })
  }

  handleNewRestaurantCity = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { city: e.target.value } } })
  }

  handleNewRestaurantZipcode = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { zipcode: e.target.value } } })
  }

  handleNewRestaurantState = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { state: e.target.value } } })
  }

  handleNewRestaurantLocationX = async (e) => {
    e.preventDefault(); 
    let location = this.state.restaurant_new.form.location;
    location[0] =  e.target.value;
    this.setState({ restaurant_new: { form: { location: location } } })
  }

  handleNewRestaurantLocationY = async (e) => {
    e.preventDefault(); 
    let location = this.state.restaurant_new.form.location;
    location[1] =  e.target.value;
    this.setState({ restaurant_new: { form: { location: location } } })
  }

  handleNewRestaurantWebsite = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { form: { website: e.target.value } } })
  }

  handleNewRestaurantImages = async (e) => {
    e.preventDefault(); 
    let menu = this.state.restaurant_new.images;
    for (let i = 0; i < e.target.files.length; i++) {
      images.append(e.target.files[i])
    }

    this.setState({ restaurant_new: { images: images } } )
  }

  handleNewRestaurantMenu = async (e) => {
    e.preventDefault(); 
    let menu = this.state.restaurant_new.menu;
    for (let i = 0; i < e.target.files.length; i++) {
      menu.append(e.target.files[i])
    }

    this.setState({ restaurant_new: { menu: menu } } )
  }

  handleARestaurant = async (e) => {
    e.preventDefault(); 
    this.setState({ a_restaurant: { id: e.target.value } } )
  }

  handleRestaurantUpdateID = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_update: { id: e.target.value  } })
  }

  handleRestaurantUpdateQuery = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_update: { query: e.target.value  } })
  }

  handleURestaurantUpdateImages = async (e) => {
    e.preventDefault(); 
    let images = this.state.restaurant_update.images;
    for (let i = 0; i < e.target.files.length; i++) {
      images.append(e.target.files[i])
    }

    this.setState({ restaurant_update: { images: images } } )
  }

  handleUpdateRestaurantMenu = async (e) => {
    e.preventDefault(); 
    let menu = this.state.restaurant_update.menu;
    for (let i = 0; i < e.target.files.length; i++) {
      menu.append(e.target.files[i])
    }

    this.setState({ restaurant_new: { menu: menu } } )
  }

  handleRestaurantDelete = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_delete: { id: e.target.value } } )
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
        <h2>Delete a review</h2>
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
          <label>LocationX:
            <input type="text"></input>
          </label>
          <label>LocationY:
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
