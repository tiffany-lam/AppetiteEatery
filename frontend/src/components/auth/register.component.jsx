import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { auth, createMongoDbAccount } from "./firebaseAuth";
import SelectUserType from "./select-user-type.component";
import { updateCurrentUser } from "../../redux/user/user.actions";

import FormInput from "../form-input/form-input.component";
import CustomBotton from "../custom-button/custom-button.component";

import { BASE_API_URL } from "../../utils";

import "./register.styles.scss";

const RegisterForm = ({ updateCurrentUser, ...props }) => {
  const [registerForm, setRegisterForm] = useState({
    email: { value: "", error: "" },
    fname: { value: "", error: "" },
    lname: { value: "", error: "" },
    password: { value: "", error: "" },
    confirmPassword: { value: "", error: "" },
    userType: { value: "", error: "" },
  });

  const [fname, setFname] = useState({ value: "", error: "" });

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let confirmPassError = "";
    if (!this.state.fname) {
      nameError = "Name cannot be blank";
      return false;
    }
    if (!this.state.lname) {
      nameError = "Last name cannot be blank";
      return false;
    }
    if (this.state.email.includes("@")) {
      emailError = "Invalid Email";
      return false;
    }
    if (this.state.password !== this.state.confirmPass) {
      confirmPassError = "Your passwords do not match";
      alert("Passwords don't match");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        errors.email =
          //if value includes @ then do nothing else return error
          value.includes("@") ? "" : "Error: Email not valid";
        break;
      case "password":
        errors.password =
          value.length <= 5
            ? "Error: Password needs to be greater than 5 characters"
            : "";
        break;
    }
    this.setState({
      [name]: value,
    });
  };

  const signup = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        registerForm.email.value,
        registerForm.password.value
      )
      .then(async (firebaseCredential) => {
        console.log("successfully created firebased user");
        const userData = {
          id: firebaseCredential.user.uid,
          fname: registerForm.fname.value,
          lname: registerForm.lname.value,
          email: registerForm.email.value,
        };

        console.log("successfully created mongo user");
        let mongoUser = await createMongoDbAccount(
          userData,
          registerForm.userType
        );

        updateCurrentUser(firebaseCredential.user.uid);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRadioButton = (value) => {
    this.setState({
      userType: value,
    });
  };

  return (
    <section className="register-form-container">
      <h1
        onClick={() => {
          console.log(registerForm);
        }}
      >
        Register
      </h1>
      <form className="register-form" onSubmit={signup}>
        <FormInput
          required
          type="text"
          name="fname"
          htmlFor="first-name"
          label="first name"
          value={registerForm.fname.value}
          handleChange={(e) => {
            setRegisterForm({
              ...registerForm,
              fname: { ...registerForm.fname, value: e.target.value },
            });
          }}
          className="input-gap"
        />

        <FormInput
          required
          type="text"
          name="lname"
          htmlFor="last-name"
          label="last name"
          value={registerForm.lname.value}
          handleChange={(e) => {
            setRegisterForm({
              ...registerForm,
              lname: { ...registerForm.lname, value: e.target.value },
            });
          }}
          className="input-gap"
        />

        <FormInput
          required
          type="email"
          name="email"
          htmlFor="email"
          label="email"
          value={registerForm.email.value}
          handleChange={(e) => {
            setRegisterForm({
              ...registerForm,
              email: { ...registerForm.email, value: e.target.value },
            });
          }}
          className="input-gap"
        />

        <FormInput
          required
          type="password"
          name="password"
          htmlFor="password"
          label="password"
          value={registerForm.password.value}
          handleChange={(e) => {
            setRegisterForm({
              ...registerForm,
              password: { ...registerForm.password, value: e.target.value },
            });
          }}
          minLength="8"
          className="input-gap"
        />

        <FormInput
          required
          type="password"
          name="confirmPass"
          htmlFor="confirmPassword"
          label="confirm password"
          value={registerForm.confirmPassword.value}
          handleChange={(e) => {
            setRegisterForm({
              ...registerForm,
              confirmPassword: {
                ...registerForm.confirmPassword,
                value: e.target.value,
              },
            });
          }}
          minLength="8"
          className="input-gap"
        />

        <SelectUserType
          setChanges={(value) => {
            setRegisterForm({
              ...registerForm,
              userType: { ...registerForm.userType, value: value },
            });
          }}
        />

        <CustomBotton type="submit" className="input-gap">
          Register
        </CustomBotton>
      </form>
    </section>
  );
};
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrentUser: (userID) => dispatch(updateCurrentUser(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
