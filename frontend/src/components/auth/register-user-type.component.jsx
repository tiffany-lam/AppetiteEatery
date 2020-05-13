/*
  Contributors: Tiffany Lam 
  Course: CECS 470

  Description: This component takes the userid from firebase and registers them into our MongoDB

*/
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { createMongoDbAccount } from "./firebaseAuth";
import { updateCurrentUser } from "../../redux/user/user.actions";

import SelectUserType from "./select-user-type.component";
import CustomButton from "../custom-button/custom-button.component";

import "./register-user-type.styles.scss";

const RegisterUserType = ({
  setChanges = () => {},
  userAuth,
  updateCurrentUser,
  ...props
}) => {
  const [userType, setUserType] = useState("patron");

  useEffect(() => {
    setChanges(userType);
  }, [userType]);

  const registerMongoAccount = async (e) => {
    e.preventDefault();

    let firstName = "";
    let lastName = "";

    if (userAuth.displayName) {
      const displayNameSegments = userAuth.displayName.split(" ");
      firstName = displayNameSegments[0];
      // let lastName = "";
      displayNameSegments.forEach((segment, i) => {
        if (i != 0) {
          lastName = `${lastName} ${segment}`;
        }
      });
    }

    const userData = {
      id: userAuth.uid,
      fname: firstName,
      lname: lastName,
      email: userAuth.email,
    };

    console.log("userData", userData);

    let res = await createMongoDbAccount(userData, userType);
    console.log("mongo here", res);

    updateCurrentUser(userAuth.uid);
  };

  return (
    <div className="register-user-type">
      <span>Are you a Patron looking for restaurants or are you a Restaurant Owner?:</span>

      <form onSubmit={registerMongoAccount}>
        <SelectUserType className="setType" setChanges={setUserType} />
        <CustomButton type="submit">continue</CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrentUser: (userID) => dispatch(updateCurrentUser(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUserType);
