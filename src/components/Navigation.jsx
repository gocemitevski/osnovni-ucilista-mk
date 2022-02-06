import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {

  return (
    <ul className={`flex-shrink-0 text-center navbar-nav nav-pills main-menu ml-lg-auto ${props.className}`}>
      {props.routes.map((item, key) => <li key={key} className="nav-item"><NavLink exact className={({isActive}) => isActive ? `active nav-link` : `nav-link`} to={item.path}>{item.title}</NavLink></li>)}
    </ul>
  )
}

export default Navigation;
