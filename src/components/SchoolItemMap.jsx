import React from "react";
import SchoolMap from "./SchoolMap";
import Mail from "./Mail";
import NoMap from "./NoMap";

const SchoolItemMap = (props) => {
  const emails = props.data[5].split(/[\s|,|;]/);
  const { position } = props;

  return (
    <article className="card mb-3" id={props.index} key={props.index}>
      <div className="row no-gutters">
        <div
          style={{ minHeight: 400 }}
          className="col-lg-6 border-0 card-header p-0 d-flex flex-column align-items-center justify-content-center"
        >
          {position ? (
            <SchoolMap
              {...props}
              style={{ minHeight: "inherit" }}
              scrollWheelZoom={false}
              position={position}
              zoom={props.zoom}
            />
          ) : (
            <NoMap />
          )}
        </div>
        <div className="col-lg-6">
          <div className="card-body p-5 d-flex flex-column h-100">
            <h1 className="h2 mb-3 font-weight-bold card-title">
              {props.data[3]}
            </h1>
            <dl className="mb-0">
              <dt>Адреса:</dt>
              <dd>
                <address className="mb-0">
                  {props.data[4]}
                  <br />
                  {props.data[2]}
                </address>
              </dd>
            </dl>
            {emails.length > 0 && (
              <ul className="list-inline mb-0 mt-auto">
                {emails.map((item, key) => (
                  <Mail key={key} props={item} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default SchoolItemMap;
