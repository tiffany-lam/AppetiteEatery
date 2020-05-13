import React, { useEffect, useState } from "react";
import { auth } from "./components/auth/firebaseAuth";
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
import LoadingAnimation from "./components/loading-animation/loading-animation.component";
// import Test from "./components/test/test.component";
// import RegisterModal from "./components/auth/RegisterForm";
import FooterNav from "./components/footer-nav/footer-nav.component";
import RegisterUserType from "./components/auth/register-user-type.component copy";

// page components here:
import HomePage from "./pages/home-page/home-page.component";
// import RestaurantPage from "./pages/restaurant-page/restaurant-page.component";
import RestaurantPage from "./pages/restaurant-page/restaurant-page.component";
import ContactUsPage from "./pages/contact-us-page/contact-us.component";
import ErrorPage from "./pages/error-page/error-page.component";
import ProfilePage from "./pages/profile-page/profile-page.component";
import SearchResult from "./pages/searchResult-page/searchResult.component";
import ApplyPage from "./pages/apply-page/apply.component";
import OwnerRestaurantPage from "./pages/owner-restaurant-page/owner-restaurant-page.component";
import AboutUsPage from "./pages/about-us-page/about-us.component";
import GraduatedPage from "./pages/graduated-page/graduated-page.component";

const App = ({ currentUser, userAuth, ...props }) => {
  const [validUser, setValidUser] = useState(false);
  const [loading, setLoading] = useState(false);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     user: {},
  //     validUser: false,
  //   };
  // }
  //after component is done rendering the first time
  // componentDidMount() {
  //   this.authListener();
  // }

  const isValidUser = async (userId) => {
    let res = await axios.get(`${BASE_API_URL}/user/exists/${userId}`);

    console.log("testing", userId, "results", res.data);

    // if user has not selected an account type:
    if (res.data === false) {
      // this.setState({ validUser: false });
      setValidUser(false);
    } else if (res.data === true) {
      setValidUser(true);
    } else {
      console.error("checking valid user error", res);
    }
  };

  // const authListener = () => {
  //   this.unsubscribedFromAuth = firebaseAuth
  //     .auth()
  //     .onAuthStateChanged((user) => {
  //       if (user) {
  //         this.isValidUser(user.uid);
  //         this.props.updateCurrentUser(user.uid);
  //         this.props.setUserAuth(user);
  //       } else {
  //         this.setState({ validUser: false });
  //         this.props.setUserAuth(null);
  //         this.props.resetUserRedux();
  //       }
  //     });
  // };

  useEffect(() => {
    setLoading(true);
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        isValidUser(user.uid);
        props.updateCurrentUser(user.uid);
        props.setUserAuth(user);
      } else {
        setValidUser(false);
        props.setUserAuth(null);
        props.resetUserRedux();
      }
    });
    setLoading(false);

    return () => {
      unsubscribeFromAuth();
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    console.log("changing isValidUser");
    setLoading(true);
    if (userAuth) {
      isValidUser(userAuth.uid);
    }
    setLoading(false);
  }, [currentUser]);

  return (
    <div className="App">
      {userAuth && !validUser && (
        <Modal defaultShow backdrop>
          {loading ? (
            <LoadingAnimation text1="checking valid user" text2="hello" />
          ) : (
            <RegisterUserType />
          )}
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
            <Route path="/about-us" component={AboutUsPage} />
            <Route
              exact
              path="/restaurant/:restaurantId"
              component={RestaurantPage}
            />

            {/* <Route path="/login" component={} /> */}
            <Route path="/graduated" component={GraduatedPage} />

            {/* <Route path="/test" component={Test} /> */}

            {/* check to see if user is login, if not don't show */}
            {userAuth && currentUser._cls === "Client.Owner" ? (
              <Route exact path="/apply" component={ApplyPage} />
            ) : null}

            {userAuth && currentUser._cls === "Client.Owner" ? (
              <Route
                exact
                path="/my-restaurants"
                component={OwnerRestaurantPage}
              />
            ) : null}

            {userAuth && (
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
};

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
