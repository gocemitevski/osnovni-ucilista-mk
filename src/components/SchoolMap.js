import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import SchoolMapMarker from './SchoolMapMarker';

const SchoolMap = (props) => {

  return (
    <Map style={props.style} scrollWheelZoom={props.scrollWheelZoom} dragging={false} center={props.position} zoom={props.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <SchoolMapMarker {...props} />
    </Map>
  );
}

export default SchoolMap;
