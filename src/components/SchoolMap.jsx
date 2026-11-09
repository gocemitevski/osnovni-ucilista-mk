import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import SchoolMapMarker from './SchoolMapMarker';

// MapContainer only applies center/zoom on mount, so keep the view in sync when
// the selected school changes within the same page.
const MapView = ({ position, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, zoom);
    }
  }, [map, position, zoom]);

  return null;
};

const SchoolMap = (props) => {

  return (
    <MapContainer style={props.style} scrollWheelZoom={props.scrollWheelZoom} dragging={false} center={props.position} zoom={props.zoom}>
      <MapView position={props.position} zoom={props.zoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <SchoolMapMarker {...props} />
    </MapContainer>
  );
}

export default SchoolMap;
