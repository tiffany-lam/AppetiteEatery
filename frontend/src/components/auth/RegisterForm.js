import React, { Component } from "react";
import axios from "axios";

// import { Button, Modal } from "react-bootstrap";
import { firebaseAuth } from "./firebaseAuth";
import CustomModal from "../custom-modal/custom-modal.component";
import SelectUserType from "./selectUserType";

import FormInput from "../form-input/form-input.component";
import CustomBotton from "../custom-button/custom-button.component";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./register.styles.scss";
class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fname: "",
      lname: "",
      password: "",
      confirmPass: "",
      userType: "patron",
      showTypeSelection: false,
      //error validation messages
      errors: {
        email: "",
        password: "",
        confirmPass: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.askUserType = this.askUserType.bind(this);
  }

  validate = () => {
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

  handleChange = (e) => {
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

  signup = async (e) => {
    console.log("heloooooooooo");
    const { password, confirmPass } = this.state;
    //prevent the register button from submitting the form
    e.preventDefault();
    // perform all neccassary validations
    if (password !== confirmPass) {
      alert("Passwords don't match");
    } else {
      // make API call
      console.log("making api call");
      firebaseAuth
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(async (data) => {
          console.log("successfully created firebased user");
          const userData = {
            id: data.user.uid,
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
          };

          console.log(data.user.getIdToken());
          console.log(data.user.uid);
          //pass the token and create the owner in mongo

          let apiUrl = "http://127.0.0.1:5000/api/user";
          console.log("api", `${apiUrl}/${this.state.userType}`);
          axios
            .post(`${apiUrl}/${this.state.userType}`, userData)
            .then((res) => {
              console.log("Returned New Owner: \n");
              console.log(res.data);
            })
            //catch errors with mongo
            .catch((error) => console.error(error));
        })
        //catch errors with firebase
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleRadioButton = (e) => {
    this.setState({
      userType: e.target.value,
    });
  };

  askUserType() {
    this.setState({
      showTypeSelection: true,
    });
  }

  handleChange1 = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div className="register-form-container">
          <h1
            onClick={() => {
              console.log(this.state);
            }}
          >
            Register
          </h1>
          <form className="register-form" onSubmit={this.signup}>
            <FormInput
              required
              type="text"
              name="fname"
              htmlFor="first-name"
              label="first name"
              value={this.state.fname}
              handleChange={this.handleChange}
              className="input-gap"
            />

            <FormInput
              required
              type="text"
              name="lname"
              htmlFor="last-name"
              label="last name"
              value={this.state.lname}
              handleChange={this.handleChange}
              className="input-gap"
            />

            <FormInput
              required
              type="text"
              name="email"
              htmlFor="email"
              label="email"
              value={this.state.email}
              handleChange={this.handleChange}
              className="input-gap"
            />

            <FormInput
              required
              type="password"
              name="password"
              htmlFor="password"
              label="password"
              value={this.state.password}
              handleChange={this.handleChange}
              className="input-gap"
            />

            <FormInput
              required
              type="password"
              name="confirmPass"
              htmlFor="confirmPassword"
              label="confirmPassword"
              value={this.state.confirmPass}
              handleChange={this.handleChange}
              className="input-gap"
            />

            <div className="user-type-container">
              <div className="radio">
                <label className="user-type-label" htmlFor="patron">
                  Patron
                </label>
                <input
                  type="radio"
                  id="patron"
                  name="userType"
                  value="patron"
                  onChange={this.handleRadioButton}
                  defaultChecked
                ></input>
              </div>

              <div className="radio">
                <label className="user-type-label" htmlFor="owner">
                  Owner
                </label>
                <input
                  type="radio"
                  id="owner"
                  name="userType"
                  value="owner"
                  onChange={this.handleRadioButton}
                ></input>
              </div>
            </div>

            <CustomBotton
              type="submit"
              onClick={this.signup}
              className="input-gap"
            >
              Register
            </CustomBotton>
            <CustomBotton
              type="button"
              onClick={this.askUserType}
              className="input-gap"
            >
              Sign up with Google
            </CustomBotton>
          </form>

          {/* <button className="registerBtn"  type="submit">
            Register
          </button>
          <button className="googleBtn" >
            Sign up with Google
          </button> */}
          {this.state.showTypeSelection ? (
            <CustomModal>
              <SelectUserType />
            </CustomModal>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}
export default RegisterForm;
