import React from 'react';
import { Link } from 'react-router-dom';
import { cleanName, transliterate } from '../utils';

const SchoolItemLink = (props) => {

  return (
    <Link className="stretched-link" onClick={() => { props.setSchool && props.setSchool(props.data); props.setPosition && props.setPosition(props.data[6]) }} to={`/uchilishte/${encodeURIComponent(cleanName(transliterate(props.data[3] + ' ' + props.data[2])).toLowerCase())}`}>{props.data[3]}</Link>
  );
}

export default SchoolItemLink;
