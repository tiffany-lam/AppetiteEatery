import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./register.styles.scss";
class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      show: true,
      firstName: "",
      lastName: "",
      email: "",
      userType: null,
    };
  }

  handleClick = (e) => {
    //store the userType here, either Patron or RestaurantOwner
    console.log("case 1, ", e.target.value);
    this.setState({ userType: e.target.value, modalShow: true });
  };
  showModal = () => {
    this.setState({ show: true });
  };

  closeModal = () => {
    this.setState({ show: false });
  };
  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.targe.value });
  };

  render() {
    return (
      <div className="register-form">
        <form>
          {/* First name */}
          <div className="formField">
            <label>First name: </label>
            <input
              type="text"
              id="fname"
              className="formInput"
              placeholder="Enter your full name"
              name="first_name"
            />
            {/* name - used to reference elements after submitted */}
          </div>
          {/* Last name */}
          <div className="formField">
            <label>Last Name: </label>
            <input
              type="text"
              id="lname"
              className="formInput"
              placeholder="Enter your last name"
              name="last_name"
            />
          </div>
          {/* Email to register them by */}
          <div className="formField">
            <label>Email: </label>
            <input
              type="email"
              id="email"
              className="formInput"
              placeholder="Enter your email"
              name="email"
            />
          </div>
          {/* Register button / If they already have an acct */}
          <div>
            <button className="registerBtn">Register</button>
            <a href="#" className="registerLink">
              I already have an account"
            </a>
          </div>
        </form>
      </div>
    );
  }
}
export default RegisterForm;
