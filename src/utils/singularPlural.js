export function singularPlural(count, singlular, plural) {
  return (count % 10 === 1 && count !== 11) ? singlular : plural;
}
