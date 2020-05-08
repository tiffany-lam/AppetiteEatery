import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

import "./map-container.styles.scss";

const mapStyles = {
  // width: "100%",
  // height: "100%",
  width: "auto",
  height: "auto",
  position: "relative",
};

const MapContainer = (props) => {
  console.log(latitude);
  console.log(longitude);
  <Map
    google={props.google}
    zoom={14}
    initialCenter={{
      lat: props.latitude,
      lng: props.longitude,
    }}
  />;
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCncSWOnXd8TIwZHyniG4NCiKdksztHRV0",
})(MapContainer);
