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
import CustomModal from "../custom-modal/custom-modal.component";
import Tabs from "../tabs/tabs.component";
import RegisterForm from "../auth/RegisterForm";
import LoginForm from "../auth/LoginForm";
import SearchBar from "../../components/search-bar/search-bar.component";

// mui icons:
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";

// custom stylesheet:
import "./navbar.styles.scss";

const Navbar = ({ className, userAuth, setUserAuth, ...otherProps }) => {
  const [hideNav, setHideNav] = useState(true);
  //function for showing and hiding our modal
  const [showModal, setShowModal] = useState(false);

  const toggleNavBar = () => {
    console.log("togglemodal");
    setHideNav(!hideNav);
  };

  // toggle the moddle by changing it's state
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const signOut = () => {
    console.log("signing out");

    toggleModal();
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
      {/* if showModal is true, then show the modal contents, else show nothing */}
      {showModal && !userAuth ? (
        <CustomModal toggleModal={toggleModal}>
          <Tabs
            className="modalForm"
            labels={["Login", "Register"]}
            content={[<LoginForm />, <RegisterForm />]}
          ></Tabs>
          {/*  this is where your modal content component will go */}
        </CustomModal>
      ) : // this is the else, show nothing
      null}

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

        {userAuth ? (
          <React.Fragment>
            <li>
              <div className="nav-item-mask"></div>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <div className="nav-item-mask"></div>
              <Link to="/apply">open-shop</Link>
            </li>
          </React.Fragment>
        ) : (
          ""
        )}

        <li>
          <div className="nav-item-mask"></div>
          {/* <Link to="/login">Login</Link> */}
          {userAuth ? (
            <a onClick={signOut}>Logout</a>
          ) : (
            <a onClick={toggleModal}>Login</a>
          )}
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  setCurrentUser: (userId) => dispatch(setCurrentUser(userId)),
  resetUserRedux: () => dispatch(resetUserRedux()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
