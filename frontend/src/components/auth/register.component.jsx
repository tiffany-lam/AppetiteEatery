/*
  Contributors: Tiffany Lam 
  Course: CECS 470

  Description: This is the register component. This is the component that takes the user's data from the form and sends it to the database. This components also auths/registers a user with fireebase. 

*/
import React, {useState } from "react";
import { connect } from "react-redux";

import { auth, createMongoDbAccount } from "./firebaseAuth";
import SelectUserType from "./select-user-type.component";
import { updateCurrentUser } from "../../redux/user/user.actions";

import FormInput from "../form-input/form-input.component";
import CustomBotton from "../custom-button/custom-button.component";

import "./register.styles.scss";

const RegisterForm = ({ updateCurrentUser, className, ...props }) => {
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
    let validated = true;

    const {
      fname,
      lname,
      email,
      password,
      confirmPassword,
    } = registerForm;
    //error checking 
    if (fname.value === "") {
      setRegisterForm({
        ...registerForm,
        fname: { ...registerForm.fname, error: "first name cannot be blank" },
      });
      validated = false;
    }

    if (lname.value === "") {
      setRegisterForm({
        ...registerForm,
        lname: { ...registerForm.lname, error: "last name cannot be blank" },
      });
      validated = false;
    }

    if (!email.value.includes("@")) {
      // emailError = ;
      setRegisterForm({
        ...registerForm,
        email: { ...registerForm.email, error: "email requires @" },
      });
      validated = false;
    }
    //do some password checking
    if (password.value !== confirmPassword.value) {
      setRegisterForm({
        ...registerForm,
        confirmPassword: {
          ...registerForm.confirmPassword,
          error: "does not match",
        },
        password: {
          ...registerForm.password,
          error: "does not match",
        },
      });
      validated = false;
    }

    return validated;
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

  const register = (e) => {
    e.preventDefault();

    auth
    //creats a user with the email and passsword
      .createUserWithEmailAndPassword(
        registerForm.email.value,
        registerForm.password.value
      )
      .then(async (firebaseCredential) => {
        const userData = {
          id: firebaseCredential.user.uid,
          fname: registerForm.fname.value,
          lname: registerForm.lname.value,
          email: registerForm.email.value,
        };

        let mongoUser = await createMongoDbAccount(
          userData,
          registerForm.userType.value
        );
        //update the page with the current user 
        updateCurrentUser(firebaseCredential.user.uid);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section
      className={`register-form-container ${className ? className : ""}`}
    >
      <h1>
        Register
      </h1>
      <form
        className="register-form"
        onSubmit={(e) => {
          //dont do default form submission, validate first then register using firebase
          e.preventDefault();

          if (validate()) {
            register(e);
          }
        }}
      >
        {/* create the form using custom form input component */}
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
          error={registerForm.fname.error}
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
          error={registerForm.lname.error}
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
          error={registerForm.email.error}
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
          error={registerForm.password.error}
        />

        <FormInput
          required
          type="password"
          name="confirmPassword"
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
          error={registerForm.confirmPassword.error}
        />

        <SelectUserType
          className="user-type-radio"
          setChanges={(value) => {
            setRegisterForm({
              ...registerForm,
              userType: { ...registerForm.userType, value: value },
            });
          }}
        />

        <CustomBotton type="submit">Register</CustomBotton>
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
