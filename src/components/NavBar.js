import React from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <i className="fa fa-fw fa-chalkboard-teacher mr-3"></i>
        <strong role="heading">{process.env.REACT_APP_TITLE}</strong>
      </Link>
      <Navigation routes={props.routes} />
    </nav>
  )
}

export default NavBar;
