const cleanName = require('./utils/cleanName.cjs');
const transliterate = require('./utils/transliterate.cjs');

const fs = require('node:fs');
const data = JSON.parse(fs.readFileSync('./src/data/data.json', 'utf8'));

const baseSchoolSlug = (school) => cleanName(transliterate(school[3] + ' ' + school[2])).toLowerCase();

// Count base slugs so ambiguous ones can be disambiguated with the record id,
// matching src/utils/schoolSlug.js used by the app.
const baseSlugCounts = data.records.reduce((counts, school) => {
  const slug = baseSchoolSlug(school);
  counts[slug] = (counts[slug] || 0) + 1;
  return counts;
}, {});

const schoolSlug = (school) => {
  const base = baseSchoolSlug(school);
  return baseSlugCounts[base] > 1 ? `${base}-${school[0]}` : base;
};

const municipalities = data.records.map((school) => school[2]);

const municipalitiesCount = () => {
  const schoolsPerMunicipality = [];
  municipalities.forEach((i) => { schoolsPerMunicipality[i] = (schoolsPerMunicipality[i] || 0) + 1; });
  return schoolsPerMunicipality;
};

const municipalitiesSort = () => {
  const sortedMunicipalities = [];

  for (const municipality in municipalitiesCount()) {
    sortedMunicipalities.push([municipality, municipalitiesCount()[municipality]]);
  }

  sortedMunicipalities.sort((a, b) => a[1] - b[1]);

  return sortedMunicipalities;
};

const homepage = `https://gocemitevski.github.io/osnovni-ucilista-mk/?`;
const lastmod = new Date().toISOString().slice(0, 10);

const urls = new Set();

data.records.forEach((item) => urls.add(`${homepage}/uchilishte/${encodeURIComponent(schoolSlug(item))}`));

urls.add(`${homepage}/adresar`);
urls.add(`${homepage}/za-izrabotkata`);
urls.add(`${homepage}/opshtina/grad-skopje`);

municipalitiesSort().forEach((item) => urls.add(`${homepage}/opshtina/${encodeURIComponent(cleanName(transliterate(item[0])).toLowerCase())}`));

console.log(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...urls].map((el) => `<url><loc>${el}</loc><lastmod>${lastmod}</lastmod></url>`).join('')}</urlset>`);
