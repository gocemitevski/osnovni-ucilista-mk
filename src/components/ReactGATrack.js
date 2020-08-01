import ReactGA from 'react-ga';
import { pageTitle } from '../utils';
import { Cookies } from "react-cookie-consent";

const ReactGATrack = (props) => {

  if (Cookies.get("osnovniUcilistaMK") === 'true') {
    ReactGA.set({ title: pageTitle(props.title) });
    props.location && ReactGA.pageview(props.location.pathname + props.location.search, props.title);
  }
  return null;
}

export default ReactGATrack;
