export function generateDateByMonthAndYear(month, year) {
  const parsedMonth = month < 10 ? `0${month}`: month;
  return `${year}-${parsedMonth}-01`;
}

export function generateDateByMonthYearAndDay(month, year, day) {
  const parsedMonth = month < 10 ? `0${month}`: month;
  return `${year}-${parsedMonth}-${day}`;
}

const rupeeFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
});

export function formatToIndianRupee(amount) {
  return rupeeFormatter.format(amount)
}

export function customAmountFormatter(number) {
  // Convert the number to a string and split it into whole and fractional parts
  const [whole, fraction] = number.toString().split('.');

  // Reverse the whole part for easier processing
  let reversed = whole.split('').reverse().join('');

  // Add a comma after every two digits, except at the end
  let reversedWithCommas = reversed.replace(/(\d{2})(?=\d)/g, '$1,');

  // Reverse back to the original order and remove any leading comma
  let formattedWhole = reversedWithCommas.split('').reverse().join('').replace(/^,/, '');

  // Combine the whole part with the fractional part (if any)
  return fraction ? `${formattedWhole}.${fraction}` : formattedWhole;
}
