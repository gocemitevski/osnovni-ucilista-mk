import React, { useState, useEffect } from 'react';
import './App.scss';
import data from './data/data.json';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Index from './components/Index';
import School from './components/School';
import ReactGA from 'react-ga';
import NotFound from './components/NotFound';
import CookieConsent, { Cookies } from "react-cookie-consent";

function App() {

  const [title, setTitle] = useState((value) => {
    document.title = value;
  });

  const [scroll, setScroll] = useState({ top: 0, behavior: 'smooth' });

  const skopjeTitle = "Град Скопје";

  const routes = [
    {
      "path": "/",
      "title": "Почетна",
      "component": Dashboard,
      "exact": true
    },
    {
      "path": "/adresar",
      "title": "Адресар",
      "component": Index,
      "exact": false
    },
    {
      "path": "/za-izrabotkata",
      "title": "За изработката",
      "component": About,
      "exact": false
    }
  ];

  const [municipalities, setMunicipalities] = useState(data.records.map((school, index) => {
    return school[2];
  }));

  const [skopjeSchoolsCount, setSkopjeSchoolsCount] = useState(() => {
    return data.records.filter(el => el[7] && el[7].toString().includes(skopjeTitle)).length;
  });

  const [municipalitiesCount, setMunicipalitiesCount] = useState(() => {
    const schoolsPerMunicipality = [];
    municipalities.forEach(i => { schoolsPerMunicipality[i] = (schoolsPerMunicipality[i] || 0) + 1; });
    return schoolsPerMunicipality;
  });

  const [municipalitiesSort, setMunicipalitiesSort] = useState(() => {

    const sortedMunicipalities = [];

    for (var municipality in municipalitiesCount) {
      sortedMunicipalities.push([municipality, municipalitiesCount[municipality]]);
    }

    sortedMunicipalities.sort(function (a, b) {
      return a[1] - b[1];
    });

    return sortedMunicipalities;
  });

  useEffect(() => {
    setTitle(process.env.REACT_APP_TITLE);
  }, [title]);

  useEffect(() => {
    setScroll(scroll);
    window.scrollTo(scroll);
  }, [scroll]);

  useEffect(() => {
    setMunicipalities(() => {
      municipalities.push(skopjeTitle);
      return municipalities;
    });
  }, [municipalities]);

  useEffect(() => {
    setMunicipalitiesCount(municipalitiesCount);
  }, [municipalitiesCount]);

  useEffect(() => {
    setMunicipalitiesSort(municipalitiesSort);
  }, [municipalitiesSort]);

  useEffect(() => {
    setSkopjeSchoolsCount(skopjeSchoolsCount);
  }, [skopjeSchoolsCount]);

  return (
    <Router basename="/osnovni-ucilista-mk">
      <NavBar routes={routes} data={data.records} />
      <Switch>
        {routes.map((item, key) => <Route key={key} exact={item.exact} path={item.path} render={(props) => <item.component {...props} scroll={scroll} setScroll={setScroll} title={item.title} setTitle={setTitle} data={data.records} municipalitiesSort={municipalitiesSort} skopjeTitle={skopjeTitle} skopjeSchoolsCount={skopjeSchoolsCount} />} />)}
        <Route exact path={`/uchilishte/:schoolId`} render={(props) => <School {...props} scroll={scroll} setScroll={setScroll} data={data.records} skopjeTitle={skopjeTitle} />} />
        <Route exact path={`/opshtina/:municipalityId`} render={(props) => <Dashboard {...props} scroll={scroll} setScroll={setScroll} data={data.records} municipalitiesSort={municipalitiesSort} skopjeTitle={skopjeTitle} skopjeSchoolsCount={skopjeSchoolsCount} />} />
        <Route path="*" render={props => <NotFound {...props} title="Грешка 404" setTitle={setTitle} />} />
      </Switch>
      <nav className="navbar navbar-border-top navbar-footer text-muted">
        <ul className="nav flex-fill mb-0">
          <li className="nav-item d-flex flex-wrap align-items-center">
            <span>Извор на основни податоци:</span>
            <a className="nav-link" target="_blank" rel="noopener noreferrer" href="http://data.gov.mk/mk/dataset/pernctap-ha-ochobhn-yhnjinwta">data.gov.mk</a>
          </li>
          <li className="nav-item ml-auto flex-wrap d-flex align-items-center">
            Изработка на компјутерска презентација: <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://gocemitevski.com/">Гоце Митевски</a>
          </li>
        </ul>
      </nav>
      <CookieConsent
        location="bottom"
        buttonText="Во ред"
        enableDeclineButton={true}
        declineButtonText="Не, благодарам"
        cookieName="osnovniUcilistaMK"
        containerClasses="fixed-bottom bg-warning d-flex flex-wrap justify-content-between align-content-center p-3"
        contentClasses="d-inline-flex my-auto py-2"
        buttonClasses="btn btn-success"
        declineButtonClasses="btn btn-danger ml-2"
        disableStyles={true}
        flipButtons={true}>
        Ова мрежно место користи т.н. колачиња за подобрување на корисничкото искуство. Изберете „Во ред“ или „Не, благодарам“ за да го скриете ова предупредување.
      </CookieConsent>
    </Router>
  );
}

export default App;
