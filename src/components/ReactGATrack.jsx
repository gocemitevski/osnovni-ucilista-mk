import ReactGA from "react-ga";
import { Cookies } from "react-cookie-consent";

const ReactGATrack = (props) => {
  if (Cookies.get("osnovniUcilistaMK") === "true") {
    ReactGA.set({ title: props.title });
    props.location &&
      ReactGA.pageview(
        props.location.pathname + props.location.search,
        props.title
      );
  }
  return null;
};

export default ReactGATrack;
