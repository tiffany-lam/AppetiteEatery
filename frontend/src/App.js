import React from "react";
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
import RestaurantPage from "./pages/restaurant-page/restaurant-page.component";
import ContactUsPage from "./pages/contact-us-page/contact-us.component";
import ErrorPage from "./pages/error-page/error-page.component";
import ProfilePage from "./pages/profile-page/profile-page.component";

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <main>
          {console.log(props.userAuth)}
          <Switch>
            <Route exact path="/" component={HomePage} />

            {/* <Route path="/graduated" component={} /> */}
            {/* <Route exact path="/" component={HomePage} /> */}
            {/* EXAMPLE: */}
            <Route
              exact
              path="/restaurant/:restaurantId"
              component={RestaurantPage}
            />

            {/* <Route path="/login" component={} /> */}
            {/* <Route path="/graduated" component={} /> */}
            <Route path="/contact-us" component={ContactUsPage} />
            <Route path="/test" component={Test} />
            {/* <Route path="/restaurant-page" component={RestaurantPage} /> */}
            <Route path="/profile" component={ProfilePage} />
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

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  setCurrentUser: (userId) => dispatch(setCurrentUser(userId)),
  resetUserRedux: () => dispatch(resetUserRedux()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
