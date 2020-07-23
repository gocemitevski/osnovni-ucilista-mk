import React from 'react';
import MunicipalityLink from './MunicipalityLink';

const OneSchool = (props) => {

  return (
    <aside className={`card ${props.className}`}>
      <div className="card-body d-flex align-items-center justify-content-center">
        <i className="text-muted far fa-3x fa-fw fa-sad-tear ml-4 mr-5"></i>
        <div className="d-flex flex-column">
          <h4 className="h5 card-title">
            <span role="heading">Во <MunicipalityLink {...props} municipality={props.data[2]} /> има само едно основно училиште</span>
          </h4>
          <p className="card-text">Очекуваме и се надеваме дека во иднина бројката на основни училишта во оваа општина значително ќе се зголеми.</p>
        </div>
      </div>
    </aside>
  );
}

export default OneSchool;
