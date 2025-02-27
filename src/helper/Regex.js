export const merchantRegex = /trf to ([A-Z\s]+) Refno|at ([A-Z\s]+)/i;

export const transactionRegex = /debited by (\d+(\.\d{1,2})?)|INR (\d+(\.\d{1,2})?)|on date [A-Za-z0-9]+\s+(?:trf to ([A-Z\s]+) Refno|at ([A-Z\s]+))/i;

export const transactionRegex2 = /(?:debited by|Debit Rs)\s?(\d+\.?\d*)\s?(?:on|at)\s?(.*?)(?:\s|$)/i;

export const transactionRegexes = [merchantRegex, transactionRegex, transactionRegex2];