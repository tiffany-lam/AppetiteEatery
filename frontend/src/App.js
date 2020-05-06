import React, { Component } from "react";
import firebaseAuth from "./components/auth/firebaseAuth";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  setUserAuth,
  setCurrentUser,
  resetUserRedux,
} from "./redux/user/user.actions";
import "./App.scss";

// custom components here:
import Navbar from "./components/navbar/navbar.component";
import Test from "./components/test/test.component";
import RegisterModal from "./components/auth/RegisterForm";
import FooterNav from "./components/footer-nav/footer-nav.component";

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
    };
  }
  //after component is done rendering the first time
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    this.unsubscribedFromAuth = firebaseAuth
      .auth()
      .onAuthStateChanged((user) => {
        console.log(user);
        console.log("app.js");
        if (user) {
          console.log("gggg");
          this.setState({ user });
          this.props.setUserAuth(user);
        } else {
          this.setState({ user: null });
          this.props.setUserAuth(null);
        }
      });
  }

  componentWillUnmount() {
    this.unsubscribedFromAuth();
  }

  render() {
    return (
      <div className="App">
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
              {this.props.userAuth && (
                <Route exact path="/apply" component={ApplyPage} />
              )}

              {this.props.userAuth && (
                <Route
                  exact
                  path="/my-restaurants"
                  component={OwnerRestaurantPage}
                />
              )}
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
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  setCurrentUser: (userId) => dispatch(setCurrentUser(userId)),
  resetUserRedux: () => dispatch(resetUserRedux()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
