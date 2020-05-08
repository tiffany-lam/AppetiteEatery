// Importing React
import React, { Component } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../utils";

import { connect } from "react-redux";
import {
  setUserAuth,
  setCurrentUser,
  resetUserRedux,
} from "../../redux/user/user.actions";


// Custom Style Sheet
import "./profile-page.styles.scss";

// Importing Other Components
import Divider from "../../components/divider/divider.component";
import Review from "../../components/review/review.component";
import Tag from "../../components/tag/tag.component";
import MapContainer from "../../components/map-container/map-container.component";
import CustomButton from "../../components/custom-button/custom-button.component"

import CreateIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      fname: null,
      lname: null,
      email: null,
      userName: "@wontom",
      type: "Restaurant Patron",
      placesVisited: "54",
      reviewCount: "4",
      tags: [
        "Wontons",
        "Tacos",
        "Ice-Cream",
        "Fruit-Smoothies", 
        "Matcha",
      ],
      profilePic:
        "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
      // map: "https://www.massive.pr/wp-content/uploads/2018/01/shutterstock_127728257-1038x576-tender-1024x568.jpg",
      // photo: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
      reviews: []
                // {
                //     user: {
                //         username: "@wontom",
                //         avatar: "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
                //     },
                //     date: "3/16/2020",
                //     content:
                //         "My favorite Wonton place in the whole wide world! Customer service is definitely top-notch whenever I visit. The pork dumplings are a MUST. You can have it as an appetizer or with some soup. They also accept Google Pay in case you forget your wallet!",
                //     rating: 5,
                //     images: [
                //         "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
                //         "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                //     ],
                // },
                // {
                //     user: {
                //         username: "@wontom",
                //         avatar: "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
                //     },
                //     date: "9/21/2019",
                //     content:
                //         "Came here to fill my smoothie craving one day but left disappointed. Staff took forever to notice me walk in and take my order. I ordered a mango slush but saw that my cup was halfway full? I asked for a new drink but they told me I had to pay for a new one when it wasn't even my fault. The manager clearly needs to train their employees properly. Never coming here again.",
                //     rating: 1,
                //     images: [
                //         "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
                //         "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                //     ],
                // },
                // {
                //     user: {
                //         username: "@wontom",
                //         avatar: "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
                //     },
                //     date: "8/14/2019",
                //     content:
                //         "I ordered three chicken tacos for carryout. Complimentary chips and salsa were a plus, but I received my food cold. Hopefully next time it won't be like that.",
                //     rating: 3,
                //     images: [
                //         "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
                //         "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                //     ],
                // },
                // {
                //     user: {
                //         username: "@wontom",
                //         avatar: "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
                //     },
                //     date: "6/3/2019",
                //     content:
                //         "Visited this place with some coworkers and ordered the Waffle House Special. It consisted of strawberries, powdered sugar, melted marshmellows, and chocolate syrup drizzled on top. Absolutely delicious!",
                //     rating: 5,
                //     images: [
                //         "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
                //         "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                //     ],
                // },
          
    };
  }

  componentDidMount() {
    console.log("hellllo", this.props.userAuth);
    
    const res = axios
      // .get(`${BASE_API_URL}/user/veronicasroute/${this.props.userAuth.uid}`)
      .get(`${BASE_API_URL}/user/${this.props.userAuth.uid}`)
      .then((res) => {
        console.log("clog v:", res.data.fname);
        console.log("hello");

        const fname = res.data.fname;
        const lname = res.data.lname;
        const email = res.data.email;

        this.setState({ fname });
        this.setState({ lname });
        this.setState({ email });

        const reviews = res.data.reviews;
        console.log("r"+reviews.content);
        this.setState({ reviews });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // fname = res.data.fname;
  // this.setState(this.state.fname);

  // test() {
  //   this.setState.fname(res.data.fname);
  // }
  // reveal() {
  //   document.getElementsById("hidden").style.display = "inline";
  // }

  render() {
      const tags = this.state.tags.map((tag) => {
        return (
          <Tag key={tag}>{tag}</Tag>
        );
      });

      

      const reviews = this.state.reviews.map((review) => {
             return (
               <li key={review}>
                 <Review
                   user={review.user}
                   restaurant={review.restaurant}
                   avatar={review.avatar}
                   date={"10/10/2020"}
                   content={review.content}
                   images={[
                     "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
                     "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                   ]}
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
                <h1> {/* this is where the fname and lname should be */}
                  {this.state.fname} {this.state.lname}
                </h1>
                <CustomButton type="button" icon={<CreateIcon />} className="profile-button">
                  Edit My Info
                </CustomButton>
                <h2 id="toggle-mini">
                  {this.state.email}
                 <CustomButton type="button" icon={<CreateIcon />} className="mini-icon"></CustomButton></h2>
                <p id="accountType">{this.state.type}</p>
                <div className="userContainer-inner">
                    <div id="col1">
                      <img
                        className="profile-img"
                        src={this.state.profilePic}
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
                      <h3>Check-Ins</h3>
                      <div id="checkIn"><MapContainer /></div>
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
                <h2>{this.state.fname} {this.state.lname}'s Reviews</h2>
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
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  setCurrentUser: (userId) => dispatch(setCurrentUser(userId)),
  resetUserRedux: () => dispatch(resetUserRedux()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
