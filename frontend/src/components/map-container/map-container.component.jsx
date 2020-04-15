import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

import "./map-container.styles.scss";

const mapStyles = {
  // width: "100%",
  // height: "100%",
  width: "auto",
  height: "auto",
  position: "relative",
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        // style={mapStyles}
        initialCenter={{
          lat: 77.5011,
          lng: 27.2038,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyASg7sj5iZaDRYFn_PAs1k_xMvr7pskBfY",
})(MapContainer);
