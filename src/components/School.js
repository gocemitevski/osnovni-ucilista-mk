import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SchoolItemMap from './SchoolItemMap';
import { cleanName, transliterate, pageTitle } from '../utils';
import OneSchool from './OneSchool';
import SchoolItemNoDetails from './SchoolItemNoDetails';
import MunicipalityLink from './MunicipalityLink';
import ReactGATrack from './ReactGATrack';

const School = (props) => {

  let { schoolId } = useParams();

  const [scroll, setScroll] = useState({ top: 0, behavior: 'smooth' });

  const [school, setSchool] = useState(() => {
    const schoolResult = props.data.filter(el => el.some(item => cleanName(transliterate(item.toString() + ' ' + el[2].toString())).toLowerCase().includes(schoolId)));
    return schoolResult[0];
  });

  const [nearbySchools, setNearbySchools] = useState(() => {
    const nearbySchoolResults = props.data.filter(el => el.some(item => school && item.toString().toLowerCase().includes(school[2].toLowerCase())));
    return nearbySchoolResults;
  });

  const [position, setPosition] = useState(() => {
    return school && school[6] ? school[6] : null;
  });

  const [zoom, setZoom] = useState(() => {
    return school && school[6] ? 17 : 9;
  });

  useEffect(() => {
    setSchool(school);
  }, [school]);

  useEffect(() => {
    document.title = pageTitle(school[3]);
  }, [school]);

  useEffect(() => {
    setNearbySchools(nearbySchools);
  }, [nearbySchools]);

  useEffect(() => {
    setPosition(position);
  }, [position]);

  useEffect(() => {
    setZoom(zoom);
  }, [zoom]);

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  });

  return (
    <div className="main-bg page flex-fill">
      <main className="container py-5">
        <SchoolItemMap {...props} data={school} position={position} zoom={zoom} setScroll={setScroll} setSchool={setSchool} setPosition={setPosition} />
        {nearbySchools.length > 1 ?
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <h2 className="mt-5 mb-4 text-center">Други училишта во <MunicipalityLink {...props} municipality={school[2]} />{school[7] && `, `}{school[7] && <MunicipalityLink {...props} municipality={school[7]} />}
              </h2>
              <ul className="list-group">
                {nearbySchools.map((nearSchool, index) => school !== nearSchool && <li key={index} className="list-group-item"><SchoolItemNoDetails {...props} key={index} scroll={scroll} data={nearSchool} setScroll={setScroll} setSchool={setSchool} setPosition={setPosition} /></li>)}
              </ul>
            </div>
          </div> : <div className="my-5 row justify-content-center"><div className="col-lg-10"><OneSchool data={school} /></div></div>}
      </main>
      <ReactGATrack {...props} title={school[3]} />
    </div>
  );
}

export default School;
