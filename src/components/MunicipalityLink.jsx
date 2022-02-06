import React from "react";
import { Link } from "react-router-dom";
import { cleanName, transliterate } from "../utils";

const MunicipalityLink = (props) => {
  return (
    props.municipality.length > 0 && (
      <Link
        className={props.className}
        to={`/opshtina/${encodeURIComponent(
          cleanName(transliterate(props.municipality)).toLowerCase()
        )}/`}
      >
        {props.municipality}
        {props.schoolCount && (
          <span className="badge badge-primary badge-pill">
            {props.schoolCount}
          </span>
        )}
      </Link>
    )
  );
};

export default MunicipalityLink;
