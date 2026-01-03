export function formatCurrency(amount: number): string {
  const wholeNumber = Math.floor(amount);
  return `₱${wholeNumber.toLocaleString()}`;
}

export function formatCurrencyShort(amount: number): string {
  const thousands = Math.round(amount / 1000);
  return `₱${thousands}k`;
}
