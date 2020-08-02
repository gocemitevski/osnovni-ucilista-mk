import React from 'react';

const Mail = (props) => {

  return (
    <li className="list-inline-item mt-2 d-flex align-items-center">
      <a className="btn-sm btn-success btn-truncate" title={props.props} href={`mailto:${props.props}`}>
        <i className="fa fa-fw fa-envelope mr-2"></i>
        <span>{props.props}</span>
      </a>
    </li>
  );
}

export default Mail;
