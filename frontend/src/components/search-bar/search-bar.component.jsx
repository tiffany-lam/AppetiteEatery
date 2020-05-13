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
import FormInput from "../form-input/form-input.component";

//import react-places-autocomplete
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
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
      if (browserLocation.pathname !== "/search") {
        browserHistory.push("/search");
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
          autoComplete="off"
          id="search-bar-value"
          className="search-input"
          type="search"
          placeholder="search..."
          onChange={handleChange}
          ref={inputRef}
        />

        {/* <hr className="vertical-divider" /> */}

        <label htmlFor="search-bar-filter" className="label-hide">
          filter
        </label>

        {/* <input
          id="autocomplete"
          className="search-input"
          type="search"
          placeholder="near..."
          // value = {query}
          onChange={(e) => {
            setSearchbarLocationFilter({query: e.target.value});
          }}
        /> */}
      </div>
      {/* <PlacesAutocomplete
        value={address1}
        onChange={setAddress1}
        onSelect={handleSelect}
        searchOptions={{
          componentRestrictions: { country: ["us"] },
          types: ["(cities)"],
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <React.Fragment>
            <div className="hello-2" htmlFor="fsdfds">
              <input
                id="search-input-5"
                className="search-input2"
                type="search"
                placeholder="near..."
                {...getInputProps()}
                autoComplete="off"
              />

              <div className="dropdown-anchor-2">
                <ul className="street-add-suggestion-dropdown-2">
                  {loading ? <div>Loading..</div> : null}

                  {suggestions.map((suggestion) => {
                    return (
                      <li
                        className="suggestion-item"
                        {...getSuggestionItemProps(suggestion)}
                      >
                        {suggestion.description.split(",")[0]}
                        {console.log(suggestion.description.split(",")[0])}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </React.Fragment>
        )}
      </PlacesAutocomplete> */}
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
