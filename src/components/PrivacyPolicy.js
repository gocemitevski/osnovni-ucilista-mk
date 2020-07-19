import React, { useEffect } from 'react';
import { pageTitle } from '../utils';

const PrivacyPolicy = (props) => {

  useEffect(() => {
    props.setScroll(props.scroll);
    window.scrollTo(props.scroll);
  }, [props]);

  useEffect(() => {
    document.title = pageTitle(props.title);
  }, [props]);

  return (
    <main className="container page py-5">
      <header>
        <h1>{props.title}</h1>
        <p>Оваа Политиката за приватност на личните податоци го уредува начинот на кој се собираат, користат, одржуваат и откриваат податоците собрани од корисниците, при посетата и користењето на мрежното место <a href="https://gocemitevski.github.io/osnovni-ucilista-mk/">https://gocemitevski.github.io/osnovni-ucilista-mk/</a> (во продолжение „ова мрежно место“).</p>
        <p>При посетата и користењето на ова мрежно место <strong>давате согласност за собирање и користење на податоци што произлегле од вашата посета</strong>, а се наведени во продолжение.</p>
        <h2>Кои податоци се собираат?</h2>
        {/* <p>При посетата на ова мрежно место се снимаат следните информации за корисникот:</p> */}
        <p className="text-danger">Во изработка</p>
        <h2>Колачиња</h2>
        <p className="text-danger">Во изработка</p>
        {/* https://support.gooсgle.com/analytics/topic/2919631?hl=en&ref_topic=1008008 */}
      </header>
    </main>
  );
}

export default PrivacyPolicy;
