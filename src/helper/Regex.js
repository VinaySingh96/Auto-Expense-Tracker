export const merchantRegexes = [
  /trf to\s+([A-Z\s]+)\s+IN Refno/i, 
];

export const dateRegexes = [
  /on date\s+([0-9]{1,2}[A-Za-z]{3}[0-9]{2})/i, // Matches dates in "12Jan25" format
];

export const amountDebitedRegexes = [ /(?:debited by|INR|Debit Rs)\s?(\d+(?:\.\d{1,2})?)/i ];
