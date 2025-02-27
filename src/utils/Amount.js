export const roundToDecimal = (amount, decimalPlaces = 2) => {
  const rounded = Number(parseFloat(amount).toFixed(decimalPlaces));
  return rounded.toFixed(decimalPlaces);
};