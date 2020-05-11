import React, { useState, useEffect } from "react";

import RegisterForm from "../auth/register.component";
import LoginForm from "../auth/login.component";

import "./login-register-panel.styles.scss";

const LoginRegisterPanel = ({ ...props }) => {
  return (
    <div className="login-register-panel">
      <LoginForm></LoginForm>
      <RegisterForm></RegisterForm>
    </div>
  );
};

export default LoginRegisterPanel;
