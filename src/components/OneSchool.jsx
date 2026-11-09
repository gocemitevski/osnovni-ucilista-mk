import React from 'react';
import MunicipalityLink from './MunicipalityLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-regular-svg-icons'

const OneSchool = (props) => {

  return (
    <aside className={`card p-2 ${props.className}`}>
      <div className="card-body hstack gap-3">
        <FontAwesomeIcon className="text-muted" size="3x" icon={faSadTear} />
        <div className="vstack">
          <h2 className="h5 card-title">Во <MunicipalityLink {...props} municipality={props.data[2]} /> има само едно основно училиште</h2>
          <p className="card-text">Очекуваме и се надеваме дека во иднина бројката на основни училишта во оваа општина значително ќе се зголеми.</p>
        </div>
      </div>
    </aside>
  );
}

export default OneSchool;
