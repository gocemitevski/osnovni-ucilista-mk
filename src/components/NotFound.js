import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageTitle, socialLinkButtons } from '../utils';
import ReactGATrack from './ReactGATrack';

const NotFound = (props) => {

  const location = useLocation();
  const { setSocialIconLinks } = props;

  useEffect(() => {
    document.title = pageTitle(props.title);
  }, [props]);

  useEffect(() => {
    setSocialIconLinks(() => socialLinkButtons());
  }, [setSocialIconLinks]);

  return (
    <main className="container flex-fill page py-5">
      <header>
        <h1 className="h3 d-flex align-items-center">
          <i className="fa fas fa-2x fa-times-circle mr-3 text-danger"></i>
          <span>{props.title}</span>
        </h1>
        <p>Извинете, но страницата <code>{location.pathname}</code> не постои или пак можеби некогаш постоела и била избришана.</p>
        <p className="mb-0">Ве молам проверете дали случајно погрешивте при внесувањето.</p>
      </header>
      <ReactGATrack />
    </main>
  );
}

export default NotFound;
