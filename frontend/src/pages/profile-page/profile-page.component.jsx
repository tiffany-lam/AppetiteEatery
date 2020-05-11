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

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      fname: "",
      lname: "",
      email: "",
      type: "Restaurant Patron",
      reviewCount: "",
      tags: [
        "Wontons",
        "Tacos",
        "Ice-Cream",
        "Fruit-Smoothies", 
        "Matcha",
      ],
      avatar:
        "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
      reviews: [],
    };
  }

  async componentDidMount() {
    console.log("hellllo", this.props.userAuth);

    // Request to get patron reviews
    let res = await axios.get(`${BASE_API_URL}/user/getPatronReviews/${this.props.userAuth.uid}`);
    console.log("check meeee");
    // console.log(res);
    console.log(res.data);
    console.log("reviewws??", res.data.reviews.length);
    console.log(process.env);

    this.setState({ reviews: res.data.reviews });
    this.setState({ reviewCount: res.data.reviews.length });
  }

  // reveal() {
  //   document.getElementsById("hidden").style.display = "inline";
  // }

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
              <section className="userContainer">
                {/* <button type="button" onClick={(e) => {
                  // console.log(this.props.userAuth);
                  // console.log(this.props.currentUser);
                  console.log(this.state);
                }}>
                    test
                </button>*/}
                <h1>{this.props.currentUser.fname} {this.props.currentUser.lname}</h1>
                <CustomButton type="button" icon={<CreateIcon />} className="profile-button">
                  Edit My Info
                </CustomButton>
                <h2 id="toggle-mini">
                  {this.props.currentUser.email}
                 <CustomButton type="button" icon={<CreateIcon />} className="mini-icon"></CustomButton></h2>
                {/* <p id="accountType">{this.state.type}</p> */}
                <div className="userContainer-inner">
                    <div id="col1">
                      <img
                        className="profile-img"
                        src={this.state.avatar}
                        alt="user"
                      />
                      <h3 id="toggle-mini">Favorites:
                      <CustomButton type="button" icon={<CreateIcon />} className="mini-icon"></CustomButton></h3>
                      <ul id="favorites">{tags}</ul>
                    </div>
                    <div id="col2">
                      <h3>About Me</h3> 
                      <p>
                        Tom Dumpling here. Programmer who loves wontons. Making the world a better
                        place one review at a time.
                      </p>
                      <h3>Favorite Restaurant</h3>
                      <div id="checkIn">
                        <MapContainer 
                          longitude={33.7838279}
                          latitude={-118.1162791}/>
                      </div>
                    </div>
                  {/* <div className="favorites">
                    <h3>Favorites:</h3>
                    <p>{this.state.tags}</p>
                  </div> */}
                </div>
                <CustomButton type="button" icon={<DoneIcon />} className="profile-save-button" id="hidden">
                  Save Changes
                </CustomButton>
              </section>
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
