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
import Tag from "../../components/tag/tag-v2.component";
import MapContainer from "../../components/map-container/map-container.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import AddTagInput from "../../components/add-tag-input/add-tag-input.component";
import CreateIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";

class ProfilePage extends Component {
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
    // Request to get patron reviews
    let res = await axios.get(`${BASE_API_URL}/user/getPatronReviews/${this.props.userAuth.uid}`);
    // console.log(process.env);

    // Copying Redux into the state to allow editing
    this.setState({ fname: this.props.currentUser.fname });
    this.setState({ lname: this.props.currentUser.lname });
    this.setState({ tags: this.props.currentUser.tags});
    this.setState({ about: this.props.currentUser.about });
    
    this.setState({ reviews: res.data.reviews });
    this.setState({ reviewCount: res.data.reviews.length });

  }

  handleUpdate = async (e) => {
    let updatePatron = {
      fname: this.state.fname,
      lname: this.state.lname,
      about: this.state.about,
      tags: this.state.tags,
    }

    let res = await axios.post(`${BASE_API_URL}/user/modify_patron/${this.props.userAuth.uid}`, updatePatron);

    this.props.updateCurrentUser(this.props.userAuth.uid);
  }

  render() {
      const tags = this.state.tags.map((tag, index) => {
        return <Tag key={`${tag} ${index}`} value={tag}></Tag>;
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

        return this.state.edit? (
          <React.Fragment>
          <section className="profile-page-container">
            <form action="" method="put" id="manage-profile">
              <section className="userContainer">
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
                      this.setState({ fname: e.target.value} );
                      }}
                    // disabled={editInput !== "name"}
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
                      this.setState({ lname: e.target.value}); 
                      }}
                    // disabled={editInput !== "name"}
                    />
                </label>
                {/* <h1>{this.props.currentUser.fname} {this.props.currentUser.lname}</h1> */}
                <h2 id="toggle-mini">{this.props.currentUser.email}</h2>
                <Divider full={true} />
                <div className="userContainer-inner">
                  {/* <fieldset form="manage-profile1" classname=""> */}
                    <div id="col1">
                      <img
                        className="profile-img"
                        src={`${BASE_API_URL}/img-get?url=${this.props.currentUser.avatar}`}
                        alt="user"
                      />
                      <h3 id="toggle-mini">Favorites</h3>
                      <AddTagInput
                        // disabled
                        tagValues={this.state.tags}
                        handleAnyChange={(value)=>{this.setState({tags: value})}}
                      ></AddTagInput>
                    </div>
                    <div id="col2">
                      <h3>About Me</h3> 
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
                        // disabled={editInput !== "description"}
                      />
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
                <CustomButton 
                  type="button" 
                  icon={<DoneIcon />} 
                  className="profile-save-button" 
                  onClick={(e) => {
                    console.log(this.state); 
                    this.handleUpdate();
                    this.setState({ edit: false}); 
                    }}>
                  Save Changes
                </CustomButton>
              </section>
            </form>
            <Divider full={true} />
            <section className="userReviews">
              <h2>{this.props.currentUser.fname} {this.props.currentUser.lname}'s Reviews</h2>
              <h3>Total Reviews: {this.state.reviewCount}</h3>
              <ul>{reviews}</ul>
            </section>
          </section>
        </React.Fragment>
        ) : (
          <React.Fragment>
            <section className="profile-page-container">
                <section className="userContainer">
                  <h1>{this.props.currentUser.fname} {this.props.currentUser.lname}</h1>
                  <CustomButton 
                    type="button" 
                    icon={<CreateIcon />} 
                    className="profile-button"
                    onClick={(e) => { this.setState({ edit: true}); } }>
                    Edit My Profile
                  </CustomButton>
                  <h2 id="toggle-mini">{this.props.currentUser.email}</h2>
                  <Divider full={true} />
                  <div className="userContainer-inner">
                      <div id="col1">
                        <img
                          className="profile-img"
                          src={`${BASE_API_URL}/img-get?url=${this.props.currentUser.avatar}`}
                          alt="user"
                        />
                        <h3 id="toggle-mini">Favorites</h3>
                        <ul id="favorites">{tags}</ul>
                      </div>
                      <div id="col2">
                        <h3>About Me</h3>
                        <p>
                          {this.props.currentUser.about}
                        </p>
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
                </section>
              <Divider full={true} />
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

// const saveEdit = (input) => {
//   console.log(`SAVING ${input}`);
//   setEditInput("");
// }

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
