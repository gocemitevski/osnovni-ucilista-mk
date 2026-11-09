import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import SchoolItemLink from './SchoolItemLink';

const SchoolMapMarker = (props) => {

  // Leaflet's markers are keyboard-focusable by default. Give each one a
  // meaningful name, and let callers opt out of the tab order when an
  // equivalent list of links is already available (the dashboard map).
  const label = `${props.data[3]}, ${props.data[2]}`;
  const { keyboard = true } = props;

  return (
    <Marker position={props.position} keyboard={keyboard} alt={label} title={props.data[3]}>
      <Popup>
        <h5><SchoolItemLink {...props} /></h5>
        <address>{props.data[4]}, {props.data[2]}</address>
      </Popup>
    </Marker>
  );
}

export default SchoolMapMarker;
