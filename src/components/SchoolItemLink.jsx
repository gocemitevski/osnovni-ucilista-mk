import React from 'react';
import { Link } from 'react-router-dom';
import { schoolSlug } from '../utils';

const SchoolItemLink = (props) => {

  return (
    <Link className="stretched-link" to={`/uchilishte/${encodeURIComponent(schoolSlug(props.data))}`}>{props.data[3]}</Link>
  );
}

export default SchoolItemLink;
