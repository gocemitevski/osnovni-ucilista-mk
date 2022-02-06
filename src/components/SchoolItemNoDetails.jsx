import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { cleanName, transliterate } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

const SchoolItemNoDetails = (props) => {
  useEffect(() => {
    window.scrollTo(props.scroll);
  }, [props]);

  return (
    <Link
      onClick={() => {
        props.setSchool(props.data);
        props.setPosition(props.data[6]);
      }}
      to={`/uchilishte/${encodeURIComponent(
        cleanName(
          transliterate(props.data[3] + " " + props.data[2])
        ).toLowerCase()
      )}`}
    >
      <article key={props.index} className="d-flex align-items-center">
        <FontAwesomeIcon
          className="mx-2 text-muted"
          icon={faChalkboardTeacher}
        />
        <h3 className="h5 m-2">{props.data[3]}</h3>
      </article>
    </Link>
  );
};

export default SchoolItemNoDetails;
