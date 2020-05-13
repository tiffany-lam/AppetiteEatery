/*
  Contributors: Sam Alhaqab 017018649, Tiffany Lam 015181853
  Course: CECS 470

  Description: This functional component returns a navigational bar containing links to all the 
  main pages and/or functions of our website. It also conditionally displays certain links 
  depending on the user's authentication status.
*/

// main packages:
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// firebase:
import firebaseAuth from "../auth/firebaseAuth";

// redux:
import { connect } from "react-redux";
import {
  setUserAuth,
  setCurrentUser,
  resetUserRedux,
} from "../../redux/user/user.actions";

// custom components:
import Logo from "../logo/logo.component";
import CircleButton from "../circle-btn/circle-btn.component";
import Modal from "../modal/modal.component";
import LoginRegisterPanel from "../auth/login-register-panel.component";
import SearchBar from "../../components/search-bar/search-bar.component";

// mui icons:
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";

// custom stylesheet:
import "./navbar.styles.scss";

// functional component renders the header navigational bar for all our webpages
const Navbar = ({
  className,
  userAuth,
  currentUser,
  setUserAuth,
  ...props
}) => {
  // state variable to hide certain navigational links based on page size/if in mobile view
  const [hideNav, setHideNav] = useState(true);

  // function toggles visibility of navigational links from a button on mobile view
  const toggleNavBar = () => {
    setHideNav(!hideNav);
  };

  // function signs user out of firebase/website
  const signOut = () => {
    firebaseAuth
      .auth()
      .signOut()
      .then((res) => {
        setUserAuth(res);
      });
  };

  // returns navigation component containing logo and page links (such as home page, my
  // restaurant pages, profile page, etc.)
  return (
    <nav className="header-nav">
      {/* logo which links to home page */}
      <div className="logo-container-flex">
        <Link to="/">
          <Logo eVersion={1} uppercase={true} />
        </Link>
      </div>

      {/* search bar within navigation bar */}
      <div className="nav-item-searchbar">
        <SearchBar />
      </div>

      {/* button displayed for dropdown of navigational links when page shrinks instead of 
      displaying navigational links as is */}
      <CircleButton id="menu-btn" onClick={toggleNavBar} hoverRotate={true}>
        <MenuIcon />
      </CircleButton>
      {/* list of all navigational links */}
      <ul className={hideNav ? "mobile-hidden" : ""}>
        {/* link to home page */}
        <li>
          <div className="nav-item-mask"></div>
          <Link to="/">Home</Link>
        </li>
        {/* link to graduated page */}
        <li>
          <div className="nav-item-mask"></div>
          <Link to="/graduated">Graduated</Link>
        </li>

        {/* displays profile link only if user is logged in as a patron */}
        {userAuth && currentUser._cls === "Client.Patron" ? (
          <React.Fragment>
            <li>
              <div className="nav-item-mask"></div>
              <Link to="/profile">Profile</Link>
            </li>
          </React.Fragment>
        ) : null}

        {/* displays my restaurans link only if user is logged in as an owner */}
        {userAuth && currentUser._cls === "Client.Owner" ? (
          <li>
            <div className="nav-item-mask"></div>
            <Link to="/my-restaurants">My Restaurants</Link>
          </li>
        ) : null}

        {/* login/logout button */}
        <li>
          <div className="nav-item-mask"></div>
          {userAuth ? (
            <button type="button" className="auth-btn" onClick={signOut}>
              logout
            </button>
          ) : (
            <Modal
              backdrop
              triggerComponent={
                <button type="button" className="auth-btn">
                  Login
                </button>
              }
            >
              <LoginRegisterPanel />
            </Modal>
          )}
        </li>
      </ul>
    </nav>
  );
};

// maps redux state as props to functional Navbar component as a higher order component
const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  currentUser: user.currentUser,
});

// maps redux functions as props to functional Navbar component as a higher order component
const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  setCurrentUser: (userId) => dispatch(setCurrentUser(userId)),
  resetUserRedux: () => dispatch(resetUserRedux()),
});

// attaches redux state and functions to navbar, which is then exported as a default component
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
