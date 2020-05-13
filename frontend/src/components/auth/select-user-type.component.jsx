
/*
  Contributors: Tiffany Lam 
  Course: CECS 470

  Description: This is the select-user-type component. This component creates a custom "radio button" for the user to select. The user can then choose between Patron and Restaurant Owner
  
*/
import React, { useState, useEffect } from "react";

import "./selectUserType.styles.scss"; //import stype

const SelectUserType = ({ setChanges = () => {}, className, ...props }) => {
  const [userType, setUserType] = useState("patron");

  useEffect(() => {
    setChanges(userType);
  }, [userType]);

  return (
    <div className={`select-user-form ${className ? className : ""}`}>
      <span className="user-type-label">User Type:</span>

      {/* Radio button for Patron */}
      <label
        id="patron-lbl"
        className={`radio-label ${userType === "patron" ? "selected" : ""}`}
        htmlFor="patron"
      >
        <span>Patron</span>
        {/* check if the user is a patron or not */}
        <input
          checked={userType === "patron" ? true : false}
          value="patron"
          type="radio"
          id="patron"
          name="userType"
          onChange={(e) => {
            setUserType(e.target.value);
          }}
          required
        />
      </label>

      {/* Radio button for Restaurant Owner */}
      <label
        id="owner-lbl"
        className={`radio-label ${userType === "owner" ? "selected" : ""}`}
        htmlFor="owner"
      >
        <span>Owner</span>
        <input
          // checked={userType === "owner" ? true : false}
          value="owner"
          type="radio"
          id="owner"
          name="userType"
          onChange={(e) => {
            setUserType(e.target.value);
          }}
          required
        />
      </label>
    </div>
  );
};
export default SelectUserType;
