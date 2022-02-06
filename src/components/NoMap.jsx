import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

const NoMap = (props) => {
  return (
    <FontAwesomeIcon className="text-muted" size="4x" icon={faMapMarkedAlt} />
  );
};

export default NoMap;
