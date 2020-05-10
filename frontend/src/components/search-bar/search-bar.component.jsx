import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  setSearchbarValue,
  setSearchbarLocationFilter,
} from "../../redux/ui/ui.actions";
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
  searchbarFilter,
  setSearchbarValue,
  setSearchbarLocationFilter,
  location,
  className = "",
  ...props
}) => {
  // const [searchbarPlaceholder, setSearchbarPlaceholder] = useState("search...");
  const [prevSearchbarValue, setPrevSearchbarValue] = useState("");
  const browserHistory = useHistory();
  const browserLocation = useLocation();
  const inputRef = React.createRef();

  const handleChange = (e) => {
    setSearchbarValue(e.target.value);
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
        <label htmlFor="search-bar-value" className="label-hide">
          search
        </label>
        <input
          id="search-bar-value"
          className="search-input"
          type="search"
          placeholder="search..."
          onChange={(e) => {
            setSearchbarValue(e.target.value);
          }}
          ref={inputRef}
        />

        <hr className="vertical-divider" />

        <label htmlFor="search-bar-filter" className="label-hide">
          filter
        </label>
        <input
          id="search-bar-filter"
          className="search-input"
          type="search"
          placeholder="near..."
          onChange={(e) => {
            setSearchbarLocationFilter(e.target.value);
          }}
        />
      </div>
      <CircleButton
        onMouseDown={(e) => {
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
  searchbarFilter: state.ui.searchbarFilter,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchbarValue: (value) => dispatch(setSearchbarValue(value)),
  setSearchbarLocationFilter: (value) =>
    dispatch(setSearchbarLocationFilter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
