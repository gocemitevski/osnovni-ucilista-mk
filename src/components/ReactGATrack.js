import ReactGA from 'react-ga';
import { Cookies } from "react-cookie-consent";

const ReactGATrack = (props) => {
  if (Cookies.get("osnovniUcilistaMK") === 'true') {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  return null;
}

export default ReactGATrack;
