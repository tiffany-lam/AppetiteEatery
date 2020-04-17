import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import firebaseAuth from './firebaseAuth'
// import "bootstrap/dist/css/bootstrap.min.css";
import "./register.styles.scss";
class RegisterForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            fname: '',
            lname: '',
            password: '',
            confirmPass: '',
            userType: ''
        }
    }
    signup(e){
        e.preventDefault();
        firebaseAuth.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error)=>{
            console.log(error);
        })
    }

    handleClick = (e) => {
        //store the userType here, either Patron or RestaurantOwner
        console.log("case 1, ", e.target.value);
        this.setState({ userType: e.target.value, modalShow: true });
    };

    
    render() {
        return (
            <div className="register-form">
                <h1>Register</h1>
                <form>
                    <div className = "row1"> 
                        <div className="col1">
                            {/* First name */}
                            <div className="form-field">
                                <label>First name: </label>
                                <input value = {this.state.fname} type="text" id="fname" className="formInput" placeholder="Enter your full name" name="first_name" />
                                {/* name - used to reference elements after submitted */}
                            </div>
                        </div>
                        <div className = "col1"> 
                        {/* Last name */}
                            <div className="form-field">
                                <label>Last Name: </label>
                                <input value = {this.state.lname} type="text" id="lname" className="formInput" placeholder="Enter your last name" name="last_name" />
                            </div>
                        </div> {/* close col */}
                    </div> {/* close row */}
                    <div className = "row1"> 
                        <div className="col1">
                            {/* Email to register them by */}
                            <div className="form-field">
                                <label>Email: </label>
                                <input value = {this.state.email} type="text" id="email" className="formInput" placeholder="Enter your email" name="first_name" />
                                {/* name - used to reference elements after submitted */}
                            </div>
                        </div>
                        <div className = "col1"> 
                            {/* User Type */}
                            <div className="form-field">
                                <label>Are you a browsing patron or a restaurant owner looking to post their listing? </label>
                                {/* Radio button for Patron */}
                                <input value = {this.state.userType} type="radio" id="patron" name="userType" />
                                <label className = "radio-label" for="patron">Patron</label>
                                {/* Radio button for Restaurant Owner */}
                                <input value = {this.state.userType} type="radio" id="restaurantOwner" name="userType" />
                                <label className = "radio-label" for="restaurantOwner">Owner</label>
                            </div>
                        </div> {/* close col */}
                    </div> {/* close row */}
                    <div className = "row1"> 
                        <div className="col1">
                            {/* Password */}
                            <div className="form-field">
                                <label>Password: </label>
                                <input value = {this.state.password} type="text" id="password" className="formInput" placeholder="Enter a password" name="password" />
                                {/* name - used to reference elements after submitted */}
                            </div>
                        </div>
                        <div className = "col1"> 
                            {/* User Type */}
                            <div className="form-field">
                                <label>Confirm Password: </label>
                                <input value = {this.state.confirmPass} type="text" id="password" className="formInput" placeholder="Re-enter your password" name="password" />
                                {/* name - used to reference elements after submitted */} 
                            </div>
                        </div> {/* close col */}
                    </div> {/* close row */}

                    {/* Register button / If they already have an acct */}
                    <div>
                        <button className="registerBtn" onClick={this.signup}>Register</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default RegisterForm;
