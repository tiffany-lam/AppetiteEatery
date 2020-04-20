import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
import Tabs from "../tabs/tabs.component"
import RegisterForm from "../auth/RegisterForm";
import LoginForm from "../auth/LoginForm";
import Rating from "../rating/rating.component";

// mui icons:
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";


// custom stylesheet:
import "./navbar.styles.scss";

const Navbar = ({ className, ...otherProps }) => {
  const [hideNav, setHideNav] = useState(true);
  //function for showing and hiding our modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("YAAAAS");
    otherProps.setUserAuth("the dog has land");
  });

  const toggleNavBar = () => {
    setHideNav(!hideNav);
  };

  // toggle the moddle by changing it's state
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <nav className="header-nav">
      {/* if showModal is true, then show the modal contents, else show nothing */}
      {showModal ? (
        <CustomModal toggleModal={toggleModal}>
          <Tabs className = "modalForm"
            labels ={["Login", "Register"]}
            content={[
            <LoginForm/>,
            <RegisterForm/>           
            ]}
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
        <li>
          <div className="nav-item-mask"></div>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <div className="nav-item-mask"></div>
          {/* <Link to="/login">Login</Link> */}
          <a onClick={toggleModal}>Login</a>
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
