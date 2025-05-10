const merchantRegexesNew = [
  /(?:at|by|for|to(?!\s+block))\s+([a-z0-9\s&\-\.\,]+?)(?:\s+(?:on|for|via|using|with|card|$))/i,
  /(?:on\s+)([a-z0-9\s&\-\.\,]+?)(?:\s+card)/i,
  /(?:purchase\s+at)\s+([a-z0-9\s&\-\.\,]+)/i,
  /(?:vendor\s*[:\-]\s*)([a-z0-9\s&\-\.\,]+)/i,
  /(?:shop\s*[:\-]\s*)([a-z0-9\s&\-\.\,]+)/i,
  /(?:store\s*[:\-]\s*)([a-z0-9\s&\-\.\,]+)/i,
  /(?:pos\s*transaction\s*at)\s*([a-z0-9\s&\-\.\,]+)/i,
  /(?:with\s+)([a-z0-9\s&\-\.\,]+?)(?:\s+card)/i,
  /(?:refunded\s+by)\s+([a-z0-9\s&\-\.\,]+)/i,
  /(?:merchant\s*[:\-]\s*)([a-z0-9\s&\-\.\,]+)/i,
  /(?:to\s+)([a-z0-9\s&\-\.\,]+?)(?:\s+for)/i,
  /(?:@)\s*([a-z0-9\s&\-\.\,]+)/i,
];

export const merchantRegexes = [
  "trf to\\s+([A-Z\\s]+)\\s+Refno",
  "at\\s+(.+?)\\s+on\\s+\\d{4}-\\d{2}-\\d{2}",
  "at\\s+(.+?)(?=\\.\\s*Avl\\s+Limit|\\s*Avl\\s+Limit)"
];

export const dateRegexes = [
  "\\b(0[1-9]|[12][0-9]|3[01])([A-Za-z]{3})(\\d{2})\\s?\\b",
  "\\b(0[1-9]|[12][0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\\d{2}\\s?\\b",
  "\\b\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])\\s?\\b",
  "\\b\\d{1,2}[\\/-]\\d{1,2}[\\/-]\\d{2,4}\\b",
  "\\b\\d{4}[\\/-]\\d{1,2}[\\/-]\\d{1,2}\\b",
  "\\b\\d{1,2}[.]\\d{1,2}[.]\\d{2,4}\\b",
  "\\b\\d{1,2}\\s+(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\\s+\\d{2,4}\\b",
  "\\b\\d{1,2}[-\\/]?(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[-\\/]\\d{2,4}\\b",
  "\\b\\d{4}-\\d{2}-\\d{2}:\\d{2}:\\d{2}:\\d{2}\\b"
];

export const amountRegexes = [
  "(?:rs\\.?\\s*)([\\d,]+(?:\\.\\d{1,2})?)",
  "([\\d,]+(?:\\.\\d{1,2})?)\\s*(?:rs\\.?)",
  "(?:inr\\s*)([\\d,]+(?:\\.\\d{1,2})?)",
  "([\\d,]+(?:\\.\\d{1,2})?)\\s*(?:inr)",
  "(?:₹\\s*)([\\d,]+(?:\\.\\d{1,2})?)",
  "(?:amount(?:\\s*of)?\\s*[:\\-]\\s*)([\\d,]+(?:\\.\\d{1,2})?)",
  "(?:paid(?:\\s*amount)?\\s*[:\\-]\\s*)([\\d,]+(?:\\.\\d{1,2})?)",
  "(?:transaction\\s*amount\\s*[:\\-]\\s*)([\\d,]+(?:\\.\\d{1,2})?)",
  "(?:total\\s*amount\\s*[:\\-]\\s*)([\\d,]+(?:\\.\\d{1,2})?)",
  "(?:spent(?:\\s*amount)?\\s*[:\\-]\\s*)([\\d,]+(?:\\.\\d{1,2})?)",
  "([\\d,]+(?:\\.\\d{1,2})?)\\s*\\/-",
  "([\\d,]+(?:\\.\\d{1,2})?)\\s*only\\b",
  "(?:amt\\s*[:\\-]\\s*)([\\d,]+(?:\\.\\d{1,2})?)",
  "(?:rs\\s*)([\\d,]+(?:\\.\\d{1,2})?)(?:\\s*\\/-)?",
  "debited\\s+by\\s+([\\d,]+(?:\\.\\d+)?)",
  "([\\d,]+(?:\\.\\d{1,2})?)(?:\\s*\\/-)?"
];


// export function generateRegex(message, keyword) {
//   // console.log({keyword})
//   // const regex = new RegExp(`(\\S+)\\s+${keyword}\\s+(\\S+)`, 'i');
//   // const match = message.match(regex);
//   // console.log({match})

//   const wordIndex = message.indexOf(keyword);

//   let leftWord ='', rightWord = '';

//   for(let i=wordIndex-1; i>=0; i--){
//     if(leftWord && message[i] == ' ') break;
//     leftWord += message[i];
//   }
//   leftWord = leftWord.split("").reverse().join("").trim();

//   for(let i=wordIndex+keyword.length; i<message.length; i++){
//     if(rightWord && message[i] == ' ') break;
//     rightWord += message[i];
//   }
//   rightWord = rightWord.trim();

//   if (leftWord && rightWord) {
//     // const precedingWord = match[1].trim() || ''; // "No preceding word"
//     // const nextWord = match[2].trim() || ''; // "jumps"
//     console.log(`Preceding word: ${leftWord}`);
//     console.log(`Next word: ${rightWord}`);
    
//     const generatedRegex = new RegExp(`${leftWord}\\s+(.*?)?\\s*${rightWord}`, 'i');
//     console.log(message.match(generatedRegex))
//     return `${leftWord}\\s+(.*?)?\\s*${rightWord}`;
//   }
//   return null;
// }

export function generateRegex(message, keyword) {
  if (!message || !keyword) return null;

  // Function to escape special characters in regex


  const wordIndex = message.indexOf(keyword);
  if (wordIndex === -1) return null; // If keyword not found, return null

  let leftWord = '', rightWord = '';

  // Extract left word
  for (let i = wordIndex - 1; i >= 0; i--) {
    if (leftWord.trim() && leftWord.trim().length > 1 && message[i] === ' ') {
      break;
    }
    leftWord = message[i] + leftWord; // Reverse append
  }

  // Extract right word
  for (let i = wordIndex + keyword.length; i < message.length; i++) {
    if (rightWord.trim() && rightWord.trim().length > 1 && message[i] === ' ') break;
    rightWord += message[i];
  }

  leftWord = leftWord.trim();
  rightWord = rightWord.trim();

  if (leftWord && rightWord) {
    // Correct regex syntax
    const generatedRegex = generateRegexBetweenStrings(leftWord, rightWord);

    return generatedRegex;
  }

  return null;
}

function escapeSpecialChars(str) {
  // Escape special characters in the string for regex
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function generateRegexBetweenStrings(startStr, endStr) {
  // Escape the start and end strings
  const escapedStart = escapeSpecialChars(startStr);
  const escapedEnd = escapeSpecialChars(endStr);

  // Construct the regex pattern
  // Use non-capturing group (?:...) for the start string
  // The actual word to be extracted will be in the first capturing group
  return `${escapedStart}(.*?)${escapedEnd}`;
}


export function trimSpecialChars(str) {
  return str.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');
}


// export const merchantRegexes = [
//   "/trf to\s+([A-Z\s]+)\s+Refno/i",
//   "/at\s+(.+?)\s+on\s+\d{4}-\d{2}-\d{2}/i",
//   "/at\s+(.+?)(?=\.\s*Avl\s+Limit|\s*Avl\s+Limit)/i"
// ];

// const merchantRegexesNew = [
//   /(?:at|by|for|to(?!\s+block))\s+([a-z0-9\s&\-\.\,]+?)(?:\s+(?:on|for|via|using|with|card|$))/i,
//   /(?:on\s+)([a-z0-9\s&\-\.\,]+?)(?:\s+card)/i,
//   /(?:purchase\s+at)\s+([a-z0-9\s&\-\.\,]+)/i,
//   /(?:vendor\s*[:\-]\s*)([a-z0-9\s&\-\.\,]+)/i,
//   /(?:shop\s*[:\-]\s*)([a-z0-9\s&\-\.\,]+)/i,
//   /(?:store\s*[:\-]\s*)([a-z0-9\s&\-\.\,]+)/i,
//   /(?:pos\s*transaction\s*at)\s*([a-z0-9\s&\-\.\,]+)/i,
//   /(?:with\s+)([a-z0-9\s&\-\.\,]+?)(?:\s+card)/i,
//   /(?:refunded\s+by)\s+([a-z0-9\s&\-\.\,]+)/i,
//   /(?:merchant\s*[:\-]\s*)([a-z0-9\s&\-\.\,]+)/i,
//   /(?:to\s+)([a-z0-9\s&\-\.\,]+?)(?:\s+for)/i,
//   /(?:@)\s*([a-z0-9\s&\-\.\,]+)/i,
// ];

// // export const dateRegexes = [
// //   /\b(0[1-9]|[12][0-9]|3[01])([A-Za-z]{3})(\d{2})\b/,
// //   /\b(0[1-9]|[12][0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2}\b/i,
// //   /\b\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])\b/
// // ];

// export const dateRegexes = [
//   "/\b(0[1-9]|[12][0-9]|3[01])([A-Za-z]{3})(\d{2})\s?\b/",
//   "/\b(0[1-9]|[12][0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2}\s?\b/",
//   "/\b\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])\s?\b/",
//   "/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}\b/",
//   "/\b\d{4}[\/-]\d{1,2}[\/-]\d{1,2}\b/",
//   "/\b\d{1,2}[.]\d{1,2}[.]\d{2,4}\b/",
//   "/\b\d{1,2}\s+(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{2,4}\b/",
//   "/\b\d{1,2}[-\/](?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[-\/]\d{2,4}\b/",
//   "/\b\d{4}-\d{2}-\d{2}:\d{2}:\d{2}:\d{2}\b/",
// ];

// export const amountRegexes = [
//   "/(?:rs\.?\s*)([\d,]+(?:\.\d{1,2})?)/i",
//   "/([\d,]+(?:\.\d{1,2})?)\s*(?:rs\.?)/i",
//   "/(?:inr\s*)([\d,]+(?:\.\d{1,2})?)/i",
//   "/([\d,]+(?:\.\d{1,2})?)\s*(?:inr)/i",
//   "/(?:₹\s*)([\d,]+(?:\.\d{1,2})?)/i",
//   "/(?:amount(?:\s*of)?\s*[:\-]\s*)([\d,]+(?:\.\d{1,2})?)/i",
//   "/(?:paid(?:\s*amount)?\s*[:\-]\s*)([\d,]+(?:\.\d{1,2})?)/i",
//   "/(?:transaction\s*amount\s*[:\-]\s*)([\d,]+(?:\.\d{1,2})?)/i",
//   "/(?:total\s*amount\s*[:\-]\s*)([\d,]+(?:\.\d{1,2})?)/i",
//   "/(?:spent(?:\s*amount)?\s*[:\-]\s*)([\d,]+(?:\.\d{1,2})?)/i",   // "spent amount - 170"
//   "/([\d,]+(?:\.\d{1,2})?)\s*\/-/i",                    // "170 /-"
//   "/([\d,]+(?:\.\d{1,2})?)\s*only\b/",                // "170 only"
//   "/(?:amt\s*[:\-]\s*)([\d,]+(?:\.\d{1,2})?)/i",       // "Amt: 170"
//   "/(?:rs\s*)([\d,]+(?:\.\d{1,2})?)(?:\s*\/-)?/i",     // "rs 170" optionally ending with "/-"
//   "/debited\s+by\s+([\d,]+(?:\.\d+)?)/i",
//   "/([\d,]+(?:\.\d{1,2})?)(?:\s*\/-)?/"               // fallback: any number that might represent amount
// ];
