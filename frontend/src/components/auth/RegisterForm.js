import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import {firebaseAuth} from "./firebaseAuth";
import CustomModal from "../custom-modal/custom-modal.component";
import SelectUserType from "./SelectUserType";
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
      userType: "",
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
  signup(e) {
    const { password, confirmPass } = this.state;
    //prevent the register button from submitting the form
    e.preventDefault();
    const isValid = this.validate();
    // perform all neccassary validations
    if (password !== confirmPass) {
      alert("Passwords don't match");
    } else {
      // make API call
      firebaseAuth
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
          console.log(error);
        });
    }
  }
  componentDidMount(){

  }
  askUserType (){
    this.setState({
      showTypeSelection: true
    });
  }

  /*    handleClick = (e) => {
        //store the userType here, either Patron or RestaurantOwner
        console.log("case 1, ", e.target.value);
        this.setState({ userType: e.target.value, modalShow: true });
    }; */

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div className="register-form">
          <h1>Register</h1>
          <form onSubmit={this.signup}>
            <div className="register-col-1">
              {/* First name */}
              <div className="form-field">
                <label>*First name: </label>
                <input
                  value={this.state.fname}
                  type="text"
                  id="fname"
                  className="formInput"
                  placeholder="Enter your full name"
                  name="fname"
                  onChange={this.handleChange}
                  required={true}
                />
                {/* name - used to reference elements after submitted */}
              </div>
              <div className="form-field">
                <label>*Email: </label>
                <input
                  value={this.state.email}
                  type="text"
                  id="email"
                  className="formInput"
                  placeholder="Enter your email"
                  name="email"
                  onChange={this.handleChange}
                  required={true}
                />
                {/* name - used to reference elements after submitted */}
                {errors.email.length > 0 && (
                  <span className="error">{errors.email}</span>
                )}
              </div>
              <div className="form-field">
                <label>*Password: </label>
                <input
                  value={this.state.password}
                  type="password"
                  id="password"
                  className="formInput"
                  placeholder="Enter a password"
                  name="password"
                  onChange={this.handleChange}
                  required={true}
                />
                {/* name - used to reference elements after submitted */}
                {errors.password.length > 0 && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
            </div>
            <div className="register-col-2">
              {/* Last name */}
              <div className="form-field">
                <label>*Last Name: </label>
                <input
                  value={this.state.lname}
                  type="text"
                  id="lname"
                  className="formInput"
                  placeholder="Enter your last name"
                  name="lname"
                  onChange={this.handleChange}
                  required={true}
                />
              </div>
              <div className="form-field">
                <label>Account Type</label>
                {/* Radio button for Patron */}
                <input
                  value={this.state.userType}
                  type="radio"
                  id="patron"
                  name="userType"
                  onChange={this.handleChange}
                  required={true}
                />
                <label className="radio-label" for="patron">
                  Patron
                </label>
                {/* Radio button for Restaurant Owner */}
                <input
                  value={this.state.userType}
                  type="radio"
                  id="restaurantOwner"
                  name="userType"
                  onChange={this.handleChange}
                  required={true}
                />
                <label className="radio-label" for="restaurantOwner">
                  Owner
                </label>
              </div>

              <div className="form-field">
                <label>*Confirm Password: </label>
                <input
                  value={this.state.confirmPass}
                  type="password"
                  id="confirmPassword"
                  className="formInput"
                  placeholder="Re-enter your password"
                  name="confirmPass"
                  onChange={this.handleChange}
                  required={true}
                />
                {/* name - used to reference elements after submitted */}
              </div>
            </div>{" "}
            {/* close col */}
            {/* close row */}
            <div className="row1">
              <div className="col1">{/* Email to register them by */}</div>
              <div className="col1">{/* User Type */}</div> {/* close col */}
            </div>{" "}
            {/* close row */}
            <div className="row1">
              <div className="col1">{/* Password */}</div>
              <div className="col1">{/* User Type */}</div> {/* close col */}
            </div>{" "}
            {/* close row */}
            {/* Register button / If they already have an acct */}
          </form>
          <div className="btnDiv">
            <button className="registerBtn" onClick={this.signup} type="submit">
              Register
            </button>
            <button className="googleBtn"
              onClick={this.askUserType}>
                Sign up with Google
            </button>
            {this.state.showTypeSelection ?
              <CustomModal>
              <SelectUserType/>
              </CustomModal> :
              null
          
            }
          
           
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default RegisterForm;
