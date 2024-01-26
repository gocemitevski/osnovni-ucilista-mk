import React, { useState, useEffect } from 'react';
import SchoolItem from './SchoolItem';
import NoResults from './NoResults';
import { pageTitle, socialLinkButtons } from '../utils';
import ReactGATrack from './ReactGATrack';

const Index = (props) => {

  const initialSearchValue = '';
  const floatDecimals = 1;

  const { setSocialIconLinks, scroll } = props;

  const [state, setState] = useState({
    initialData: [],
    data: props.data,
    search: initialSearchValue,
    namesData: []
  });

  const onSearch = (e) => {
    if (e.target.value) {
      setState({ ...state, data: returnFilteredData(props.data, e.target.value), search: e.target.value, namesData: returnNamesData(props.data, e.target.value) })
    } else {
      setState({ ...state, data: props.data, search: initialSearchValue, namesData: [] })
    }
  }

  const returnFilteredData = (initialData, value) => {
    return value && initialData.filter(el => el.some(item => item.toString().trim().toLowerCase().includes(value.trim().toLowerCase())));
  }

  const returnNamesData = (namesData, value) => {
    return value && namesData.filter(item => item[3].trim().toLowerCase().includes(value.trim().toLowerCase()));
  }

  useEffect(() => {
    window.scrollTo(scroll);
  }, [scroll]);

  useEffect(() => {
    document.title = pageTitle(props.title);
  }, [props]);

  useEffect(() => {
    setSocialIconLinks(() => socialLinkButtons());
  }, [setSocialIconLinks]);

  console.log(state.namesData.length)
  return (
    <div className="main-bg flex-fill">
      <main className="container py-5">
        <div className="form-group mb-4">
          <label htmlFor="schoolSearch" className="sr-only">Барајте училиште</label>
          <input id="schoolSearch" placeholder="Барајте според име на училиште, адреса, град и сл." type="text" className="form-control form-control-lg" value={state.search} onChange={(e) => onSearch(e)}></input>
          {state.data.length > 0 && <div className="mx-3 my-2">
            <small className="form-text text-muted ml-auto">приказ на вкупно <strong className="badge badge-pill badge-info mx-1">{state.data.length}</strong> {state.data.length % 10 === 1 && state.data.length % 11 === 1 ? 'основно училиште' : 'основни училишта'}
              {state.namesData.length > 0 && <span>, од кои <strong className="badge badge-pill badge-warning mx-1">{state.namesData.length}</strong> т.е. <span className="badge badge-pill badge-success mx-1">{`${parseFloat((state.namesData.length / props.data.length) * 100).toFixed(floatDecimals).toLocaleString()}%`}</span> го содржат бараниот поим во своето име, а <strong className="badge badge-pill badge-danger mx-1">{`${parseFloat((100 - (state.namesData.length / props.data.length) * 100)).toFixed(floatDecimals).toLocaleString()}%`}</strong> не го содржат</span>}
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
