import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Mail = (props) => {

  return (
    <li className="list-inline-item mt-2 d-flex align-items-center">
      <a className="btn btn-sm btn-success btn-truncate" title={props.props} href={`mailto:${props.props}`}>
        <FontAwesomeIcon fixedWidth className="me-2" icon={faEnvelope} />
        <span>{props.props}</span>
      </a>
    </li>
  );
}

export default Mail;
