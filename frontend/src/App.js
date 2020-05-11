import React, { Component } from "react";
import firebaseAuth from "./components/auth/firebaseAuth";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "./utils";

import { connect } from "react-redux";
import {
  setUserAuth,
  setCurrentUser,
  resetUserRedux,
  updateCurrentUser,
} from "./redux/user/user.actions";
import "./App.scss";

// custom components here:
import Navbar from "./components/navbar/navbar.component";
import Modal from "./components/modal/modal.component";
// import Test from "./components/test/test.component";
// import RegisterModal from "./components/auth/RegisterForm";
import FooterNav from "./components/footer-nav/footer-nav.component";
import RegisterUserType from "./components/auth/register-user-type.component copy";

// page components here:
import HomePage from "./pages/home-page/home-page.component";
// import RestaurantPage from "./pages/restaurant-page/restaurant-page.component";
import RestaurantPage from "./pages/restaurant-page/restaurant-pagev2.component";
import ContactUsPage from "./pages/contact-us-page/contact-us.component";
import ErrorPage from "./pages/error-page/error-page.component";
import ProfilePage from "./pages/profile-page/profile-page.component";
import SearchResult from "./pages/searchResult-page/searchResult.component";
import ApplyPage from "./pages/apply-page/apply.component";
import OwnerRestaurantPage from "./pages/owner-restaurant-page/owner-restaurant-page.component";

class App extends Component {
  unsubscribedFromAuth = null;
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      validUser: false,
    };
  }
  //after component is done rendering the first time
  componentDidMount() {
    this.authListener();
  }

  isValidUser = async (userId) => {
    let res = await axios.get(`${BASE_API_URL}/user/exists/${userId}`);

    console.log("testing", userId, "results", res.data);

    // if user has not selected an account type:
    if (res.data === false) {
      this.setState({ validUser: false });
    } else {
      this.setState({ validUser: true });
    }
  };

  authListener() {
    this.unsubscribedFromAuth = firebaseAuth
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          this.isValidUser(user.uid);
          this.props.updateCurrentUser(user.uid);
          this.props.setUserAuth(user);
        } else {
          this.setState({ validUser: false });
          this.props.setUserAuth(null);
          this.props.resetUserRedux();
        }
      });
  }

  componentWillUnmount() {
    this.unsubscribedFromAuth();
  }

  render() {
    return (
      <div className="App" onClick={console.log(this.state)}>
        {this.props.userAuth && !this.state.validUser && (
          <Modal defaultShow backdrop>
            <RegisterUserType />
          </Modal>
        )}

        <BrowserRouter>
          <header>
            <Navbar />
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/search" component={SearchResult} />
              <Route path="/contact-us" component={ContactUsPage} />
              <Route
                exact
                path="/restaurant/:restaurantId"
                component={RestaurantPage}
              />

              {/* <Route path="/login" component={} /> */}
              {/* <Route path="/graduated" component={} /> */}

              {/* <Route path="/test" component={Test} /> */}

              {/* check to see if user is login, if not don't show */}
              {this.props.userAuth &&
              this.props.currentUser._cls === "Client.Owner" ? (
                <Route exact path="/apply" component={ApplyPage} />
              ) : null}

              {this.props.userAuth &&
              this.props.currentUser._cls === "Client.Owner" ? (
                <Route
                  exact
                  path="/my-restaurants"
                  component={OwnerRestaurantPage}
                />
              ) : null}

              {this.props.userAuth && (
                <Route exact path="/profile" component={ProfilePage} />
              )}

              {/* Temporary */}
              <Route to="/error-page" component={ErrorPage} />
              <Route to="*" component={ErrorPage} />
            </Switch>
          </main>
          <footer>
            <FooterNav />
          </footer>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  setCurrentUser: (userId) => dispatch(setCurrentUser(userId)),
  resetUserRedux: () => dispatch(resetUserRedux()),
  updateCurrentUser: (userID) => dispatch(updateCurrentUser(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
