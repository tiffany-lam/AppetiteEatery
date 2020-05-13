/*
  Contributors: Veronica Sumariyanto 013229149
  Course: CECS 470

  Description: This class component renders a profile page for patron users. 
  Patrons can see their name, email, reviews, and other related profile information. 
  The page also allows patrons to edit their information (name, about me, tags) and 
  it will display the new data once they are finished editing.
*/


// Importing React
import React, { Component } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../utils";

// Importing Redux 
import { connect } from "react-redux";
import {
  setUserAuth,
  setCurrentUser,
  resetUserRedux,
  updateCurrentUser,
} from "../../redux/user/user.actions";

// Importing Custom Style Sheet
import "./profile-page.styles.scss";

// Importing Other Components
import Divider from "../../components/divider/divider.component";
import Review from "../../components/review/review.component";
import Tag from "../../components/tag/tag-v2.component";
import MapContainer from "../../components/map-container/map-container.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import AddTagInput from "../../components/add-tag-input/add-tag-input.component";
import CreateIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";

class ProfilePage extends Component {
  // Sets up the props that will be used to hold the patron's information.
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      tags: [],
      about: "",
      email: "",
      reviewCount: "",
      avatar: "",
      reviews: [],
      edit: false,
    };
  }

  async componentDidMount() {
    // Request to get patron reviews.
    let res = await axios.get(
      `${BASE_API_URL}/user/getPatronReviews/${this.props.userAuth.uid}`
    );

    // Copying Redux into the state to allow editing patron information.
    this.setState({ fname: this.props.currentUser.fname });
    this.setState({ lname: this.props.currentUser.lname });
    this.setState({ tags: this.props.currentUser.tags });
    this.setState({ about: this.props.currentUser.about });

    this.setState({ reviews: res.data.reviews });
    this.setState({ reviewCount: res.data.reviews.length });
  }

  // Handles any changes that the user makes to edit their information with an axios.post
  handleUpdate = async (e) => {
    let updatePatron = {
      fname: this.state.fname,
      lname: this.state.lname,
      about: this.state.about,
      tags: this.state.tags,
    };

    let res = await axios.post(
      `${BASE_API_URL}/user/modify_patron/${this.props.userAuth.uid}`,
      updatePatron
    );

    this.props.updateCurrentUser(this.props.userAuth.uid);
  };

  render() {
    // This variable displays the tags using the Tag-v2 component.
    const tags = this.state.tags.map((tag, index) => {
      return <Tag key={`${tag} ${index}`} value={tag}></Tag>;
    });

    // This variable uses the ReviewComponent to display all the patron's reviews.
    const reviews = this.state.reviews.map((review, index) => {
      return (
        <li key={index}>
          <Review
            user={this.props.currentUser.fname}
            restaurant={review.restaurant}
            avatar={this.props.currentUser.avatar}
            date={review.date}
            content={review.content}
            images={review.images}
            rating={review.rating}
          ></Review>
        </li>
      );
    });

    // This renders the page either in an editing state with forms or a viewing state.
    return this.state.edit ? (
      // This renders the page when the patron is going to edit their information.
      <React.Fragment>
        <section className="profile-page-container">
        {/* This sets up the form for editing profile information. */}
          <form action="" method="put" id="manage-profile">
            <section className="userContainer">
            {/* This is the form to edit a patron's first and last name. */}
              <div className="profileName">
                <label htmlFor="patronfname">
                  <span>First Name</span>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    required
                    className="name"
                    value={this.state.fname}
                    onChange={(e) => {
                      this.setState({ fname: e.target.value });
                    }}
                  />
                </label>
                <label htmlfo="patronlname">
                  <span>Last Name</span>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    required
                    className="name"
                    value={this.state.lname}
                    onChange={(e) => {
                      this.setState({ lname: e.target.value });
                    }}
                  />
                </label>
              </div>
              <h2>{this.props.currentUser.email}</h2>
              <Divider full={true} />
              {/* // This sets up the top portion of the profile page. */}
              <div className="userContainer-inner">
                {/* // A div that styles the left column of the top portion of the profile page. */}
                <div id="flex-container1">
                  <img
                    className="profile-img"
                    src={`${BASE_API_URL}/img-get?url=${this.props.currentUser.avatar}`}
                    alt="user"
                  />
                  <h3 id="toggle-mini">Favorites</h3>
                  {/* // Using the AddTagInput component to add/remove favorite tags. */}
                  <AddTagInput
                    tagValues={this.state.tags}
                    handleAnyChange={(value) => {
                      this.setState({ tags: value });
                    }}
                  ></AddTagInput>
                </div>
                {/* // A div that styles the right column of the top portion of the profile page. */}
                <div id="flex-container2">
                  {/* // Using the FormInput component to edit the about me section. */}
                  <FormInput
                    type="textarea"
                    htmlFor="about"
                    label="about me"
                    value={this.state.about}
                    handleChange={(e) => {
                      this.setState({ about: e.target.value });
                    }}
                    maxLength="250"
                    additionalInfo="(max: 250 characters)"
                  />
                  <h3>Favorite Restaurant</h3>
                  {/* // A div that styles the MapContainer component to fit properly in the userContainer. */}
                  <div id="checkIn">
                    <MapContainer
                      longitude={33.6714426}
                      latitude={-117.7910193}
                    />
                  </div>
                </div>
              </div>
              {/* // The CustomButton component that saves all new information after editing. */}
              <CustomButton
                type="button"
                icon={<DoneIcon />}
                className="profile-save-button"
                onClick={(e) => {
                  console.log(this.state);
                  this.handleUpdate();
                  this.setState({ edit: false });
                }}
              >
                Save Changes
              </CustomButton>
            </section>
          </form>
          <Divider full={true} />
          {/* // The section that sets up the reviews at the bottom of the page. */}
          <section className="userReviews">
            <h2>
              {this.props.currentUser.fname} {this.props.currentUser.lname}'s
              Reviews
            </h2>
            <h3>Total Reviews: {this.state.reviewCount}</h3>
            <ul>{reviews}</ul>
          </section>
        </section>
      </React.Fragment>
    ) : (
      <React.Fragment>
      {/* // This is the default view that allows the patron to view their profile. */}
        <section className="profile-page-container">
          <section className="userContainer">
            <h1>
              {this.props.currentUser.fname} {this.props.currentUser.lname}
            </h1>
            {/* // Using the CustomButton component that changes the viewing state to an editing state. */}
            <CustomButton
              type="button"
              icon={<CreateIcon />}
              className="profile-button"
              onClick={(e) => {
                this.setState({ edit: true });
              }}
            >
              Edit My Profile
            </CustomButton>
            <h2 id="toggle-mini">{this.props.currentUser.email}</h2>
            <Divider full={true} />
            {/* // This sets up the top portion of the profile page. */}
            <div className="userContainer-inner">
            {/* // A div that styles the left column of the top portion of the profile page. */}
              <div id="flex-container1">
                <img
                  className="profile-img"
                  src={`${BASE_API_URL}/img-get?url=${this.props.currentUser.avatar}`}
                  alt="user"
                />
                <h3 id="toggle-mini">Favorites</h3>
                <ul id="favorites">{tags}</ul>
              </div>
              {/* // A div that styles the right column of the top portion of the profile page. */}
              <div id="flex-container2">
                <h3>About Me</h3>
                <p>{this.props.currentUser.about}</p>
                <h3>Favorite Restaurant</h3>
                {/* // Using the MapContainer component to display. */}
                <div id="checkIn">
                  <MapContainer
                    longitude={33.6714426}
                    latitude={-117.7910193}
                  />
                </div>
              </div>
            </div>
          </section>
          <Divider full={true} />
          {/* // A section that displays the reviews on the bottom of the page. */}
          <section className="userReviews">
            <h2>
              {this.props.currentUser.fname} {this.props.currentUser.lname}'s
              Reviews
            </h2>
            <h3>Total Reviews: {this.state.reviewCount}</h3>
            <ul>{reviews}</ul>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

// Redux method that maps the state to props.
const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  currentUser: user.currentUser,
});

// Redux method that maps dispatch to props.
const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  setCurrentUser: (userId) => dispatch(setCurrentUser(userId)),
  resetUserRedux: () => dispatch(resetUserRedux()),
  updateCurrentUser: (userID) => dispatch(updateCurrentUser(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
