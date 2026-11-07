import data from '../data/data.json';
import { cleanName } from './cleanName';
import { transliterate } from './transliterate';

/**
 * The original (pre-deduplication) URL slug for a school. This is kept as a
 * fallback so links generated before duplicate slugs were disambiguated keep
 * resolving.
 */
export function baseSchoolSlug(school) {
  return cleanName(transliterate(school[3] + ' ' + school[2])).toLowerCase();
}

// Count how often each base slug occurs. A few schools share a name *and*
// municipality, so their base slug alone is ambiguous.
const baseSlugCounts = data.records.reduce((counts, school) => {
  const slug = baseSchoolSlug(school);
  counts[slug] = (counts[slug] || 0) + 1;
  return counts;
}, {});

/**
 * URL slug for a school record. Unique schools keep their existing slug; only
 * ambiguous slugs get the record id appended, e.g. `oou-goce-delchev-struga-280`.
 */
export function schoolSlug(school) {
  const base = baseSchoolSlug(school);
  return baseSlugCounts[base] > 1 ? `${base}-${school[0]}` : base;
}
