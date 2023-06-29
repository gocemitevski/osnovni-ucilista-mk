import React, { useState, useEffect, useLayoutEffect } from 'react';
import './App.scss';
import data from './data/data.json';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Index from './components/Index';
import School from './components/School';
import NotFound from './components/NotFound';
import CookieConsent from "react-cookie-consent";
import { socialLinkButtons } from './utils';
// import { cleanName, transliterate } from './utils';

function App() {

  const [title, setTitle] = useState((value) => {
    document.title = value;
  });

  const [scroll, setScroll] = useState({ top: 0, behavior: 'smooth' });

  const [pageWidth, setPageWidth] = useState(0);

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

  // const [sitemap, setSitemap] = useState(() => {
  //   const homepage = `https://gocemitevski.github.io/osnovni-ucilista-mk/#`;
  //   const sitemap = data.records.map(item => `${homepage}/uchilishte/${encodeURIComponent(cleanName(transliterate(item[3] + ' ' + item[2])).toLowerCase())}`);
  //   sitemap.push(`${homepage}/opshtina/${encodeURIComponent(cleanName(transliterate(skopjeTitle)).toLowerCase())}/`);
  //   municipalitiesSort.map(item => sitemap.push(`${homepage}/opshtina/${encodeURIComponent(cleanName(transliterate(item[0])).toLowerCase())}`));
  //   return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap.map(el => `<url><loc>${el}</loc></url>`).join('')}</urlset>`;
  // });

  const [socialIconLinks, setSocialIconLinks] = useState([]);

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

  useLayoutEffect(() => {
    function updateSize() {
      setPageWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useLayoutEffect(() => {
    setSocialIconLinks(() => socialLinkButtons());
  }, []);

  // useEffect(() => {
  //   console.log(sitemap);
  // }, [sitemap]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <NavBar routes={routes} data={data.records} socialIconLinks={socialIconLinks} />
      <Switch>
        {routes.map((item, key) => <Route key={key} exact={item.exact} path={item.path} render={(props) => <item.component {...props} scroll={scroll} title={item.title} data={data.records} municipalitiesSort={municipalitiesSort} pageWidth={pageWidth} skopjeTitle={skopjeTitle} skopjeSchoolsCount={skopjeSchoolsCount} setSocialIconLinks={setSocialIconLinks} />} />)}
        <Route exact path={`/uchilishte/:schoolId`} render={(props) => <School {...props} scroll={scroll} data={data.records} skopjeTitle={skopjeTitle} setSocialIconLinks={setSocialIconLinks} />} />
        <Route exact path={`/opshtina/:municipalityId`} render={(props) => <Dashboard {...props} scroll={scroll} data={data.records} municipalitiesSort={municipalitiesSort} skopjeTitle={skopjeTitle} skopjeSchoolsCount={skopjeSchoolsCount} pageWidth={pageWidth} setSocialIconLinks={setSocialIconLinks} />} />
        <Route path="*" render={props => <NotFound {...props} title="Грешка 404" setSocialIconLinks={setSocialIconLinks} />} />
      </Switch>
      <nav className="navbar navbar-border-top flex-column flex-sm-row navbar-footer">
        <div className="d-flex flex-wrap align-items-center flex-fill justify-content-center justify-content-lg-start mb-2 mb-md-0">
          <span className="mr-2">Извор на основни податоци:</span>
          <a target="_blank" rel="noopener noreferrer" href="http://data.gov.mk/mk/dataset/pernctap-ha-ochobhn-yhnjinwta">data.gov.mk</a>
        </div>
        <div className="d-flex flex-wrap align-items-center flex-fill justify-content-center justify-content-lg-end">
          <span className="mr-2">Изработка на компјутерска презентација:</span>
          <a target="_blank" rel="noopener noreferrer" href="https://gocemitevski.com/">Гоце Митевски</a>
        </div>
      </nav>
      <CookieConsent
        location="bottom"
        buttonText="Во ред"
        enableDeclineButton={true}
        declineButtonText="Не, благодарам"
        cookieName="osnovniUcilistaMK"
        containerClasses="fixed-bottom bg-dark text-light d-flex flex-wrap justify-content-between align-content-center p-3"
        contentClasses="d-inline-flex my-auto py-2"
        buttonClasses="btn btn-light"
        declineButtonClasses="btn btn-outline-light ml-2"
        disableStyles={true}
        flipButtons={true}>
        Ова мрежно место користи т.н. колачиња за подобрување на корисничкото искуство. Изберете „Во ред“ или „Не, благодарам“ за да го скриете ова предупредување.
      </CookieConsent>
    </BrowserRouter>
  );
}

export default App;
