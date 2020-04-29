import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchbarValue } from "../../redux/ui/ui.actions";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import CircleButton from "../circle-btn/circle-btn.component";

// mui icons:
import SearchIcon from "@material-ui/icons/Search";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import AppsIcon from "@material-ui/icons/Apps";

import "./search-bar.styles.scss";

const SearchBar = ({
  searchbarValue,
  setSearchbarValue,
  location,
  className = "",
  ...props
}) => {
  const [searchbarPlaceholder, setSearchbarPlaceholder] = useState("search...");
  const [prevSearchbarValue, setPrevSearchbarValue] = useState("");
  const browserHistory = useHistory();
  const browserLocation = useLocation();
  const inputRef = React.createRef();

  const handleChange = (e) => {
    setSearchbarValue(e.target.value);
  };

  const changePlaceHolderText = (e) => {
    setSearchbarPlaceholder("to the dashboard!");
  };

  const resetPlaceHolderText = (e) => {
    setSearchbarPlaceholder("search...");
  };

  const submitSearch = (e) => {
    if (searchbarValue === "") return;

    if (e.key === "Enter" || !e.key) {
      if (
        browserLocation.pathname !== "/search" &&
        prevSearchbarValue !== searchbarValue
      ) {
        browserHistory.push("/search");
        setPrevSearchbarValue(searchbarValue);
      }
    }
  };

  return (
    <div
      {...props}
      className={`search-bar-container ${className}`}
      onKeyDown={submitSearch}
    >
      <div className="search-input-container">
        {/* <label className="search-input-label">search</label> */}
        <input
          className="search-input"
          type="text"
          placeholder={searchbarPlaceholder}
          onChange={handleChange}
          ref={inputRef}
        />
      </div>
      <CircleButton
        onClick={(e) => {
          setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
          }, 200);
          submitSearch(e);
        }}
        className="search-btn"
      >
        <SearchIcon />
      </CircleButton>
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchbarValue: state.ui.searchbarValue,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchbarValue: (uid) => dispatch(setSearchbarValue(uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
