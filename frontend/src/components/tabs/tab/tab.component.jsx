import React from "react";

import "./tab.styles.scss";

export default function Tab(props) {
  const setActive = () => {
    props.setTab(props.index);
  };
  return (
    <li className={`tab-btn ${props.className ? `${props.className}` : ""}`}>
      <button
        type="button"
        onClick={setActive}
        className={props.active ? `tab-active` : "tab-inactive"}
      >
        {props.label}
      </button>
    </li>
  );
}
