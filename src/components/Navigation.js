import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {

  return (
    <ul className="flex-shrink-0 navbar-nav ml-auto">
      {props.routes.map((item, key) => item.path !== "/politika-za-privatnost" && <li key={key} className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to={item.path}>{item.title}</NavLink></li>)}
    </ul>
  )
}

export default Navigation;
