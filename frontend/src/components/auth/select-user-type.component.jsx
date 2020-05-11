import React, { useState, useEffect } from "react";

import "./selectUserType.styles.scss";

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
        for="patron"
      >
        <span>Patron</span>
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
        for="owner"
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
