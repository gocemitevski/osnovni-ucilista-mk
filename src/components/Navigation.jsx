import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const normalizePath = (path) => {
  const normalized = path.replace(/\/+$/, '');
  return normalized || '/';
};

const Navigation = (props) => {

  const { pathname } = useLocation();
  const currentPath = normalizePath(pathname);

  return (
    <ul className={`flex-shrink-0 text-center navbar-nav nav-pills main-menu ms-lg-auto ${props.className}`}>
      {props.routes.map((item, key) => {
        const isActive = currentPath === normalizePath(item.path);
        return <li key={key} className="nav-item"><NavLink end aria-current={isActive ? 'page' : undefined} className={() => `nav-link${isActive ? ' active' : ''}`} to={item.path}>{item.title}</NavLink></li>;
      })}
    </ul>
  )
}

export default Navigation;
