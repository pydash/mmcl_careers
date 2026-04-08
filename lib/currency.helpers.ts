function getPesoCurrency(amount: number): string {
  const wholeNumber = Math.floor(amount);
  return `₱${wholeNumber.toLocaleString()}`;
}

function getPesoCurrencyShort(amount: number): string {
  const thousands = Math.round(amount / 1000);
  return `₱${thousands}k`;
}

export { getPesoCurrency, getPesoCurrencyShort };
