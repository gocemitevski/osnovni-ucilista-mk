import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-regular-svg-icons'

const NoResults = (props) => {

  return (
    <article className="card my-4" key={props.index}>
      <div className="row no-gutters">
        <div className="col-lg-4 border-0 card-header px-3 py-5 d-flex align-items-center justify-content-lg-center">
          <FontAwesomeIcon fixedWidth className="text-muted mr-2" size="4x" icon={faFrown} />
        </div>
        <div className="col-lg-8">
          <div className="card-body">
            <h2 className="h4 card-title">
              <span role="heading" aria-roledescription="heading">Без резултати</span>
            </h2>
            <p className="card-text">Извинете, <strong>не успеав да најдам основни училишта за внесениот збор</strong>. Ве молам проверете дали случајно погрешивте при внесувањето.</p>
            <p className="mb-0">Во спротивно, можеби најдовте училиште што го нема во нашиот адресар. Би ви бил благодарен, доколку за тоа <a href="mailto:goce.mitevski@gmail.com">ме известите</a>.</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default NoResults;
