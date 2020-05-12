// Importing React
import React, { Component } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../utils";

import { connect } from "react-redux";
import {
  setUserAuth,
  setCurrentUser,
  resetUserRedux,
  updateCurrentUser,
} from "../../redux/user/user.actions";

// Custom Style Sheet
import "./profile-page.styles.scss";

// Importing Other Components
import Divider from "../../components/divider/divider.component";
import Review from "../../components/review/review.component";
import Tag from "../../components/tag/tag.component";
import MapContainer from "../../components/map-container/map-container.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import CreateIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";
import FormInput from "../../components/form-input/form-input.component";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      reviewCount: "",
      tags: [],
      avatar: "",
      //   "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
      reviews: [],
    };
  }

  async componentDidMount() {
    // console.log("hellllo", this.props.userAuth);

    // Request to get patron reviews
    let res = await axios.get(`${BASE_API_URL}/user/getPatronReviews/${this.props.userAuth.uid}`);
    console.log("check meeee");
    // console.log(process.env);

    this.setState({ reviews: res.data.reviews });
    this.setState({ reviewCount: res.data.reviews.length });
    this.setState({ tags: this.props.currentUser.tags });
  }

  

  render() {
      const tags = this.state.tags.map((tag) => {
        return (
          <Tag key={tag}>{tag}</Tag>
        );
      });

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
                 {/* <Divider full={true} /> */}
                </li>
             );
        });

        return (
          <React.Fragment>
            <section className="profile-page-container">
              <form action="" method="put" id="manage-profile">
                <section className="userContainer">
                  <h1>{this.props.currentUser.fname} {this.props.currentUser.lname}</h1>
                  <CustomButton type="button" icon={<CreateIcon />} className="profile-button">
                    Edit My Profile
                  </CustomButton>
                  <h2 id="toggle-mini">{this.props.currentUser.email}</h2>
                  <div className="userContainer-inner">
                    {/* <fieldset form="manage-profile1" classname=""> */}
                      <div id="col1">
                        <img
                          className="profile-img"
                          src={`${BASE_API_URL}/img-get?url=${this.props.currentUser.avatar}`}
                          alt="user"
                        />
                        <h3 id="toggle-mini">Favorites
                        <CustomButton type="button" icon={<CreateIcon />} className="mini-icon"></CustomButton></h3>
                        <ul id="favorites">{tags}</ul>
                      </div>
                      <div id="col2">
                        <h3>About Me</h3> 
                        <FormInput
                          type="textarea"
                          htmlFor="about"
                          label="about"
                          value={this.props.currentUser.about}
                          // handleChange={(e) => {
                          //   setProfile({
                          //     ...this.props.currentUser,
                          //     about: e.target.value,
                          //   });
                          // }}
                          maxLength="250"
                          additionalInfo="(max: 250 characters)"
                          // disabled={editInput !== "description"}
                        />
                        {/* <p>
                          {this.props.currentUser.about}
                        </p> */}
                        <h3>Favorite Restaurant</h3>
                        <div id="checkIn">
                          <MapContainer 
                            longitude={33.6714426}
                            latitude={-117.7910193}
                          />
                        </div>
                      </div>
                    {/* </fieldset> */}
                  </div>
                  <CustomButton type="button" icon={<DoneIcon />} className="profile-save-button" id="hidden">
                    Save Changes
                  </CustomButton>
                </section>
              </form>
              <section className="userReviews">
                <h2>{this.props.currentUser.fname} {this.props.currentUser.lname}'s Reviews</h2>
                <h3>Total Reviews: {this.state.reviewCount}</h3>
                <ul>{reviews}</ul>
              </section>
            </section>
          </React.Fragment>
        );
  }
}

// export default ProfilePage;

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  setCurrentUser: (userId) => dispatch(setCurrentUser(userId)),
  resetUserRedux: () => dispatch(resetUserRedux()),
  updateCurrentUser: (userID) => dispatch(updateCurrentUser(userID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
