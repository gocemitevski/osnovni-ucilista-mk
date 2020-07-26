import React, { useEffect } from 'react';
import { pageTitle } from '../utils';

const About = (props) => {

  useEffect(() => {
    props.setScroll(props.scroll);
    window.scrollTo(props.scroll);
  }, [props]);

  useEffect(() => {
    document.title = pageTitle(props.title);
  }, [props]);

  return (
    <main className="container flex-grow-1 page py-5">
      <header>
        <h1 className="h3">{props.title}</h1>
        <p>Според <a target="_blank" rel="noopener noreferrer" title="Регистар на основни училишта во Република Северна Македонија" href="http://data.gov.mk/mk/dataset/pernctap-ha-ochobhn-yhnjinwta">збирка на податоци</a> на Министерство за образование и наука на Р. С. Македонија</p>
      </header>
    </main>
  );
}

export default About;
