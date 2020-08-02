import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer } from 'react-leaflet';
import SchoolMapMarker from './SchoolMapMarker';
import SchoolItem from './SchoolItem';
import SelectMunicipality from './SelectMunicipality';
import { cleanName, transliterate, pageTitle, singularPlural } from '../utils';
import MunicipalityLink from './MunicipalityLink';
import OneSchool from './OneSchool';
import ReactGATrack from './ReactGATrack';
import Card from './Card';
import CardHeader from './CardHeader';

const Dashboard = (props) => {

  let { municipalityId } = useParams();

  const [municipalitySchools, setMunicipalitySchools] = useState(() => {
    return municipalityId ? props.data.filter(el =>
      (cleanName(transliterate(el[2].toString().toLowerCase())) === municipalityId) || (el[7] && cleanName(transliterate(el[7].toString().toLowerCase())) === municipalityId)
    ) : props.data;
  });

  const [position, setPosition] = useState(() => {
    const lat = parseFloat(new URLSearchParams(document.location.search).get('lat'));
    const lon = parseFloat(new URLSearchParams(document.location.search).get('lon'));
    return (lat && lon) ? [lat, lon] : [41.6175, 21.7447];
  });

  const [zoom, setZoom] = useState(() => {
    return position ? 18 : 9;
  });

  const [selectedMunicipality, setSelectedMunicipality] = useState(municipalityId || 0);

  const [mostSchools, setMostSchools] = useState(props.municipalitiesSort);

  const [singleSchoolMunicipalities, setSingleSchoolMunicipalities] = useState(() => {
    const singleSchoolMunicipalitiesTotal = [];
    mostSchools.map(item => { return item[1] === 1 && singleSchoolMunicipalitiesTotal.push(item); });

    return singleSchoolMunicipalitiesTotal;
  });

  const [tenUpSchoolMunicipalities, setTenUpSchoolMunicipalities] = useState(() => {
    const tenUpSchoolMunicipalitiesTotal = [];
    mostSchools.map(item => { return item[1] > 10 && tenUpSchoolMunicipalitiesTotal.push(item) });

    return tenUpSchoolMunicipalitiesTotal;
  });

  useEffect(() => {
    document.title = municipalityId ? municipalityId === 'grad-skopje' ? pageTitle(props.skopjeTitle) : pageTitle(municipalitySchools[0][2]) : pageTitle(props.title);
  }, [props, municipalitySchools, municipalityId]);

  useEffect(() => {
    props.setScroll(props.scroll);
    window.scrollTo(props.scroll);
  }, [props]);

  useEffect(() => {
    setPosition(position);
  }, [position]);

  useEffect(() => {
    setZoom(zoom);
  }, [zoom]);

  useEffect(() => {
    setMunicipalitySchools(municipalitySchools);
  }, [municipalitySchools]);

  useEffect(() => {
    setSelectedMunicipality(selectedMunicipality);
  }, [selectedMunicipality]);

  useEffect(() => {
    setMostSchools(mostSchools);
  }, [mostSchools]);

  useEffect(() => {
    setSingleSchoolMunicipalities(singleSchoolMunicipalities);
  }, [singleSchoolMunicipalities]);

  useEffect(() => {
    setTenUpSchoolMunicipalities(tenUpSchoolMunicipalities);
  }, [tenUpSchoolMunicipalities]);

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  });

  return (
    <main className="row no-gutters flex-fill main-bg main-bg-wrap">
      <div className="col-lg-6 bg-info d-flex flex-column h-100">
        {props.pageWidth > 767 && <Map scrollWheelZoom={false} bounds={[municipalitySchools.map((school, key) => { return school[6] })]} boundsOptions={municipalityId ? { padding: [70, 70] } : {}}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {municipalitySchools.map((school, key) => {
            return (
              school[6] && <SchoolMapMarker {...props} key={key} position={school[6]} data={school} />
            )
          })}
        </Map>}
      </div>
      <div className="col-lg-6 d-flex flex-column h-100">
        <h1 className="sr-only">Основни училишта</h1>
        <div className="bg-neutral p-3">
          <div className="row no-gutters">
            <div className={municipalityId ? `col-lg-6` : `col-lg-12`}>
              <div className={municipalityId && `mb-3 mb-lg-auto`}>
                <SelectMunicipality {...props} setMunicipalitySchools={setMunicipalitySchools} setSelectedMunicipality={setSelectedMunicipality} municipalities={props.municipalitiesSort} />
              </div>
            </div>
            {municipalityId &&
              <div className="col-lg-6 d-flex flex-column">
                <div className="d-flex ml-lg-3 px-3 py-2 align-items-center bg-muted text-light rounded h-100">
                  <strong className="mr-2">
                    {municipalitySchools.length}
                  </strong>
                  <small>{singularPlural(municipalitySchools.length, "основно училиште", "основни училишта")}</small>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="px-3 flex-fill results">
          {(municipalityId && municipalitySchools.length > 0) && municipalitySchools.map((school, key) => <SchoolItem key={key} setScroll={props.setScroll(props.scroll)} data={school} />)}
          {
            !municipalityId &&
            <React.Fragment>
              <div className="card-group">
                <Card title="основни училишта во сите општини во Р. С. Македонија" bgColor="success" value={municipalitySchools.length} />
                <Card title="основни училишта во просек, по општина" className="ml-sm-3" bgColor="warning" value={Math.round(municipalitySchools.length / (props.municipalitiesSort.length + 1))} />
              </div>
              <div className="card-group">
                <Card title="општини со повеќе од десет основни училишта" bgColor="alert" value={`${Math.round(tenUpSchoolMunicipalities.length / (props.municipalitiesSort.length + 1) * 100)}%`} />
                <Card title="општини со само едно основно училиште" className="ml-sm-3" bgColor="danger" value={`${Math.round(singleSchoolMunicipalities.length / (props.municipalitiesSort.length + 1) * 100)}%`} />
              </div>
              <div className="card-group">
                <div className="card">
                  <CardHeader icon="fa-sort-amount-up" heading="Општини со најмногу основни училишта" />
                  <div className="list-group list-group-flush border-top-0">
                    <MunicipalityLink className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" {...props} municipality={props.skopjeTitle} schoolCount={props.skopjeSchoolsCount} />
                    {Object.values(mostSchools.map((municipality, index) => municipality[1] >= 8 && <MunicipalityLink className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" key={index} {...props} municipality={municipality[0]} schoolCount={municipality[1]} />)).reverse()}
                  </div>
                </div>
                <div className="card ml-sm-3">
                  <CardHeader icon="fa-sort-amount-down" heading="Општини со најмалку основни училишта" />
                  <div className="list-group list-group-flush border-top-0">
                    {Object.values(mostSchools.map((municipality, index) => municipality[1] === 1 && <MunicipalityLink className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" key={index} {...props} municipality={municipality[0]} schoolCount={municipality[1]} />))}
                  </div>
                </div>
              </div>
            </React.Fragment>
          }
        </div>
        {municipalitySchools.length === 1 && municipalitySchools.map((school, key) => <div className="m-3"><OneSchool key={key} {...props} className="card-one-school" data={school} /></div>)}
      </div>
      <ReactGATrack {...props} title={municipalityId ? municipalityId === 'grad-skopje' ? pageTitle(props.skopjeTitle) : pageTitle(municipalitySchools[0][2]) : pageTitle(props.title)} />
    </main>
  );
}

export default Dashboard;
