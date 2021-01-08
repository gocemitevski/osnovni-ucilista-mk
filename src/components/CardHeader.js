import React from 'react';

const CardHeader = (props) => {

  return (
    <div className="card-header text-muted">
      <i className={`fa-2x fas ${props.icon} mr-4`}></i>
      <span role="heading" aria-level="1" className="text-uppercase flex-grow-1">{props.heading}</span>
    </div>
  );
}

export default CardHeader;
