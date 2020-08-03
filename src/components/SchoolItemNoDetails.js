import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cleanName, transliterate } from '../utils';

const SchoolItemNoDetails = (props) => {

  useEffect(() => {
    props.setScroll(props.scroll);
    window.scrollTo(props.scroll);
  }, [props]);

  return (
    <Link onClick={() => { props.setScroll(props.scroll); props.setSchool(props.data); props.setPosition(props.data[6]) }} to={`/uchilishte/${encodeURIComponent(cleanName(transliterate(props.data[3] + ' ' + props.data[2])).toLowerCase())}`}>
      <article key={props.index} className="d-flex align-items-center">
        <i className="text-muted fa fa-chalkboard-teacher mx-2"></i>
        <h3 className="h5 m-2">{props.data[3]}</h3>
      </article>
    </Link>
  );
}

export default SchoolItemNoDetails;
