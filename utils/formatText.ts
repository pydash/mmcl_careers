function toUpperCaseFirstLetter(text: string): string {
  if (text.length === 0) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function toLowerCaseFirstLetter(text: string): string {
  if (text.length === 0) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function toTitleCase(text: string): string {
  const smallWords = new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "in",
    "nor",
    "of",
    "on",
    "or",
    "the",
    "to",
    "up",
    "with",
  ]);

  const words = text.toLowerCase().split(" ");

  return words
    .map((word, index) => {
      if (index === 0 || !smallWords.has(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
}

export { toUpperCaseFirstLetter, toLowerCaseFirstLetter, toTitleCase };
