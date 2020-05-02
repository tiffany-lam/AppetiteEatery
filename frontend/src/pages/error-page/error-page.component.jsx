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
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      fieldValue: "",
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
          restaurantTags: [],
          description: "",
          dateOpen: "",
          ownerid: "",
          address: "",
          city: "",
          zipcode: "",
          state: "",
          location: [0, 0],
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
      },
      temporary: "",
    }
  }

  setRating = (rating) => {
    this.setState(rating)
  }

  addPatron = async (e) => {
    e.preventDefault();
    let patron = this.state.client_add;
    await axios.post("http://127.0.0.1:5000/api/user/patron", patron)
                .then(res => {
                  console.log("Returned New Patron: \n");
                  console.log(res.data);
                }).catch(error => console.error(error));
  }

  addOwner = async (e) => {
    e.preventDefault();
    let owner = this.state.client_add;
    await axios.post("http://127.0.0.1:5000/api/user/owner", owner)
                .then(res => {
                  console.log("Returned New Owner: \n");
                  console.log(res.data);
                }).catch(error => console.error(error));
  }

  uploadClientImage = async (e) => {
    e.preventDefault();
    let id = this.state.client_image.form.id;

    let formData = new FormData();
    formData.append("avatar", this.state.client_image.file);

    await axios.post(`http://127.0.0.1:5000/api/user/img-upload/${id}`, formData, { "Content-Type": "multipart/form-data"})
         .then(res => {
           console.log("Uploaded Client Avatar: \n");
           console.log(res.data);
         }).catch(error => console.error(error));
  }

  deleteClient = async (e) => {
    e.preventDefault();
    let id = this.state.client_delete.id;
    await axios.delete(`http://127.0.0.1:5000/api/user/${id}`)
               .then(res => {
                 console.log("Deleted User: \n");
                 console.log(res.data);
               }).catch(error => console.error(error));
  }

  addReview = async (e) => {
    e.preventDefault();
  
    let obj = this.state.review_add.form;

    await axios.post("http://127.0.0.1:5000/api/review", obj)
               .then(async res => {
                 console.log("Review created: \n");
                 console.log(res.data);
                 console.log(res.data._id);
                 console.log(res.data._id.$oid);
                 let id = res.data._id.$oid;
                 let formData = new FormData();
                 
                 for (let i = 0; i < this.state.review_add.images.length; i++) {
                   formData.append("images[]", this.state.review_add.images[i]);
                 }

                 return await axios.post(`http://127.0.0.1:5000/api/review/img-upload/${id}`, formData, {"Content-Type": "multipart/form-data"})
               })
               .then(res => {
                 console.log("Review images upload: \n");
                 console.log(res.data);
               }).catch(error => console.error(error));
  }

  deleteReview = async (e) => {
    e.preventDefault();

    let id = this.state.review_delete.id;

    await axios.delete(`http://127.0.0.1:5000/api/review/${id}`)
               .then(res => {
                 console.log(`Deleted ${id} successfully`);
                 console.log(res.data);
               }).catch(error => console.error(error));
  }

  newRestaurant = async (e) => {
    e.preventDefault()

    let obj = this.state.restaurant_new.form;
    // let numbers = obj.location.map(i => Float32Array(i));
    let numbers = obj.location.map(Number);
    obj.location = numbers;
    console.log(obj);

    await axios.post("http://127.0.0.1:5000/api/restaurant", obj)
               .then(async res => {
                 console.log(`New restaurant object created successfully`);
                 console.log(res.data);
                 let id = res.data._id.$oid;
                 let formData = new FormData();
                 
                //  console.log(this.state.restaurant_new.images.length)
                 for (let i = 0; i < this.state.restaurant_new.images.length; i++) {
                  formData.append("images[]", this.state.restaurant_new.images[i]);
                 }
                //  console.log(this.state.restaurant_new.menu.length)
                 for (let i = 0; i < this.state.restaurant_new.menu.length; i++) {
                  formData.append("menu[]", this.state.restaurant_new.menu[i]);
                 }

                 return await axios.post(`http://127.0.0.1:5000/api/restaurant/img-upload/${id}`, formData)
               })
               .then(res => {
                 console.log('New restaurant object image/menu uploaded successfully');
                 console.log(res.data);
               })
               .catch(error => console.error(error));
  }

  allRestaurants = async (e) => {
    await axios.get("http://127.0.0.1:5000/api/restaurant")
               .then(res => {
                 console.log("Retrieved all data \n");
                 console.log(res.data);
               }).catch(error => console.error(error));
  }

  aRestaurant = async (e) => {
    e.preventDefault();
    let id = this.state.a_restaurant.id;
    await axios.get(`http://127.0.0.1:5000/api/restaurant/${id}`)
               .then(res => {
                 console.log(`Retrieved ${id} data deeply successfully`);
                 console.log(res.data);
               }).catch(error =>  console.error(error));
  }

  updatedARestaurant = async (e) => {
    e.preventDefault();
    let id = this.state.restaurant_update.id;
    let query = this.state.restaurant_update.query;
    let formData = new FormData();
    
    console.log(this.state.restaurant_update.images.length)
    for (let i = 0; i < this.state.restaurant_update.images.length; i++) {
     formData.append("images[]", this.state.restaurant_update.images[i]);
    }
    console.log(this.state.restaurant_update.menu.length)
    for (let i = 0; i < this.state.restaurant_update.menu.length; i++) {
     formData.append("menu[]", this.state.restaurant_update.menu[i]);
    }

    await axios.put(`http://127.0.0.1:5000/api/restaurant/${id}${query}`, formData, {"Content-Type": "multipart/form-data"})
               .then(res => {
                 console.log("Updated restaurant sucessfully");
                 console.log(res.data);
               }).catch(error => console.error(error));
  }

  deleteRestaurant = async (e) => {
    e.preventDefault();
    let id = this.state.restaurant_delete.id;
    await axios.delete(`http://127.0.0.1:5000/api/restaurant/${id}`)
               .then(res => {
                 console.log(`Deleted restaurant ${id} successfully`);
                 console.log(res.data);
               }).catch(error => console.error(error));
  }

  handleClientID = async (e) => {
    e.preventDefault(); 
    this.setState({ client_add:  { ...this.state.client_add, id: e.target.value } } )
  }

  handleClientFname = async (e) => {
    e.preventDefault(); 
    this.setState({ client_add:  { ...this.state.client_add, fname: e.target.value } } )
  }

  handleClientLname = async (e) => {
    e.preventDefault(); 
    this.setState({ client_add:  { ...this.state.client_add, lname: e.target.value } } )
  }

  handleClientEmail = async (e) => {
    e.preventDefault(); 
    this.setState({ client_add:  { ...this.state.client_add, email: e.target.value } } )
  }

  handleClientImageID = async (e) => {
    e.preventDefault(); 
    this.setState({ client_image: { ...this.state.client_image, form: { id: e.target.value } } })
  }

  handleClientImageFile = async (e) => {
    e.preventDefault(); 
    this.setState({ client_image: { ...this.state.client_image, file: e.target.files[0] } })
  }

  handleClientDelete = async (e) => {
    e.preventDefault(); 
    this.setState({ client_delete: { id: e.target.value } } )
  }

  handleReviewAddUser = async (e) => {
    e.preventDefault(); 
    this.setState({ review_add: { ...this.state.review_add, form: { ...this.state.review_add.form, user: e.target.value } } })
  }

  handleReviewAddRestaurant = async (e) => {
    e.preventDefault(); 
    this.setState({ review_add: { ...this.state.review_add, form: { ...this.state.review_add.form, restaurant: e.target.value } } })
  }

  handleReviewAddRating = async (e) => {
    e.preventDefault(); 
    this.setState({ review_add: { ...this.state.review_add, form: { ...this.state.review_add.form, ating: e.target.value } } })
  }

  handleReviewAddDate = async (e) => {
    e.preventDefault(); 
    this.setState({ review_add: { ...this.state.review_add, form: { ...this.state.review_add.form, date: e.target.value } } })
  }

  handleReviewAddContent = async (e) => {
    e.preventDefault(); 
    this.setState({ review_add: { ...this.state.review_add, form: { ...this.state.review_add.form, content: e.target.value } } })
  }

  handleReviewAddImages = async (e) => {
    e.preventDefault(); 
    let images = this.state.review_add.images;

    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
    }

    this.setState({ review_add: { ...this.state.review_add, images: images } } )
  }

  handleReviewDelete = async (e) => {
    e.preventDefault(); 
    this.setState({ review_delete: { id: e.target.value } } )
  }

  handleNewRestaurantSundayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours, sunday: { ...this.state.restaurant_new.form.hours.sunday, from: e.target. value } } } } })
  }

  handleNewRestaurantSundayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours, sunday: { ...this.state.restaurant_new.form.hours.sunday, to: e.target. value } } } } })
  }

  handleNewRestaurantMondayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours, monday: { ...this.state.restaurant_new.form.hours.monday, from: e.target. value } } } } })
  }

  handleNewRestaurantMondayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours, monday: { ...this.state.restaurant_new.form.hours.monday, to: e.target. value } } } } })
  }

  handleNewRestaurantTuesdayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours, tuesday: { ...this.state.restaurant_new.form.hours.tuesday, from: e.target. value } } } } })
  }

  handleNewRestaurantTuesdayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours, tuesday: { ...this.state.restaurant_new.form.hours.tuesday, to: e.target. value } } } } })
  }

  handleNewRestaurantWednesdayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours, wednesday: { ...this.state.restaurant_new.form.hours.wednesday, from: e.target. value } } } } })
  }

  handleNewRestaurantWednesdayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours, wednesday: { ...this.state.restaurant_new.form.hours.wednesday, to: e.target. value } } } } })
  }

  handleNewRestaurantThursdayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours, thursday: { ...this.state.restaurant_new.form.hours.thursday, from: e.target. value } } } } })
  }

  handleNewRestaurantThursdayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours, thursday: { ...this.state.restaurant_new.form.hours.thursday, to: e.target. value } } } } })
  }

  handleNewRestaurantFridayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours, friday: { ...this.state.restaurant_new.form.hours.friday, from: e.target. value } } } } })
  }

  handleNewRestaurantFridayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours,friday: { ...this.state.restaurant_new.form.hours.friday, to: e.target. value } } } } })
  }

  handleNewRestaurantSaturdayFrom = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours, saturday: { ...this.state.restaurant_new.form.hours.saturday, from: e.target. value } } } } })
  }

  handleNewRestaurantSaturdayTo = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, hours: { ...this.state.restaurant_new.form.hours, saturday: { ...this.state.restaurant_new.form.hours.saturday, to: e.target. value } } } } })
  }

  handleNewRestaurantDetailsParking = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, details: { ...this.state.restaurant_new.form.details, parking: e.target.value } } } })
  }

  handleNewRestaurantDetailsReservation = async (e) => {
    e.preventDefault(); 
    let newval = true;
    if (e.target.value == "false") { newval = false };
    if (e.target.value == "true" ) { newval = true };

    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, details: { ...this.state.restaurant_new.form.details, parking: newval } } } })
  }

  handleNewRestaurantDetailsPetsAllowed = async (e) => {
    e.preventDefault(); 
    let newval = true;
    if (e.target.value == "false") { newval = false };
    if (e.target.value == "true" ) { newval = true };

    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, details: { ...this.state.restaurant_new.form.details, petsAllowed: newval } } } })
  }

  handleNewRestaurantDetailsTakeout = async (e) => {
    e.preventDefault(); 
    let newval = true;
    if (e.target.value == "false") { newval = false };
    if (e.target.value == "true" ) { newval = true };

    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, details: { ...this.state.restaurant_new.form.details, takeout: newval } } } })
  }

  handleNewRestaurantDetailsWifi = async (e) => {
    e.preventDefault(); 
    let newval = true;
    if (e.target.value == "false") { newval = false };
    if (e.target.value == "true" ) { newval = true };

    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, details: { ...this.state.restaurant_new.form.details, wifi: newval } } } })
  }

  handleNewRestaurantDetailsWaitTime = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, details: { ...this.state.restaurant_new.form.details,waitTime: e.target.value } } } })
  }

  handleNewRestaurantName = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, restaurantName: e.target.value } } })
  }

  handleNewRestaurantTags = async (e) => {
    e.preventDefault();
    this.setState({ ...this.state, temporary: e.target.value })
  }

  addTag = (e) => {
    e.preventDefault();
    let tags = this.state.restaurant_new.form.restaurantTags;
    tags.push(this.state.temporary);
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, restaurantTags: tags } } });
    this.setState({ ...this.state, temporary: "" })
  }

  handleNewRestaurantDescription = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, description: e.target.value } } })
  }

  handleNewRestaurantDateOpen = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, dateOpen: e.target.value } } })
  }

  handleNewRestaurantOwnerID = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, ownerid: e.target.value } } })
  }

  handleNewRestaurantAddress = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, address: e.target.value } } })
  }

  handleNewRestaurantCity = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, city: e.target.value } } })
  }

  handleNewRestaurantZipcode = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, zipcode: e.target.value } } })
  }

  handleNewRestaurantState = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, state: e.target.value } } })
  }

  handleNewRestaurantLocationX = async (e) => {
    e.preventDefault(); 
    let location = this.state.restaurant_new.form.location;
    location[0] =  e.target.value;
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, location: location } } })
  }

  handleNewRestaurantLocationY = async (e) => {
    e.preventDefault(); 
    let location = this.state.restaurant_new.form.location;
    location[1] =  e.target.value;
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, location: location } } })
  }

  handleNewRestaurantWebsite = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_new: { ...this.state.restaurant_new, form: { ...this.state.restaurant_new.form, website: e.target.value } } })
  }

  handleNewRestaurantImages = async (e) => {
    e.preventDefault(); 
    let images = this.state.restaurant_new.images;
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
    }
    console.log(this.state.restaurant_new.images.length);

    this.setState({ restaurant_new: { ...this.state.restaurant_new, images: images } } )
  }

  handleNewRestaurantMenu = async (e) => {
    e.preventDefault(); 
    let menu = this.state.restaurant_new.menu;
    for (let i = 0; i < e.target.files.length; i++) {
      menu.push(e.target.files[i]);
    }
    console.log(this.state.restaurant_new.menu.length);

    this.setState({ restaurant_new: { ...this.state.restaurant_new, menu: menu } } )
  }

  handleARestaurant = async (e) => {
    e.preventDefault(); 
    this.setState({ a_restaurant: { id: e.target.value } } );
  }

  handleRestaurantUpdateID = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_update: { ...this.state.restaurant_update, id: e.target.value  } })
  }

  handleRestaurantUpdateQuery = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_update: { ...this.state.restaurant_update, query: e.target.value  } })
  }

  handleURestaurantUpdateImages = async (e) => {
    e.preventDefault(); 
    let images = this.state.restaurant_update.images;
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i])
    }

    this.setState({ restaurant_update: { ...this.state.restaurant_update, images: images } } )
  }

  handleUpdateRestaurantMenu = async (e) => {
    e.preventDefault(); 
    let menu = this.state.restaurant_update.menu;
    for (let i = 0; i < e.target.files.length; i++) {
      menu.push(e.target.files[i])
    }

    this.setState({ restaurant_update: { ...this.state.restaurant_update, menu: menu } } )
  }

  handleRestaurantDelete = async (e) => {
    e.preventDefault(); 
    this.setState({ restaurant_delete: { id: e.target.value } } )
  }

  printState = e => {
    console.log(this.state);
  }

  handleFieldChange = e => {
    this.setState({ fieldValue: e.target.value })
  }

  render() {
    return (
      <div className="error-page-container">
        <h1>404 NOT FOUND</h1>
        <p>This page does not exist.</p>
        <p>Are you lost sweet summer child?</p>
        <Rating input setRating={this.setRating} />
        <FormInput
          label="test"
          value={this.state.fieldValue}
          handleChange={this.handleFieldChange}
        />
        <CustomButton icon={<FavoriteIcon />} margin minimal>
          submit
        </CustomButton>

        <CustomButton icon={<FavoriteIcon />}>submit</CustomButton>
          <br />
        <button onClick={this.printState}>VIEW STATE</button>
          <br />
        <h2>Add a Patron</h2>
        <form onSubmit={this.addPatron}>
          <label>ID: 
            <input type="text" onChange={this.handleClientID} value={this.state.client_add.id}></input>
          </label>
          <br />
          <label>
            First Name:
            <input type="text" onChange={this.handleClientFname} value={this.state.client_add.fname}></input>
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" onChange={this.handleClientLname} value={this.state.client_add.lname}></input>
          </label>
          <br />
          <label>
            Email:
            <input type="text" onChange={this.handleClientEmail} value={this.state.client_add.email}></input>
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
          <br />
        <h2>Add an Owner</h2>
        <form onSubmit={this.addOwner}>
          <label>ID: 
            <input type="text" onChange={this.handleClientID} value={this.state.client_add.id}></input>
          </label>
          <br />
          <label>
            First Name:
            <input type="text" onChange={this.handleClientFname} value={this.state.client_add.fname}></input>
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" onChange={this.handleClientLname} value={this.state.client_add.lname}></input>
          </label>
          <br />
          <label>
            Email:
            <input type="text" onChange={this.handleClientEmail} value={this.state.client_add.email}></input>
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
          <br />
        <h2>Upload Client Image</h2>
          <br />
        <form onSubmit={this.uploadClientImage}>
          <label>ID:
            <input type="text" onChange={this.handleClientImageID} value={this.state.client_image.form.id}></input>
          </label>
          <br />
          <label>
            <input type="file" accept="image/jpeg, image/png" onChange={this.handleClientImageFile}></input>
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
          <br />
        <h2>Delete a Client</h2>
          <br />
        <form onSubmit={this.deleteClient}>
          <label>ID:
            <input type="text" onChange={this.handleClientDelete} value={this.state.client_delete.id}></input>
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
          <br />
        <h2>Add a review</h2>
          <br />
        <form onSubmit={this.addReview}>
          <label>User:
            <input type="text" onChange={this.handleReviewAddUser} value={this.state.review_add.form.user}></input>
          </label>
          <br />
          <label>Restaurant:
            <input type="text" onChange={this.handleReviewAddRestaurant} value={this.state.review_add.form.restaurant}></input>
          </label>
          <br />
          <label>Rating:
            <input type="text" onChange={this.handleReviewAddRating} value={this.state.review_add.form.rating}></input>
          </label>
          <br />
          <label>Date:
            <input type="text" onChange={this.handleReviewAddDate} value={this.state.review_add.form.date}></input>
          </label>
          <br />
          <label>Content:
            <input type="text" onChange={this.handleReviewAddContent} value={this.state.review_add.form.content}></input>
          </label>
          <br />
          <label>Images:
            <input type="file" accept="image/jpeg, image/png" multiple onChange={this.handleReviewAddImages}></input>
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
          <br />
        <h2>Delete a review</h2>
          <br />
        <form onSubmit={this.deleteReview}>
          <label>ID:
            <input type="text" onChange={this.handleReviewDelete} value={this.state.review_delete.id}></input>
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
          <br />
        <h2>New restaurant</h2>
          <br />
        <form onSubmit={this.newRestaurant}>
          <label>Sunday From:
            <input type="text" onChange={this.handleNewRestaurantSundayFrom} value={this.state.restaurant_new.form.hours.sunday.from}></input>
          </label>
          <br />
          <label>Sunday To:
            <input type="text" onChange={this.handleNewRestaurantSundayTo} value={this.state.restaurant_new.form.hours.sunday.to}></input>
          </label>
          <br />
          <label>Monday From:
            <input type="text" onChange={this.handleNewRestaurantMondayFrom} value={this.state.restaurant_new.form.hours.monday.from}></input>
          </label>
          <br />
          <label>Monday To:
            <input type="text" onChange={this.handleNewRestaurantMondayTo} value={this.state.restaurant_new.form.hours.monday.to}></input>
          </label>
          <br />
          <label>Tuesday From:
            <input type="text" onChange={this.handleNewRestaurantTuesdayFrom} value={this.state.restaurant_new.form.hours.tuesday.from}></input>
          </label>
          <br />
          <label>Tuesday To:
            <input type="text" onChange={this.handleNewRestaurantTuesdayTo} value={this.state.restaurant_new.form.hours.tuesday.to}></input>
          </label>
          <br />
          <label>Wednesday From:
            <input type="text" onChange={this.handleNewRestaurantWednesdayFrom} value={this.state.restaurant_new.form.hours.wednesday.from}></input>
          </label>
          <br />
          <label>Wednesday To:
            <input type="text" onChange={this.handleNewRestaurantWednesdayTo} value={this.state.restaurant_new.form.hours.wednesday.to}></input>
          </label>
          <br />
          <label>Thursday From:
            <input type="text" onChange={this.handleNewRestaurantThursdayFrom} value={this.state.restaurant_new.form.hours.thursday.from}></input>
          </label>
          <br />
          <label>Thursday To:
            <input type="text" onChange={this.handleNewRestaurantThursdayTo} value={this.state.restaurant_new.form.hours.thursday.to}></input>
          </label>
          <br />
          <label>Friday From:
            <input type="text" onChange={this.handleNewRestaurantFridayFrom} value={this.state.restaurant_new.form.hours.friday.from}></input>
          </label>
          <br />
          <label>Friday To:
            <input type="text" onChange={this.handleNewRestaurantFridayTo} value={this.state.restaurant_new.form.hours.friday.to}></input>
          </label>
          <br />
          <label>Saturday From:
            <input type="text" onChange={this.handleNewRestaurantSaturdayFrom} value={this.state.restaurant_new.form.hours.saturday.from}></input>
          </label>
          <br />
          <label>Saturday To:
            <input type="text" onChange={this.handleNewRestaurantSaturdayTo} value={this.state.restaurant_new.form.hours.saturday.to}></input>
          </label>
          <br />
          <label>Parking:
            <input type="text" onChange={this.handleNewRestaurantDetailsParking} value={this.state.restaurant_new.form.details.parking}></input>
          </label>
          <br />
          <label>Reservation
            <input type="text" onChange={this.handleNewRestaurantDetailsReservation} value={this.state.restaurant_new.form.details.reservation}></input>
          </label>
          <br />
          <label>Pets Allowed:
            <input type="text" onChange={this.handleNewRestaurantDetailsPetsAllowed} value={this.state.restaurant_new.form.details.petsAllowed}></input>
          </label>
          <br />
          <label>Take Out:
            <input type="text" onChange={this.handleNewRestaurantDetailsTakeout} value={this.state.restaurant_new.form.details.takeout}></input>
          </label>
          <br />
          <label>Wifi:
            <input type="text" onChange={this.handleNewRestaurantDetailsWifi} value={this.state.restaurant_new.form.details.wifi}></input>
          </label>
          <br />
          <label>Wait Time:
            <input type="text" onChange={this.handleNewRestaurantDetailsWaitTime} value={this.state.restaurant_new.form.details.waitTime}></input>
          </label>
          <br />
          <label>Restaurant Name:
            <input type="text" onChange={this.handleNewRestaurantName} value={this.state.restaurant_new.form.restaurantName}></input>
          </label>
          <br />
          <label>Restaurant Tags:
            <input type="text" onChange={this.handleNewRestaurantTags} value={this.state.temporary}></input>
          </label>
          <button type="button" onClick={this.addTag}>ADD TAG</button>
          <br />
          <label>Description:
            <input type="text" onChange={this.handleNewRestaurantDescription} value={this.state.restaurant_new.form.description}></input>
          </label>
          <br />
          <label>Date Open:
            <input type="text" onChange={this.handleNewRestaurantDateOpen} value={this.state.restaurant_new.form.dateOpen}></input>
          </label>
          <br />
          <label>Owner ID:
            <input type="text" onChange={this.handleNewRestaurantOwnerID} value={this.state.restaurant_new.form.ownerid}></input>
          </label>
          <br />
          <label>Address:
            <input type="text" onChange={this.handleNewRestaurantAddress} value={this.state.restaurant_new.form.address}></input>
          </label>
          <br />
          <label>City:
            <input type="text" onChange={this.handleNewRestaurantCity} value={this.state.restaurant_new.form.city}></input>
          </label>
          <br />
          <label>Zipcode:
            <input type="text" onChange={this.handleNewRestaurantZipcode} value={this.state.restaurant_new.form.zipcode}></input>
          </label>
          <br />
          <label>State:
            <input type="text" onChange={this.handleNewRestaurantState} value={this.state.restaurant_new.form.state}></input>
          </label>
          <br />
          <label>LocationX:
            <input type="text" onChange={this.handleNewRestaurantLocationX} value={this.state.restaurant_new.form.location[0]}></input>
          </label>
          <br />
          <label>LocationY:
            <input type="text" onChange={this.handleNewRestaurantLocationY} value={this.state.restaurant_new.form.location[1]}></input>
          </label>
          <br />
          <label>Website Url:
            <input type="text" onChange={this.handleNewRestaurantWebsite} value={this.state.restaurant_new.form.website}></input>
          </label>
          <br />
          <label>Menu Images:
            <input type="file" accept="image/jpeg, image/png" multiple onChange={this.handleNewRestaurantImages}></input>
          </label>
          <br />
          <label>Images:
            <input type="file" accept="image/jpeg, image/png" multiple onChange={this.handleNewRestaurantMenu}></input>
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
          <br />
        <h2>Get all restaurants</h2>
        <button onClick={this.allRestaurants}> GET ALL RESTAURANTS </button>
          <br />
        <h2>Get a restaurant</h2>
          <br />
        <form onSubmit={this.aRestaurant}>
          <label>ID:
            <input type="text" onChange={this.handleARestaurant} value={this.state.a_restaurant.id}></input>
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
          <br />
        <h2>Update a restaurant</h2>
          <br />
        <form onSubmit={this.updatedARestaurant}>
          <label>ID:
            <input type="text" onChange={this.handleRestaurantUpdateID} value={this.state.restaurant_update.id}></input>
          </label>
          <br />
          <label>Query String:
            <input type="text" onChange={this.handleRestaurantUpdateQuery} value={this.state.restaurant_update.query}></input>
          </label>
          <br />
          <label>Menu Images:
            <input type="file" accept="image/jpeg, image/png" multiple onChange={this.handleURestaurantUpdateImages}></input>
          </label>
          <br />
          <label>Images:
            <input type="file" accept="image/jpeg, image/png" multiple onChange={this.handleUpdateRestaurantMenu}></input>
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
          <br />
        <h2>Delete a restaurant</h2>
          <br />
        <form onSubmit={this.deleteRestaurant}>
          <label>ID:
            <input type="text" onChange={this.handleRestaurantDelete} value={this.state.restaurant_delete.id}></input>
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
};

export default ErrorPage;
