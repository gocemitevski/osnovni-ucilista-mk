import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import SchoolItemMap from './SchoolItemMap';
import { cleanName, transliterate, pageTitle } from '../utils';
import OneSchool from './OneSchool';
import SchoolItemNoDetails from './SchoolItemNoDetails';
import MunicipalityLink from './MunicipalityLink';
import { socialLinkButtons } from '../utils';
import ReactGATrack from './ReactGATrack';

const School = (props) => {

  let { schoolId } = useParams();

  const { setSocialIconLinks, scroll } = props;

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

  useEffect(() => {
    window.scrollTo(scroll);
  }, [scroll]);

  useEffect(() => {
    setSocialIconLinks(() => socialLinkButtons());
  }, [school, setSocialIconLinks]);

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetinaUrl,
    iconUrl: iconUrl,
    shadowUrl: shadowUrl
  });

  return (
    <div className="main-bg page flex-fill">
      <main className="container py-5">
        <SchoolItemMap data={school} position={position} zoom={zoom} setSchool={setSchool} setPosition={setPosition} />
        {nearbySchools.length > 1 ?
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <h2 className="mt-5 mb-4 text-center">Други училишта во <MunicipalityLink municipality={school[2]} />{school[7] && `, `}{school[7] && <MunicipalityLink municipality={school[7]} />}
              </h2>
              <ul className="list-group">
                {nearbySchools.map((nearSchool, index) => school !== nearSchool && <li key={index} className="list-group-item"><SchoolItemNoDetails {...props} key={index} scroll={scroll} data={nearSchool} setSchool={setSchool} setPosition={setPosition} /></li>)}
              </ul>
            </div>
          </div> : <div className="my-5 row justify-content-center"><div className="col-lg-10"><OneSchool data={school} /></div></div>}
      </main>
      <ReactGATrack location={props.location} title={pageTitle(school[3])} />
    </div>
  );
}

export default School;
