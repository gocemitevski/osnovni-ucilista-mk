import React from 'react';

const Card = (props) => {

  return (
    <div className={`card ${props.className || ''}`}>
      <div className="card-body text-muted">
        <span className={`value bg-${props.bgColor}`}>{props.value}</span>
        <span role="heading" aria-level="2" className="text-uppercase flex-grow-1 my-1">{props.title}</span>
      </div>
    </div>
  );
}

export default Card;
