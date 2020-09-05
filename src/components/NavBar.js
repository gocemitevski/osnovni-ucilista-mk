import React from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

const NavBar = (props) => {

  return (
    <nav className="navbar position-sticky sticky-top navbar-border-bottom navbar-expand-s flex-column flex-lg-row navbar-dark bg-dark">
      <Link className="navbar-brand d-flex flex-wrap flex-column flex-sm-row text-center align-items-center justify-content-center order-1 order-lg-0" to="/">
        <i className="fa fa-fw fa-chalkboard-teacher my-2 my-lg-auto"></i>
        <strong role="heading" className="ml-sm-3">{process.env.REACT_APP_TITLE}</strong>
      </Link>
      <Navigation className="order-3 order-lg-0" routes={props.routes} />
      {props.socialIconLinks.length > 0 && <ul className="nav ml-lg-3 order-2 order-lg-0">
        {props.socialIconLinks.map((item, key) => <li className="nav-item" key={key}>
          <a className="nav-link text-light" target="_blank" rel="noopener noreferrer" href={item.href}>
            <i className={`fab ${item.icon}`}><span className="sr-only">Сподели на „{item.title}“</span></i>
          </a>
        </li>)}
      </ul>}
    </nav>
  )
}

export default NavBar;
