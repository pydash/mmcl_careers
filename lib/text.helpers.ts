function toTitleCase(str: string | null | undefined): string {
  if (!str) {
    return "N/A";
  }

  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export { toTitleCase };
