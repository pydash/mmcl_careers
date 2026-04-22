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

export { getPesoCurrency, getPesoCurrencyShort };
