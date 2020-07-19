import React from 'react';
import SchoolItemLink from './SchoolItemLink';

const Mail = (props) => {

  return (
    <li className="list-inline-item mt-2">
      <a className="btn btn-sm btn-success" href={`mailto:${props.props}`}>
        <i className="fa fa-fw fa-envelope mr-2"></i>
        <span>{props.props}</span>
      </a>
    </li>
  )
}

const SchoolItem = (props) => {

  const emails = props.data[5].split(/[\s|,|;]/);

  return (
    <article className="card mb-3" key={props.index}>
      <div className="row no-gutters">
        <div className="col-lg-6 p-4 d-flex">
          <h2 className="h5 mb-0 flex-fill">
            <SchoolItemLink {...props} data={props.data} setScroll={props.setScroll} setSchool={props.setSchool} setPosition={props.setPosition} />
          </h2>
        </div>
        <div className="col-lg-6">
          <div className="card-body">
            <dl className="mb-0">
              <dt>Адреса:</dt>
              <dd><address className="mb-0">{props.data[4]}<br />{props.data[2]}{props.data[7] && `, ${props.data[7]}`}</address></dd>
            </dl>
            {emails.length > 0 && <ul className="list-inline mb-0">{emails.map((item, key) => <Mail key={key} props={item} />)}</ul>}
          </div>
        </div>
      </div>
    </article>
  );
}

export default SchoolItem;
