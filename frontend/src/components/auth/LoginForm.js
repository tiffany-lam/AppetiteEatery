import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import firebaseAuth from './firebaseAuth'
// import "bootstrap/dist/css/bootstrap.min.css";
import "./register.styles.scss";
class LoginForm extends Component {
    constructor(props){
        super(props);
        // //bind method
        // this.login = this.login.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: '',
        }
    }
    login(e){
        e.preventDefault();
        firebaseAuth.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error)=>{
            console.log(error);
        });
    }
    handle(e){
        this.setState({[e.target.name]: e.target.value})
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
                            {/* Email to register them by */}
                            <div className="form-field">
                                <label>Email: </label>
                                <input value = {this.state.email} type="email" id="email" className="formInput" placeholder="Enter your email" name="email" />
                            </div>
                        </div>
                        <div className = "col1"> 
                        {/* Last name */}
                            <div className="form-field">
                                <label>Password: </label>
                                <input value = {this.state.password} type="text" id="lname" className="formInput" placeholder="Enter your last name" name="last_name" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Register button / If they already have an acct */}
                    <div>
                        <button className="loginBtn" onClick = {this.state.login}>Login</button>
                    </div>

                </form>
            </div>
        );
    }
}
export default LoginForm;
