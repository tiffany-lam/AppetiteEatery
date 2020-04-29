// Importing React
import React, { Component } from "react";

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
import MapContainer from "../../components/map-container/map-container.component";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Tom Dumpling",
      userName: "@wontom",
      location: "San Francisco, CA",
      joinDate: "1/27/2019",
      placesVisited: "54",
      reviewCount: "14",
      favorites: "#wontons, #tacos, #ice-cream, #fruit-smoothies, #matcha",
      profilePic:
        "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
      // map: "https://www.massive.pr/wp-content/uploads/2018/01/shutterstock_127728257-1038x576-tender-1024x568.jpg",
      // photo: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
      reviews: [
                {
                    user: {
                        username: "@wontom",
                        avatar: "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
                    },
                    date: "3/16/2020",
                    content:
                        "My favorite Wonton place in the whole wide world! Customer service is definitely top-notch whenever I visit. The pork dumplings are a MUST. You can have it as an appetizer or with some soup. They also accept Google Pay in case you forget your wallet!",
                    rating: 5,
                    images: [
                        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
                        "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                    ],
                },
                {
                    user: {
                        username: "@wontom",
                        avatar: "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
                    },
                    date: "9/21/2019",
                    content:
                        "Came here to fill my smoothie craving one day but left disappointed. Staff took forever to notice me walk in and take my order. I ordered a mango slush but saw that my cup was halfway full? I asked for a new drink but they told me I had to pay for a new one when it wasn't even my fault. The manager clearly needs to train their employees properly. Never coming here again.",
                    rating: 1,
                    images: [
                        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
                        "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                    ],
                },
                {
                    user: {
                        username: "@wontom",
                        avatar: "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
                    },
                    date: "8/14/2019",
                    content:
                        "I ordered three chicken tacos for carryout. Complimentary chips and salsa were a plus, but I received my food cold. Hopefully next time it won't be like that.",
                    rating: 3,
                    images: [
                        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
                        "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                    ],
                },
                {
                    user: {
                        username: "@wontom",
                        avatar: "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
                    },
                    date: "6/3/2019",
                    content:
                        "Visited this place with some coworkers and ordered the Waffle House Special. It consisted of strawberries, powdered sugar, melted marshmellows, and chocolate syrup drizzled on top. Absolutely delicious!",
                    rating: 5,
                    images: [
                        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
                        "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                    ],
                },
            ],
    };
  }

  componentDidMount() {
    console.log("hellllo", this.props.userAuth);
    // this.setState({ userName: this.props.userAuth.uid });
  }

  render() {
      const reviews = this.state.reviews.map((review) => {
             return (
               <li key={review.user.username}>
                 <Review
                   user={review.user.username}
                   avatar={review.user.avatar}
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
            <h1>
              {this.props.userAuth
                ? this.props.userAuth.uid.slice(0, 8)
                : this.state.name}
            </h1>
            <h2>
              {this.props.userAuth
                ? this.props.userAuth.email
                : this.state.name}
            </h2>
            <div className="userContainer-inner">
              <img
                className="profile-img"
                src={this.state.profilePic}
                alt="user"
              />
              <div className="userInfo">
                <ul className="userInfo">
                  <li>{this.state.location}</li>
                  <li>Member Since: {this.state.joinDate}</li>
                  <li>Places Visited: {this.state.placesVisited}</li>
                  <li>Reviews: {this.state.reviewCount}</li>
                </ul>
                <h3>About</h3>
                <p>
                  Tom Dumpling here. Programmer who loves wontons. Making the world a better
                  place one review at a time.
                </p>
              </div>
              <div id="favorites">
                <h3>Favorites</h3> {/* consider these as links in the future */}
                <p>{this.state.favorites}</p>
              </div>
              <div id="checkIn"> {/* This is where the checkin map should go */}
                <h3>Check-Ins</h3>
                <MapContainer />
              </div>
            </div>
          </section>
          <section className="userReviews">
            <h2>{this.state.name}'s Reviews</h2>
            <ul>{reviews}</ul>
            {/* <ul>
              <li>
                <section className="review">
                  <h2>Joe's</h2>
                  <h3>Date Posted: 3/16/2020</h3>
                  <h3>Review:</h3>
                  <p>
                    My favorite Wonton place in the whole wide world! Customer
                    service is definitely top-notch whenever I visit. The pork
                    dumplings are a MUST. You can have it as an appetizer or
                    with some soup. They also accept Google Pay in case you
                    forget your wallet!
                  </p>
                </section>
              </li>
              <li>
                <section className="review">
                  <h2>Prosperitis</h2>
                  <h3>Date Posted: 9/21/2019</h3>
                  <h3>Review:</h3>
                  <p>
                    Came here to fill my smoothie craving one day but left
                    disappointed. Staff took forever to notice me walk in and
                    take my order. I ordered a mango slush but saw that my cup
                    was halfway full? I asked for a new drink but they told me I
                    had to pay for a new one when it wasn't even my fault. The
                    manager clearly needs to train their employees properly.
                    Never coming here again.
                  </p>
                </section>
              </li>
              <li>
                <section className="review">
                  <h2>Engrave</h2>
                  <h3>Date Posted: 8/14/2019</h3>
                  <h3>Review:</h3>
                  <p>
                    I ordered three chicken tacos for carryout. Complimentary
                    chips and salsa were a plus, but I received my food cold.
                    Hopefully next time it won't be like that.
                  </p>
                </section>
              </li>
              <li>
                <section className="review">
                  <h2>Waffle House</h2>
                  <h3>Date Posted: 6/3/2019</h3>
                  <h3>Review:</h3>
                  <p>
                    Visited this place with some coworkers and ordered the
                    Waffle House Special. It consisted of strawberries, powdered
                    sugar, melted marshmellows, and chocolate syrup drizzled on
                    top. Absolutely delicious!
                  </p>
                </section>
              </li>
            </ul> */}
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
