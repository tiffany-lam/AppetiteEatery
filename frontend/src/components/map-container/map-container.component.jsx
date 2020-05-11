import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

import "./map-container.styles.scss";

const mapStyles = {
  width: "auto",
  height: "auto",
  position: "relative",
};

const MapContainer = (props) => {
  return (
    <Map
      google={props.google}
      zoom={14}
      initialCenter={{
        lat: props.latitude,
        lng: props.longitude,
      }}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
