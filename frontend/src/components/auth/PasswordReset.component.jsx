/*
  Contributors: Tiffany Lam 
  Course: CECS 470

  Description: This is the reset password component. This component appears when the user clicks forget password. 

*/
import React, {useState} from "react";
import firebaseAuth from "./firebaseAuth";
import { Link } from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import "./passwordReset.styles.scss";

const PasswordReset = () => {
  //initialize the props and states of the props, email to nothing, and emailHasBeenSent to false 
    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [error, setError] = useState(null);
    const onChangeHandler = event => {
      const { name, value } = event.currentTarget;
      if (name === "userEmail") {
        setEmail(value);
      }
    };
    const sendResetEmail = e => {
      e.preventDefault();
      firebaseAuth
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
      })
      .catch(() => {
        setError("Error resetting password. Are you sure you've registed with that password before?");
      });
    };
    return (
      <div>
        <h1>
          Reset your Password
        </h1>
      
        <div >
          <form>
            {emailHasBeenSent && (
              <div >
                An email has been sent to you!
              </div>
            )}
            {error !== null && (
              <div >
                {error}
              </div>
            )}
            <FormInput
              required
              type="email"
              name="email"
              htmlFor="reset-email"
              label="email"
              value={email}
              handleChange={(e) => {
                setEmail(e.target.value);
              }}/>
            <CustomButton type="button" className="reset-pass-btn" onClick={sendResetEmail}>
            Reset
            </CustomButton>
          </form>
          <Link
           to ="/"        
          >
            &larr; Back to home page
          </Link>
        </div>
      </div>
    );
  };
  export default PasswordReset;