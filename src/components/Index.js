import React, { useState, useEffect } from 'react';
import SchoolItem from './SchoolItem';
import NoResults from './NoResults';
import { pageTitle, socialLinkButtons } from '../utils';
import ReactGATrack from './ReactGATrack';

const Index = (props) => {

  const { setSocialIconLinks, scroll } = props;

  const [state, setState] = useState({
    initialData: [],
    data: props.data,
    search: null,
  });

  const onSearch = (e) => {
    if (e.target.value) {
      setState({ ...state, data: returnFilteredData(props.data, e.target.value), search: e.target.value })
    } else {
      setState({ ...state, data: props.data })
    }
  }

  const returnFilteredData = (initialData, value) => {
    return value && initialData.filter(el => el.some(item => item.toString().trim().toLowerCase().includes(value.trim().toLowerCase())));
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

  return (
    <div className="main-bg flex-fill">
      <main className="container py-5">
        <div className="form-group">
          <label htmlFor="schoolSearch" className="sr-only">Барајте училиште</label>
          <input id="schoolSearch" placeholder="Барајте според име на училиште, адреса, град и сл." type="text" className="form-control" onChange={(e) => onSearch(e)}></input>
          {state.data.length > 0 && <small className="px-3 text-right form-text text-muted">приказ на вкупно <strong>{state.data.length}</strong> {state.data.length % 10 === 1 ? 'основно училиште' : 'основни училишта'}</small>}
        </div>
        {state.data.length > 0 ? state.data.map((school, key) => <SchoolItem key={key} data={school} />) : <NoResults />}
      </main>
      <ReactGATrack {...props} />
    </div>
  );
}

export default Index;
