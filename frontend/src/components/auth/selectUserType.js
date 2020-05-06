import React, { Component } from "react";
import {signInWithGoogle, firebaseAuth} from "./firebaseAuth";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./selectUserType.styles.scss";
class SelectUserType extends Component {
  constructor(props) {
    super(props);
    // //bind method
    // this.login = this.login.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.state = {
        userType: ""
    };
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleClick = (e) => {
    //store the userType here, either Patron or RestaurantOwner
    console.log("case 1, ", e.target.value);
    this.setState({ userType: e.target.value, modalShow: true });
  };

  render() {
    return (
      <div className="user-type-form">
        <h1>Which are you?</h1>
        <form>
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
                  <button className="googleBtn"
                    onClick={() => {
                      try {
                        signInWithGoogle(); //from import (firebase)
                      } catch (error) {
                        console.error("Error signing in with Google", error);
                      }           
        
              }}>
                Sign up with Google
            </button>
            </div>
        </form>
      </div>
    );
  }
}
export default SelectUserType;
