import React, { useState, useEffect } from 'react';
import SchoolItem from './SchoolItem';
import NoResults from './NoResults';
import { pageDescription, setPageMeta, singularPlural, socialLinkButtons } from '../utils';
import ReactGATrack from './ReactGATrack';

const returnFilteredData = (initialData, value) => {
  return value && initialData.filter(el => el.some(item => item.toString().trim().toLowerCase().includes(value.trim().toLowerCase())));
};

const returnNamesData = (namesData, value) => {
  return value && namesData.filter(item => item[3].trim().toLowerCase().includes(value.trim().toLowerCase()));
};

const getInitialSearchValue = () => {
  if (typeof window === 'undefined' || !window.location) return '';
  return new URLSearchParams(window.location.search).get('q') || '';
};

const Index = (props) => {

  const initialSearchValue = getInitialSearchValue();
  const floatDecimals = 1;

  const { setSocialIconLinks, scroll } = props;

  const [state, setState] = useState(() => ({
    data: initialSearchValue ? returnFilteredData(props.data, initialSearchValue) : props.data,
    search: initialSearchValue,
    namesData: initialSearchValue ? returnNamesData(props.data, initialSearchValue) : []
  }));

  const onSearch = (e) => {
    if (e.target.value) {
      setState({ ...state, data: returnFilteredData(props.data, e.target.value), search: e.target.value, namesData: returnNamesData(props.data, e.target.value) })
    } else {
      setState({ ...state, data: props.data, search: '', namesData: [] })
    }
  }

  useEffect(() => {
    window.scrollTo(scroll);
  }, [scroll]);

  useEffect(() => {
    setPageMeta(props.title, pageDescription('адресарот на основните училишта'));
  }, [props]);

  useEffect(() => {
    setSocialIconLinks(() => socialLinkButtons());
  }, [setSocialIconLinks]);

  return (
    <div className="main-bg flex-fill">
      <main id="main-content" tabIndex={-1} className="container py-5">
        <h1 className="visually-hidden">Адресар на основни училишта</h1>
        <p className="visually-hidden" role="status" aria-live="polite">
          {state.search && (state.data.length > 0
            ? `Приказ на ${state.data.length} ${singularPlural(state.data.length, 'основно училиште', 'основни училишта')}`
            : 'Нема резултати')}
        </p>
        <div className="mb-4" role="search" aria-label="Пребарување училишта">
          <label htmlFor="schoolSearch" className="visually-hidden">Барајте училиште</label>
          <input id="schoolSearch" placeholder="Барајте според име на училиште, адреса, град и сл." type="search" className="form-control form-control-lg" value={state.search} onChange={(e) => onSearch(e)}></input>
          {state.data.length > 0 && <div className="mx-3 my-2">
            <small className="form-text text-muted ms-auto">приказ на вкупно <strong className="badge rounded-pill bg-info mx-1">{state.data.length}</strong> {singularPlural(state.data.length, 'основно училиште', 'основни училишта')}
              {state.namesData.length > 0 && <span>, од кои <strong className="badge rounded-pill bg-warning mx-1">{state.namesData.length}</strong> т.е. <span className="badge rounded-pill bg-success mx-1">{`${parseFloat((state.namesData.length / props.data.length) * 100).toFixed(floatDecimals).toLocaleString()}%`}</span> го содржат бараниот поим во своето име, а <strong className="badge rounded-pill bg-danger mx-1">{`${parseFloat((100 - (state.namesData.length / props.data.length) * 100)).toFixed(floatDecimals).toLocaleString()}%`}</strong> не го содржат</span>}
            </small>
          </div>}
        </div>
        {state.data.length > 0 ? state.data.map((school, key) => <SchoolItem key={key} data={school} />) : <NoResults />}
      </main>
      <ReactGATrack {...props} />
    </div>
  );
}

export default Index;
