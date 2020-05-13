/*
  Contributors: Julie Do 014101748, Sam Alhaqab 017018649, Tiffany Lam 015181853
  Course: CECS 470

  Description: This functional component renders a tab component, which is essentially used as the buttons of a tabbing system.
*/

// IMPORT MAIN PACKAGES
import React from "react";

// IMPORT STYLES
import "./tab.styles.scss";

// Export default functional component Tab
export default function Tab(props) {
  // This function calls a passed in function to set this tab as the currently displayed and active tab.
  const setActive = () => {
    props.setTab(props.index);
  };

  // This returns a list item with a button inside, as each item will be contained in a list in the tabs component. Clicking the button sets this tab to active.
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
