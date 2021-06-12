import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CardHeader = (props) => {

  return (
    <div className="card-header text-muted">
      <FontAwesomeIcon className="mr-4" size="2x" icon={props.icon} />
      <span role="heading" className="text-uppercase flex-grow-1">{props.heading}</span>
    </div>
  );
}

export default CardHeader;
