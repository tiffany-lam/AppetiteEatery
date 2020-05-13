import React, { useState, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

import "./map-container.styles.scss";

const mapStyles = {
  width: "auto",
  height: "auto",
  position: "relative",
};

const MapContainer = (props) => {
  return (
    <Map
      className={props.className ? props.className : null}
      google={props.google}
      zoom={14}
      initialCenter={{
        lat: props.latitude,
        lng: props.longitude,
      }}
    >
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

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
