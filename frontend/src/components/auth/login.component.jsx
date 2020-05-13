/*
  Contributors: Tiffany Lam 
  Course: CECS 470

  Description: This is the login component, so what you see when you're on the login panel. The user enters their email and password and this auths with firebase and then logs them in 

*/
//import firebase and custombutton and forminput
import React, { useState} from "react";
import { firebaseAuth, signInWithGoogle } from "./firebaseAuth";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./login.styles.scss";
import { Link } from "react-router-dom";
import PasswordReset from "./PasswordReset.component";

//initialize the props and initialize the state of the email and password to be blank at start
const LoginForm = ({ className, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //this is what happens when the user clicks submit
  const login = (e) => {
    //so prevent the default submission of a form 
    e.preventDefault();
    //call the firebaseAuth from firebase.js
    firebaseAuth
      .auth()
      //sign in with the default way (email and password)
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          setError("email or password is invalid");
        }
      });
  };

  // this returns the login panel component
  return (
    //if someone passes a className to this component set it, else use default 
    <section className={`login-container ${className ? className : ""}`}>
      <h1>Login</h1>
      {/* create a graphic with our webpage name  */}
      <div className="login-graphic">
        <span>appËtite</span>
        <img
          src="https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
          alt="photo of food with our logo on top"
        />
      </div>
      {error !== "" ? <p className="login-error-msg">{error}</p> : null}
      <form className="login-form" onSubmit={login}>
        {/* use the form input component to fill out the login form, refer to form-input.component.jsx */}
        <FormInput
          required
          type="email"
          name="email"
          htmlFor="login-email"
          label="email"
          value={email}
          handleChange={(e) => {
            setEmail(e.target.value);
          }}
          // className="input-override"
        />
        {/* use the form input component to fill out the login form, refer to form-input.component.jsx */}
        <FormInput
          required
          type="password"
          name="password"
          htmlFor="login-password"
          label="password"
          value={password}
          handleChange={(e) => {
            setPassword(e.target.value);
          }}
          // className="input-override"
        />
        {/* use the custom button, refer to custom-button.component.jsx */}
        <CustomButton type="submit" className="login-input-btn">
          login
        </CustomButton>
        {/* add the forget password */}
        <a href ="/forgot-password" className = "forget-password-link">Forgot Password?</a>
        <CustomButton
          type="button"
          className="login-input-btn"
          onClick={signInWithGoogle}
        >
          google login
        </CustomButton>
      </form>
    </section>
  );
};
export default LoginForm;
