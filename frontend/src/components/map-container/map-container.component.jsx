/*
  Contributors: Julie Do 014101748
  Course: CECS 470

  Description: This class renders a map component based on google's map API's. This is done 
  through an imported package called google-maps-react. It renders a map on a specific location 
  with desired markers as passed in. 
*/

// IMPORT MAIN PACKAGES
import React, { useState, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

// Functional Component MapContainer
const MapContainer = (props) => {
  // This function returns a map container displaying a google map of the desired location with
  // the desired markers on the map.
  return (
    // Map Component
    <Map
      className={props.className ? props.className : null}
      google={props.google}
      zoom={14}
      initialCenter={{
        lat: props.latitude,
        lng: props.longitude,
      }}
    >
      {/* If the user passes in marker information, the component renders the markers as desired. */}
      {props.markers
        ? props.markers.map((marker, index) => {
            return (
              <Marker
                title={marker.title}
                name={marker.name}
                position={{ lat: marker.lat, lng: marker.lng }}
              ></Marker>
            );
          })
        : null}
    </Map>
  );
};

// This is a higher level component wrapper that appends the api key to the Map Container.
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
