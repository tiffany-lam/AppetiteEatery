import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  setSearchbarValue,
  setSearchbarLocationFilter,
} from "../../redux/ui/ui.actions";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Script from "react-load-script";
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
  autocomplete,
  setSearchbarValue,
  setSearchbarLocationFilter,
  location,
  className = "",
  ...props
}) => {
  // const [searchbarPlaceholder, setSearchbarPlaceholder] = useState("search...");
  const [prevSearchbarValue, setPrevSearchbarValue] = useState("");
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const browserHistory = useHistory();
  const browserLocation = useLocation();
  const inputRef = React.createRef();

  useEffect(()=>{
    
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_PLACES_API_KEY + "&libraries=places";
    //console.log(script.src);
    script.async = true;
    document.body.appendChild(script);
    //handleScriptLoad();

  })
  
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
  const handleScriptLoad = () =>{
    //declare for autocomple
    const options = {types: ['(cities)']};
    //initialize google autocomple
    /*global google*/
    var autocomplete = new window.google.map.places.Autocomplete(
      document.getElementById('autocomplete'),
      {}
    );
    //restrict number of places that are returned 
    autocomplete.setFields(['address_components'], ['formatted_address']);
    //fire the event when the user types a place that is in the api
    autocomplete.addListener('places_changed', handlePlaceSelect);
  };
  const handlePlaceSelect = () =>{
    const addressObject = autocomplete.getPlace();
    const address = addressObject.address_components;
    //check if address is valid
    if(address){
      setCity(address[0].long_name);
      setQuery(addressObject.formatted_address);
      
    }
  }

  return (
    <div
    
      {...props}
      className={`search-bar-container ${className}`}
      onKeyDown={submitSearch}
    >
      <div className="search-input-container">
        
        {/* <Script url = {"https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_PLACES_API_KEY + "&libraries=places"} onLoad={handleScriptLoad}/>
        {console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)} */}
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
          id="autocomplete"
          className="search-input"
          type="search"
          placeholder="near..."
          // value = {query}
          onChange={(e) => {
            setSearchbarLocationFilter({query: e.target.value});
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
