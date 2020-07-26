import React, { useState, useEffect } from 'react';
import SchoolItem from './SchoolItem';
import NoResults from './NoResults';
import { pageTitle } from '../utils';

const Index = (props) => {
  const [state, setState] = useState({
    initialData: [],
    data: props.data,
    search: null,
  });

  const onSearch = (e) => {
    if (e.target.value) {
      const filteredData = returnFilteredData(props.data, e.target.value);
      setState({ ...state, data: filteredData, search: e.target.value })
    } else {
      setState({ ...state, data: state.data })
    }
  }

  const returnFilteredData = (initialData, value) => {
    return value && initialData.filter(el => el.some(item => item.toString().toLowerCase().includes(value.toLowerCase())));
  }

  useEffect(() => {
    props.setScroll(props.scroll);
    window.scrollTo(props.scroll);
  }, [props]);

  useEffect(() => {
    document.title = pageTitle(props.title);
  }, [props]);

  return (
    <div className="main-bg flex-fill">
      <main className="container py-5">
        <div className="form-group">
          <label htmlFor="schoolSearch" className="sr-only">Барајте училиште</label>
          <input id="schoolSearch" placeholder="Барајте според име на училиште, адреса, град и сл." type="text" className="form-control" onChange={(e) => onSearch(e)}></input>
          {state.data.length > 0 && <small className="px-3 text-right form-text text-muted">приказ на вкупно <strong>{state.data.length}</strong> {state.data.length % 10 === 1 ? 'основно училиште' : 'основни училишта'}</small>}
        </div>
        {state.data.length > 0 ? state.data.map((school, key) => <SchoolItem key={key} setScroll={props.setScroll(props.scroll)} data={school} />) : <NoResults />}
      </main>
    </div>
  );
}

export default Index;
