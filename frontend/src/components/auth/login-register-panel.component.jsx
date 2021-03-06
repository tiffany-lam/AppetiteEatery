/*
  Contributor: Tiffany Lam 
  Course: CECS 470

  Description: This is the login/register modal component. Initially this was used in the Tab component, but this creates the modal that holds the Login and Register Panels. Instead of tabs, we can move between them using the button on the bottom (or register, or login)

*/
import React, { useState} from "react";
import RegisterForm from "../auth/register.component";
import LoginForm from "../auth/login.component";

import "./login-register-panel.styles.scss";

const LoginRegisterPanel = ({ ...props }) => {
  const [index, setIndex] = useState(true);
  const switchCard = () => {};
  return (
    <div className="login-register-panel">
      {/* {index === 0 && <LoginForm className="panel-card"></LoginForm>}

      {index === 1 && <RegisterForm className="panel-card"></RegisterForm>} */}

      <div className={`panel-card ${index ? "" : "panel-unselected"}`}>
        <LoginForm className="panel-item" />
        <button
          className="switch-panel-btn"
          type="button"
          onClick={() => {
            setIndex(!index);
          }}
        >
          or register
        </button>
      </div>

      <div className={`panel-card ${!index ? "" : "panel-unselected"}`}>
        <RegisterForm className="panel-item" />
        <button
          className="switch-panel-btn"
          type="button"
          onClick={() => {
            setIndex(!index);
          }}
        >
          or log in
        </button>
      </div>
    </div>
  );
};

export default LoginRegisterPanel;
