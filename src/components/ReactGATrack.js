import ReactGA from 'react-ga4';
import { Cookies } from "react-cookie-consent";

const ReactGATrack = (props) => {

    if (Cookies.get("osnovniUcilistaMK") === 'true') {
        ReactGA.set({ title: props.title });
        props.location && ReactGA.send({ hitType: "pageview", page: props.location.pathname + props.location.search, title: props.title });
    }
    return null;
}

export default ReactGATrack;
