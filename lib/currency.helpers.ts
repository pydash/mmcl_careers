function getPesoCurrency(amount: number | null | undefined): string {
  if (amount == null) {
    return "N/A";
  }

  const wholeNumber = Math.floor(amount || 0);
  return `₱${wholeNumber.toLocaleString()}`;
}

function getPesoCurrencyShort(amount: number | null | undefined): string {
  if (amount == null) {
    return "N/A";
  }
  const thousands = Math.round((amount || 0) / 1000);
  return `₱${thousands}k`;
}

function formatSalaryRange(salary: string | null | undefined): string {
  if (!salary) {
    return "N/A";
  }

  const [minStr, maxStr] = salary.split("-").map((s) => s.trim());
  const min = parseFloat(minStr);
  const max = parseFloat(maxStr);

  if (isNaN(min) || isNaN(max)) {
    return salary; // Return original string if parsing fails
  }

  return `${getPesoCurrency(min)} - ${getPesoCurrency(max)}`;
}

export { getPesoCurrency, getPesoCurrencyShort, formatSalaryRange };
