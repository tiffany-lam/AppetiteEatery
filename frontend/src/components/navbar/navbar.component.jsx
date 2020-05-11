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
import LoadingAnimation from "../../components/loading-animation/loading-animation.component";
import CustomButton from "../custom-button/custom-button.component";

// mui icons:
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";

// custom stylesheet:
import "./navbar.styles.scss";

const Navbar = ({
  className,
  userAuth,
  currentUser,
  setUserAuth,
  ...props
}) => {
  const [hideNav, setHideNav] = useState(true);

  const toggleNavBar = () => {
    console.log("togglemodal");
    setHideNav(!hideNav);
  };

  const signOut = () => {
    console.log("signing out");
    firebaseAuth
      .auth()
      .signOut()
      .then((res) => {
        console.log("signed out");
        console.log(res);
        setUserAuth(res);
      });
  };

  return (
    <nav className="header-nav">
      <div className="logo-container-flex">
        <Link to="/">
          <Logo eVersion={1} uppercase={true} />
        </Link>
      </div>

      <div className="nav-item-searchbar">
        <SearchBar />
      </div>

      <CircleButton id="menu-btn" onClick={toggleNavBar} hoverRotate={true}>
        <MenuIcon />
      </CircleButton>
      <ul className={hideNav ? "mobile-hidden" : ""}>
        {/* <ul> */}
        <li>
          <div className="nav-item-mask"></div>
          <Link to="/">Home</Link>
        </li>
        <li>
          <div className="nav-item-mask"></div>
          <Link to="/graduated">Graduated</Link>
        </li>

        {userAuth && currentUser._cls === "Client.Patron" ? (
          <React.Fragment>
            <li>
              <div className="nav-item-mask"></div>
              <Link to="/profile">Profile</Link>
            </li>
          </React.Fragment>
        ) : null}

        {userAuth && currentUser._cls === "Client.Owner" ? (
          <li>
            <div className="nav-item-mask"></div>
            <Link to="/my-restaurants">My Restaurants</Link>
          </li>
        ) : null}

        <li>
          <div className="nav-item-mask"></div>
          {/* <Link to="/login">Login</Link> */}
          {userAuth ? (
            <button type="button" className="auth-btn" onClick={signOut}>
              logout
            </button>
          ) : (
            <Modal
              // defaultShow
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

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  setCurrentUser: (userId) => dispatch(setCurrentUser(userId)),
  resetUserRedux: () => dispatch(resetUserRedux()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
