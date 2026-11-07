import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer } from 'react-leaflet';
import SchoolMapMarker from './SchoolMapMarker';
import SchoolItem from './SchoolItem';
import SelectMunicipality from './SelectMunicipality';
import { cleanName, transliterate, pageTitle, pageDescription, setPageMeta, singularPlural } from '../utils';
import MunicipalityLink from './MunicipalityLink';
import OneSchool from './OneSchool';
import Card from './Card';
import CardHeader from './CardHeader';
import { socialLinkButtons } from '../utils';
import ReactGATrack from './ReactGATrack';
import NotFound from './NotFound';
import { faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'

const filterMunicipalitySchools = (data, municipalityId) => {
  return municipalityId ? data.filter(el =>
    (cleanName(transliterate(el[2].toString().toLowerCase())) === municipalityId) || (el[7] && cleanName(transliterate(el[7].toString().toLowerCase())) === municipalityId)
  ) : data;
};

const Dashboard = (props) => {

  let { municipalityId } = useParams();

  const { setSocialIconLinks, scroll } = props;

  const [municipalitySchools, setMunicipalitySchools] = useState(() => {
    return filterMunicipalitySchools(props.data, municipalityId);
  });

  const [position, setPosition] = useState(() => {
    const lat = parseFloat(new URLSearchParams(document.location.search).get('lat'));
    const lon = parseFloat(new URLSearchParams(document.location.search).get('lon'));
    return (lat && lon) ? [lat, lon] : [41.6175, 21.7447];
  });

  const [zoom, setZoom] = useState(() => {
    return position ? 18 : 9;
  });

  const [selectedMunicipality, setSelectedMunicipality] = useState(() => municipalityId || 0);

  const [mostSchools, setMostSchools] = useState(() => props.municipalitiesSort);

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
    if (!municipalityId) {
      setPageMeta(props.title, pageDescription('адресарот на сите основни училишта во Р. С. Македонија'));
    } else if (municipalityId === 'grad-skopje') {
      setPageMeta(props.skopjeTitle, pageDescription('основните училишта во Град Скопје'));
    } else if (municipalitySchools[0]) {
      setPageMeta(municipalitySchools[0][2], pageDescription('основните училишта во општина ' + municipalitySchools[0][2]));
    }
  }, [props, municipalitySchools, municipalityId]);

  useEffect(() => {
    window.scrollTo(scroll);
  }, [scroll]);

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

  useEffect(() => {
    setSocialIconLinks(() => socialLinkButtons());
  }, [setSocialIconLinks]);

  // Keep state in sync when the :municipalityId route param changes
  // (browser back/forward, direct URL edits). useState initializers only run on mount.
  useEffect(() => {
    setMunicipalitySchools(filterMunicipalitySchools(props.data, municipalityId));
    setSelectedMunicipality(municipalityId || 0);
  }, [municipalityId, props.data]);

  // Only feed valid marker positions to Leaflet; an empty/invalid bounds array throws
  // "Bounds are not valid." inside fitBounds.
  const mapPositions = municipalitySchools
    .filter(school => Array.isArray(school[6]) && school[6].length >= 2)
    .map(school => school[6]);

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetinaUrl,
    iconUrl: iconUrl,
    shadowUrl: shadowUrl
  });

  // Unknown municipality slug -> render the 404 page instead of crashing
  if (municipalityId && municipalitySchools.length === 0) {
    return <NotFound title="Грешка 404" setSocialIconLinks={setSocialIconLinks} />;
  }

  return (
    <main id="main-content" tabIndex={-1} className="row no-gutters flex-fill main-bg main-bg-wrap">
      <div className="col-lg-6 bg-info d-flex flex-column h-100" role={props.pageWidth > 767 ? 'region' : undefined} aria-label={props.pageWidth > 767 ? 'Карта на училиштата' : undefined}>
        {props.pageWidth > 767 && <Map scrollWheelZoom={false} bounds={mapPositions.length ? mapPositions : undefined} center={position} zoom={zoom} boundsOptions={municipalityId ? { padding: [70, 70] } : {}}>
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
          {(municipalityId && municipalitySchools.length > 0) && municipalitySchools.map((school, key) => <SchoolItem key={key} data={school} />)}
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
                  <CardHeader icon={faSortAmountUp} heading="Општини со најмногу основни училишта" />
                  <div className="list-group list-group-flush border-top-0">
                    <MunicipalityLink className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" {...props} municipality={props.skopjeTitle} schoolCount={props.skopjeSchoolsCount} />
                    {Object.values(mostSchools.map((municipality, index) => municipality[1] >= 8 && <MunicipalityLink className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" key={index} {...props} municipality={municipality[0]} schoolCount={municipality[1]} />)).reverse()}
                  </div>
                </div>
                <div className="card ml-sm-3">
                  <CardHeader icon={faSortAmountDown} heading="Општини со најмалку основни училишта" />
                  <div className="list-group list-group-flush border-top-0">
                    {Object.values(mostSchools.map((municipality, index) => municipality[1] === 1 && <MunicipalityLink className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" key={index} {...props} municipality={municipality[0]} schoolCount={municipality[1]} />))}
                  </div>
                </div>
              </div>
            </React.Fragment>
          }
        </div>
        {municipalitySchools.length === 1 && municipalitySchools.map((school, key) => <div className="m-3" key={key}><OneSchool {...props} className="card-one-school" data={school} /></div>)}
      </div>
      <ReactGATrack location={props.location} title={municipalityId ? municipalityId === 'grad-skopje' ? pageTitle(props.skopjeTitle) : pageTitle(municipalitySchools[0] && municipalitySchools[0][2]) : pageTitle(props.title)} />
    </main>
  );
}

export default Dashboard;
