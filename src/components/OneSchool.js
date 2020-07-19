import React, { useState, useEffect } from 'react';

const OneSchool = (props) => {

  const [municipality, setMunicipality] = useState(props.data[2]);

  useEffect(() => {
    setMunicipality(municipality);
  }, [municipality]);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <aside className="card my-4">
          <div className="card-body d-flex align-items-center justify-content-center">
            <i className="text-danger far fa-4x fa-fw fa-sad-tear ml-4 mr-5"></i>
            <div className="d-flex flex-column">
              <h2 className="h4 card-title">
                <span role="heading">Во <strong>{municipality}</strong> има само едно основно училиште</span>
              </h2>
              <p className="card-text">Очекуваме и се надеваме дека во иднина бројката на основни училишта во оваа општина значително ќе се зголеми.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default OneSchool;
