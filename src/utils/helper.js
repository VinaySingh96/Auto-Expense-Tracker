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

export const getEndOfMonthDate = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of current month
  lastDay.setHours(10, 0, 0, 0); // Set time to 10:00 AM
  // console.log(now.);
  lastDay.setUTCHours(18, 10);
  return lastDay;
};

export const convertDate = (dateStr) => {
  const months = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
    Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
  };

  // Extract day, month, and year from the string
  const day = dateStr.slice(0, 2);  // First 2 characters (12)
  const monthStr = dateStr.slice(2, 5);  // Next 3 characters (Jan)
  const year = "20" + dateStr.slice(5, 7); // Last 2 characters prefixed with "20" (25 -> 2025)

  const month = months[monthStr]; // Get the month number
  return `${year}-${month}-${day}`; // Format YYYY-MM-DD
};

export const groupExpensesOnMerchants = (expenses) => {
  const groupedExpenses = Object.values(
    expenses.reduce((acc, expense) => {
      acc[expense.merchant] = acc[expense.merchant] || { ...expense, count: 0 };
      acc[expense.merchant].count++;
      return acc;
    }, {})
  );

  const sortedExpensedBasedOnMerchantCount = groupedExpenses.sort((a,b) => a.count > b.count);
  return sortedExpensedBasedOnMerchantCount;
}
