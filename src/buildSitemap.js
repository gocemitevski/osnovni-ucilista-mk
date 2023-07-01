import { cleanName } from './utils/cleanName.js';
import { transliterate } from './utils/transliterate.js';

import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let data = JSON.parse(fs.readFileSync(__dirname + '/data/data.json', 'utf8'));

const skopjeTitle = "Град Скопје";

const municipalities = data.records.map((school, index) => {
  return school[2];
});

const municipalitiesCount = () => {
  const schoolsPerMunicipality = [];
  municipalities.forEach(i => { schoolsPerMunicipality[i] = (schoolsPerMunicipality[i] || 0) + 1; });
  return schoolsPerMunicipality;
};

const municipalitiesSort = () => {

  const sortedMunicipalities = [];

  for (var municipality in municipalitiesCount()) {
    sortedMunicipalities.push([municipality, municipalitiesCount()[municipality]]);
  }

  sortedMunicipalities.sort(function (a, b) {
    return a[1] - b[1];
  });

  return sortedMunicipalities;
};

const homepage = `https://gocemitevski.github.io/osnovni-ucilista-mk`;
const sitemap = data.records.map(item => `${homepage}/uchilishte/${encodeURIComponent(cleanName(transliterate(item[3] + ' ' + item[2])).toLowerCase())}`);
sitemap.push(`${homepage}/opshtina/${encodeURIComponent(cleanName(transliterate(skopjeTitle)).toLowerCase())}/`);
municipalitiesSort().map(item => sitemap.push(`${homepage}/opshtina/${encodeURIComponent(cleanName(transliterate(item[0])).toLowerCase())}`));
console.log(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap.map(el => `<url><loc>${el}</loc></url>`).join('')}</urlset>`);
