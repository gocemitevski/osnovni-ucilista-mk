export function transliterate(string) {
  const kirilica = {
    "А": "A", "Б": "B", "В": "V", "Г": "G", "Д": "D", "Ѓ": "GJ", "Е": "E", "Ѐ": "E", "Ж": "ZH", "З": "Z", "Ѕ": "DZ", "И": "I", "Ѝ": "I", "Ј": "J", "К": "K", "Л": "L", "Љ": "LJ", "М": "M", "Н": "N", "Њ": "NJ", "О": "O", "П": "P", "Р": "R", "С": "S", "Т": "T", "Ќ": "KJ", "У": "U", "Ф": "F", "Х": "H", "Ц": "C", "Ч": "CH", "Џ": "DZ", "Ш": "SH", "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "ѓ": "gj", "е": "e", "ѐ": "e", "ж": "zh", "з": "z", "ѕ": "dz", "и": "i", "ѝ": "i", "ј": "j", "к": "k", "л": "l", "љ": "lj", "м": "m", "н": "n", "њ": "nj", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "ќ": "kj", "у": "u", "ф": "f", "х": "h", "ц": "c", "ч": "ch", "џ": "dz", "ш": "sh"
  }
  return string.split('').map(function (char) {
    return kirilica[char] || char;
  }).join("");
}
