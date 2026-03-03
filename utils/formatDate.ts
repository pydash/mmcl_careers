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
    return `${month} ${day}, ${year} | ${hours}:${minutes}:${seconds}`;
  }
}

export function getTimeAgo(isoString: string): string {
  const createdAt = new Date(isoString);
  const now = new Date();
  const diffInMs = now.getTime() - createdAt.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 30) {
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }
}

export function getShortDate(input: string): string {
  if (!input) return "";

  const [monthStr, year] = input.split("-");
  const monthIndex = Number(monthStr) - 1;

  const date = new Date(Number(year), monthIndex);

  return date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function getDateString(date: Date): string {
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}
