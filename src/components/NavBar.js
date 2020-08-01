import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Link, useLocation } from 'react-router-dom';

const NavBar = (props) => {

  const location = useLocation();
  const pageLink = process.env.PUBLIC_URL + location.pathname;

  const [socialIconsData, setSocialIconsData] = useState([
    {
      "name": "facebook",
      "title": "Facebook",
      "href": "https://www.facebook.com/sharer.php?t=" + encodeURIComponent(document.title) + "&u=" + pageLink,
      "icon": "fa-facebook"
    },
    {
      "name": "twitter",
      "title": "Twitter",
      "href": "https://twitter.com/share?&text=" + encodeURIComponent(document.title) + "&url=" + pageLink,
      "icon": "fa-twitter"
    },
    {
      "name": "linkedin",
      "title": "LinkedIn",
      "href": "http://www.linkedin.com/shareArticle?mini=true&url=" + pageLink + "&title=" + encodeURIComponent(document.title),
      "icon": "fa-linkedin"
    },
  ]);

  useEffect(() => {
    setSocialIconsData(socialIconsData);
  }, [socialIconsData]);

  return (
    <nav className="navbar navbar-border-bottom navbar-expand-s flex-column flex-lg-row navbar-dark bg-dark">
      <Link className="navbar-brand d-flex flex-wrap flex-column flex-sm-row text-center align-items-center justify-content-center order-1 order-lg-0" to="/">
        <i className="fa fa-fw fa-chalkboard-teacher my-2 my-lg-auto"></i>
        <strong role="heading" className="ml-sm-3">{process.env.REACT_APP_TITLE}</strong>
      </Link>
      <Navigation className="order-3 order-lg-0" routes={props.routes} />
      {socialIconsData.length > 0 && <ul className="nav ml-lg-3 order-2 order-lg-0">
        {socialIconsData.map((item, key) => <li className="nav-item" key={key}>
          <a className="nav-link text-light" target="_blank" rel="noopener noreferrer" href={item.href}>
            <i className={`fab ${item.icon}`}><span className="sr-only">Сподели на „{item.title}“</span></i>
          </a>
        </li>)}
      </ul>}
    </nav>
  )
}

export default NavBar;
