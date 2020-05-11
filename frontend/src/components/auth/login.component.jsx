import React, { useState, useEffect } from "react";
import { firebaseAuth, signInWithGoogle } from "./firebaseAuth";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./login.styles.scss";

const LoginForm = ({ className, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // constructor(props) {
  //   super(props);
  //   // //bind method
  //   // this.login = this.login.bind(this);
  //   // this.handleChange = this.handleChange.bind(this);
  //   this.state = {
  //     email: "",
  //     password: "",
  //   };
  // }

  const login = (e) => {
    e.preventDefault();
    firebaseAuth
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        alert("Email or password incorrect. Please try again.");
      });
  };

  // const handleChange = (e) => {
  //   const target = e.target;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   const name = target.name;
  //   this.setState({
  //     [name]: value,
  //   });

  // };

  const handleClick = (e) => {
    //store the userType here, either Patron or RestaurantOwner
    console.log("case 1, ", e.target.value);
    this.setState({ userType: e.target.value, modalShow: true });
  };

  const googleLogin = (e) => {};

  return (
    <section className={`login-container ${className ? className : ""}`}>
      <h1>Login</h1>

      <div className="login-graphic">
        <span>appËtite</span>
        <img
          src="https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
          alt=""
        />
      </div>
      <form className="login-form" onSubmit={login}>
        <FormInput
          required
          type="email"
          name="email"
          htmlFor="email"
          label="email"
          value={email}
          handleChange={(e) => {
            setEmail(e.target.value);
          }}
          // className="input-override"
        />

        <FormInput
          required
          type="password"
          name="password"
          htmlFor="password"
          label="password"
          value={password}
          handleChange={(e) => {
            setPassword(e.target.value);
          }}
          // className="input-override"
        />

        <CustomButton type="submit" className="login-input-btn">
          login
        </CustomButton>
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
