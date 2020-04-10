import React from "react";
import {Redirect} from "react"
import "./register.styles.scss";
class Register extends Component{
    render(){
        return(
            <div className = "Register">
                <div className = "formTitle">Register</div>
                <div className = "registerBox">
                    <form>
                        {/* First name */}
                        <div className = "formField">
                        <label>First name: </label>
                        <input type = "text" id = "fname" className="formInput" placeholder = "Enter your full name" name = "first_name" /> 
                        {/* name - used to reference elements after submitted */}
                        </div>
                        {/* Last name */}
                        <div className = "formField">
                            <label>Last Name: </label>
                            <input type = "text" id = "lname" className = "formInput" placeholder = "Enter your last name" name = "last_name" />
                        </div>
                        {/* Email to register them by */}
                        <div className = "formField">
                            <label>Email: </label>
                            <input type = "email" id = "email" className = "formInput" placeholder = "Enter your email" name = "email" />
                        </div>
                        {/* Register button / If they already have an acct */}
                        <div>
                            <button className = "registerBtn">Register</button>
                            <a href ='#' className = "registerLink">I already have an account"</a>
                        </div>
                    </form>
                </div> 
            </div>

        );
    }
}export default Register;