import React from 'react';
import { Link } from 'react-router-dom';
import { cleanName, singularPlural, transliterate } from '../utils';

const MunicipalityLink = (props) => {

  return (
    props.municipality.length > 0 && <Link className={props.className} to={`/opshtina/${encodeURIComponent(cleanName(transliterate(props.municipality)).toLowerCase())}/`}>{props.municipality}
      {props.schoolCount && <React.Fragment>
        <span className="visually-hidden">, {props.schoolCount} {singularPlural(props.schoolCount, 'училиште', 'училишта')}</span>
        <span aria-hidden="true" className="badge bg-primary rounded-pill">{props.schoolCount}</span>
      </React.Fragment>}
    </Link>
  );
}

export default MunicipalityLink;
