// const MOCK_DATA = require("./src/utils/data/MOCK_DATA");
// const fs = require('fs');
// for(data of MOCK_DATA) {
//   const date = new Date(data.date);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//   const day = String(date.getDate()).padStart(2, '0');
//   data.date = `${year}-${month}-${day}`;
// }
// console.log('-----------------------------')
// fs.writeFile('./mockData', JSON.stringify(MOCK_DATA, null, 2), (err) => {
//   if (err) {
//     console.error('Error writing the file:', err);
//   } else {
//     console.log('File has been updated successfully.');
//   }
// });

const { getTransactionInfo } = require('transaction-sms-parser');

const sms =
  'INR 2000 debited from A/c no. XX3423 on 05-02-19 07:27:11 IST at ECS PAY. Avl Bal- INR 2343.23.';

const transactionInfo = getTransactionInfo(sms);

// console.log({transactionInfo});

const merchantRegexes = [
  /to\s+([A-Z\s]+)\s+Refno/i, 
  /at\s+(.+?)\s+on\s+\d{4}-\d{2}-\d{2}/i,
  /at\s+(.+?)(?=\.\s*Avl\s+Limit|\s*Avl\s+Limit)/i
];

const dateRegexes = [
  /\b(0[1-9]|[12][0-9]|3[01])([A-Za-z]{3})(\d{2})\b/,
  /\b(0[1-9]|[12][0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2}\b/i,
  /\b\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])\b/
];

const amountDebitedRegexes = [
  /(?:debited by|INR|Debit Rs)\s?(\d+(?:\.\d{1,2})?)/i,
  /\b(\w+)\s+spent\b/i,
  /(?:INR)\s?(\d+(?:\.\d{1,2})?)/i
];


function categorizeTransaction(transactionMessage) {
  const isDebitTransaction = /(?:debit(?:ed)?|spent)/i.test(transactionMessage);
  if (!isDebitTransaction) return;
  console.log(transactionMessage)
  let merchant, amount, date;
  // Extract Merchant
  for(const merchantRegex of merchantRegexes) {
    const merchantMatch = transactionMessage.match(merchantRegex);
    if(merchantMatch) {
      console.log({merchantMatch})
      merchant = merchantMatch ? merchantMatch[1].trim() : null;
      break;
    }
  }

  // Extract Amount Debited
  for(const amountDebitedRegex of amountDebitedRegexes) {
    const amountMatch = transactionMessage.match(amountDebitedRegex);
    if(amountMatch) {
      amount = amountMatch ? amountMatch[1].trim() : null;
      break;
    }
  }

  // Extract Date
  for(const dateRegex of dateRegexes) {
    const dateMatch = transactionMessage.match(dateRegex);
    if(dateMatch) {
      date = dateMatch ? dateMatch[0].trim() : null;
      break;
    }
  }

  if(amount && date) {
    date = convertDate(date);
    amount = Number(amount);
    console.log({merchant, amount, date});
  } 
}

function convertDate (dateStr) {
  console.log("datestr = ", dateStr,dateStr.split('-')?.[0])
  if(dateStr.split('-')?.[0]?.length === 4) return dateStr;
  dateStr = dateStr.replaceAll('-', '');
  const months = {
    jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
    jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12"
  };

  // Extract day, month, and year from the string
  const day = dateStr.slice(0, 2);  // First 2 characters (12)
  const monthStr = dateStr.slice(2, 5);  // Next 3 characters (Jan)
  const year = "20" + dateStr.slice(5, 7); // Last 2 characters prefixed with "20" (25 -> 2025)

  const month = months[monthStr.toLowerCase()]; // Get the month number
  return `${year}-${month}-${day}`; // Format YYYY-MM-DD
};

let messages = [
  'Rs.170 spent on HDFC Bank Card x8937  on 2025-02-21:12:22:01.Not U? To Block & Reissue Call 180218380038180/SMS BLOCK CC 7382 to DHDODN 12-jan-25',
  'Dear UPI user A/C X3837 debited by 10000.0 on date 12Feb25 trf to AMAZON IN Refno 212129048021. If not u? call 17329847246. -SBIN'
];

// for(const message of messages) {
//   console.log({transactionInfo: getTransactionInfo(message)});
// }

// categorizeTransaction(messages[0]);
// categorizeTransaction(messages[1]);

// ================= Example Usage ====================
const sampleMessage = "Rs.1,234.56 spent at ABC Store on HDFC Bank Card x8937 on 2025-02-21:12:22:01. Enjoy shopping!";
const parser = new TransactionMessageParser(sampleMessage);
console.log(parser.extractAll());
// Example output:
// {
//   amount: 1234.56,
//   merchant: "abc store",
//   date: 2025-02-21T00:00:00.000Z, // (Date object)
//   transactionType: "spent"
// }

messages.push('Rs.50.00 paid thru A/C XX2894 on 23-2-25 18:59:11 to MOHHAMAD GUFRAN, UPI Ref 283736837, If not done, SMS BLOCKUPI to 232787329,-Canara Bank')
messages.push('Your a/c XX0413 is debited on 15/12/2020 by INR 3,211.50 towards purchase. Avl Bal: INR 5,603.54.')

for(const message of messages) {
  const parser = new TransactionMessageParser(message);
  console.log(parser.extractAll());
}


