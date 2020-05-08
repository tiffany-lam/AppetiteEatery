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

const MapContainer = ({ latitude, longitude, ...props }) => {
  console.log(Number(latitude));
  console.log(Number(longitude));
  // const lati = -34.95;
  // const longi = 138.55;
  const lati = latitude;
  const longi = longitude;
  const center = {
    lat: latitude,
    lng: longitude,
  };
  return (
    <Map
      google={props.google}
      zoom={14}
      // style={mapStyles}
      initialCenter={center}
      // center={{
      //   // lat: 71,
      //   // lng: 71,
      //   lat: lati,
      //   lng: longi,
      // }}
      // initialCenter={{
      //   lat: latitude,
      //   lng: longitude,
      //   // lat: latitude,
      //   // lng: longitude,
      // }}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCncSWOnXd8TIwZHyniG4NCiKdksztHRV0",
})(MapContainer);
