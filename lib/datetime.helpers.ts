const MS_PER_DAY = 1000 * 60 * 60 * 24;

function getDaysAgo(dateTimeWithTimezone: string): number {
  const hasTimezone = /(?:Z|[+-]\d{2}:\d{2})$/i.test(dateTimeWithTimezone);

  if (!hasTimezone) {
    throw new Error(
      "Invalid datetime format. Expected timezone suffix (e.g. Z or +08:00).",
    );
  }

  const time = Date.parse(dateTimeWithTimezone);

  if (Number.isNaN(time)) {
    throw new Error("Invalid datetime string passed to getDaysAgo");
  }

  const diffInMs = Date.now() - time;

  return Math.max(0, Math.floor(diffInMs / MS_PER_DAY));
}

function getDate(dateTimeWithTimezone: string): string {
  const normalized = dateTimeWithTimezone.replace(/(\.\d{3})\d+/, "$1");
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid datetime string passed to getDate");
  }

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

  return `${monthNames[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

function getDateFromShortDate(shortDate: string): string {
  const datePartMatch = /^(\d{2})-(\d{4})$/.exec(shortDate);

  if (!datePartMatch) {
    throw new Error("Invalid short date string. Expected format MM-YYYY.");
  }

  const [, month, year] = datePartMatch;
  const monthIndex = Number(month) - 1;

  if (monthIndex < 0 || monthIndex > 11) {
    throw new Error("Invalid short date string. Expected format MM-YYYY.");
  }

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

  return `${monthNames[monthIndex]} ${year}`;
}

function getDateTime(datetime: string): string {
  const date = new Date(datetime);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid datetime string passed to getDateTime");
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export { getDaysAgo, getDate, getDateFromShortDate, getDateTime };
