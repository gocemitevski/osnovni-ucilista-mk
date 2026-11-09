import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'

const NoMap = (props) => {

  return (
    <React.Fragment>
      <FontAwesomeIcon className="text-muted" size="4x" icon={faMapMarkedAlt} />
      <span className="visually-hidden">Нема достапна карта за ова училиште.</span>
    </React.Fragment>
  );
}

export default NoMap;
