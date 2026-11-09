import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga4';
import { Cookies } from "react-cookie-consent";

if (Cookies.get("osnovniUcilistaMK") === 'true') {
  ReactGA.initialize(process.env.REACT_APP_GA, { debug: false, gaOptions: { cookieDomain: "gocemitevski.github.io" } });
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
