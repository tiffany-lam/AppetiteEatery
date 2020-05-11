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

//import react-places-autocomplete
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
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
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinatates] = useState({lat: null, long: null});

  const [query, setQuery] = useState("");
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

  const handleSelect = (value) =>{
  
    // const placesResults = geocodeByAddress(value); //pass address string value
    
    // const latLong = getLatLng(placesResults[0]);
    // console.log("results", latLong);
    console.log(value);
    geocodeByAddress(value)
    .then(results =>  setCoordinatates(getLatLng(results[0])))
    .then(console.log('Success: lat and long: ', coordinates))
    .catch(error => console.error('Error', error));

    // //results is an array with different values in it, long,lat, geometry, city ect
    // //converts the string value using the google places api into placesResults
    // const placesResults = geocodeByAddress(value); //pass address string value
    // const latLong = getLatLng(placesResults[0]);
    // setCoordinatates(latLong);
    //set address to one they selected
    setAddress(value);

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
        {/* this is the input box for the googleplaces api */}
        <PlacesAutocomplete value={address}
         onChange={setAddress}
         onSelect={handleSelect}>
           {/* render prop function, these props are from the packageL react-places-autocomplete  */}
           {( {getInputProps, suggestions, getSuggestionItemProps, loading} ) =>
            <div>
               <input {...getInputProps({placeholder: "Near.."})}/>
               <div>
               {/* if loading then show loading; else show nothing */}
               {loading ? <div>Loading..</div>:null}
               {/* render the suggested values */}
               {suggestions.map((suggestion) => {
                 const selectedcolor ={
                   //customise which the selection from the react-autocomplete package
                   cursor: suggestion.active ? 'pointer' : "pointer"
                 };
                return (
                  //you can add styles into the prop that's being rendered using this method below
                  //this div render each suggestion, highlights the one that's active
                <div {...getSuggestionItemProps(suggestion, {selectedcolor, className})}>
                  {suggestion.description} 
                </div>
                );
               })}
              </div>
            </div>
             
           } 
        </PlacesAutocomplete>
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
