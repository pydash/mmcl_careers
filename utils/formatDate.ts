const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getTime(isoString: string): string {
  const date = new Date(isoString);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${hours}-${minutes}-${seconds}`;
}

export function getDate(isoString: string): string {
  const date = new Date(isoString);
  const month = monthNames[date.getUTCMonth()];
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

export function getDateTime(isoString: string): string {
  {
    const date = new Date(isoString);
    const month = monthNames[date.getUTCMonth()];
    const day = String(date.getUTCDate()).padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${month} ${day}, ${year} ${hours}-${minutes}-${seconds}`;
  }
}
