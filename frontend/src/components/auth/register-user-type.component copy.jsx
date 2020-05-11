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

    const userData = {
      id: userAuth.uid,
      fname: userAuth.displayName.split(" ")[0],
      lname: userAuth.displayName.split(" ")[1],
      email: userAuth.email,
    };

    let res = await createMongoDbAccount(userData, userType);
    console.log("mongo here", res);

    updateCurrentUser(userAuth.uid);
  };

  return (
    <div className="register-user-type">
      <span>Please select your account type:</span>

      <form onSubmit={registerMongoAccount}>
        <SelectUserType setChanges={setUserType} />

        <CustomButton type="submit">df</CustomButton>
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
