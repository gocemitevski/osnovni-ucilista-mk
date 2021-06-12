import React from 'react';
import { Link } from 'react-router-dom';
import { cleanName, transliterate } from '../utils';

const SchoolItemLink = (props) => {

  return (
    <Link className="stretched-link" to={`/uchilishte/${encodeURIComponent(cleanName(transliterate(props.data[3] + ' ' + props.data[2])).toLowerCase())}`}>{props.data[3]}</Link>
  );
}

export default SchoolItemLink;
