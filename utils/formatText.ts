function toUpperCaseFirstLetter(text: string): string {
  if (text.length === 0) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function toLowerCaseFirstLetter(text: string): string {
  if (text.length === 0) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => toUpperCaseFirstLetter(word))
    .join(" ");
}

export { toUpperCaseFirstLetter, toLowerCaseFirstLetter, toTitleCase };
