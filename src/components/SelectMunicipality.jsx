import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cleanName, transliterate } from '../utils';

const SelectMunicipality = (props) => {
  const { municipalityId } = useParams();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <label htmlFor="setMunicipality" className="visually-hidden">Општина</label>
      <select value={municipalityId || ''} className="form-select" id="setMunicipality" onChange={(e) => {
        if (e.target.value) {
          props.setSelectedMunicipality(e.target.value);
          props.setMunicipalitySchools && props.setMunicipalitySchools(props.data.filter(el =>
            (cleanName(transliterate(el[2].toString().toLowerCase())) === e.target.value) || (el[7] && cleanName(transliterate(el[7].toString().toLowerCase())) === e.target.value)
          ));
          navigate('/opshtina/' + e.target.value + '/');
        }
        else {
          props.setSelectedMunicipality(0);
          props.setMunicipalitySchools && props.setMunicipalitySchools(props.data);
          navigate('/');
        };
      }}>
        <option value="">Сите општини во Р. С. Македонија</option>
        <option value="grad-skopje">{props.skopjeTitle}</option>
        {props.municipalities.map((municipality, key) => <option key={key} value={cleanName(transliterate(municipality[0])).toLowerCase()}>{municipality[0]}</option>).reverse()}
      </select>
    </React.Fragment>
  );
}

export default SelectMunicipality;
