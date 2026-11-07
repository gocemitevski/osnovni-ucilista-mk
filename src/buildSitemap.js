const cleanName = require('./utils/cleanName.cjs');
const transliterate = require('./utils/transliterate.cjs');

const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
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

// Use the last commit date of the files a page's content comes from instead of
// the build date, which would tell search engines that every URL changed on
// every deploy. Returns null when full git history is unavailable (shallow
// clone, no repository), in which case the URL is emitted without a lastmod.
const hasFullHistory = (() => {
  try {
    return execFileSync('git', ['rev-parse', '--is-shallow-repository'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim() === 'false';
  } catch {
    return false;
  }
})();

const lastCommitDate = (...paths) => {
  if (!hasFullHistory) return null;

  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...paths], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    return output || null;
  } catch {
    return null;
  }
};

const dataLastmod = lastCommitDate('src/data/data.json');
const directoryLastmod = lastCommitDate('src/data/data.json', 'src/components/Index.jsx');
const aboutLastmod = lastCommitDate('src/components/About.jsx');

const urls = new Map();

data.records.forEach((item) => urls.set(`${homepage}/uchilishte/${encodeURIComponent(schoolSlug(item))}`, dataLastmod));

urls.set(`${homepage}/adresar`, directoryLastmod);
urls.set(`${homepage}/za-izrabotkata`, aboutLastmod);
urls.set(`${homepage}/opshtina/grad-skopje`, dataLastmod);

municipalitiesSort().forEach((item) => urls.set(`${homepage}/opshtina/${encodeURIComponent(cleanName(transliterate(item[0])).toLowerCase())}`, dataLastmod));

const entries = [...urls].map(([url, lastmod]) => (lastmod
  ? `<url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`
  : `<url><loc>${url}</loc></url>`));

console.log(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join('')}</urlset>`);
