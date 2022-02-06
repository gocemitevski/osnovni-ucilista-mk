import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import SchoolMapMarker from "./SchoolMapMarker";

const SchoolMap = (props) => {
  return (
    <MapContainer
      style={props.style}
      scrollWheelZoom={props.scrollWheelZoom}
      dragging={false}
      center={props.position}
      zoom={props.zoom}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <SchoolMapMarker {...props} />
    </MapContainer>
  );
};

export default SchoolMap;
