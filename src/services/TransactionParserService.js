import { REGEX_TYPES } from "../constants/RegexTypes";
// import { merchantRegexes } from "../helper/Regex";
import { fetchRegexes, insertRegexes, updateRegexes } from "../helper/SqlHelper";

class TransactionParser {
  constructor(message) {
    // Normalize to lowercase for case-insensitive matching.
    // this.message = message.toLowerCase();
  }
  
  async init() {
    // return;
    // get regexes from db, if null or empty array, fetch from file and save to db
    this.merchantRegexes = await fetchRegexes(REGEX_TYPES.MERCHANT);
    this.amountRegexes = await fetchRegexes(REGEX_TYPES.AMOUNT);
    this.dateRegexes = await fetchRegexes(REGEX_TYPES.DATE);
    
    if(!this.merchantRegexes) {
      const { merchantRegexes } = require('../helper/Regex');
      await insertRegexes(merchantRegexes, REGEX_TYPES.MERCHANT);
      this.merchantRegexes = merchantRegexes;
    }
    if(!this.amountRegexes) {
      const { amountRegexes } = require('../helper/Regex');
      await insertRegexes(amountRegexes, REGEX_TYPES.AMOUNT);
      this.amountRegexes = amountRegexes;
    }
    if(!this.dateRegexes) {
      const { dateRegexes } = require('../helper/Regex');
      await insertRegexes(dateRegexes, REGEX_TYPES.DATE);
      this.dateRegexes = dateRegexes;
    }
    console.log('Regex check complete ✅');
    return;
  }

  extractAmount() {
    for (let regex of this.amountRegexes) {
      regex = new RegExp(regex, 'i');
      const match = this.message.match(regex);
      if (match && match[1]) {
        // Remove commas then parse float
        const amount = parseFloat(match[1].replace(/,/g, ''));
        if (!isNaN(amount)) return amount;
      }
    }
    return null;
  }

  extractMerchant() {
    for (let regex of this.merchantRegexes) {
      regex = new RegExp(regex, 'i');
      const match = this.message.match(regex);
      if (match && match[1]) {
        // Trim and return the merchant name
        return match[1].trim();
      }
      if(match?.[0]){
        return match[0].trim();
      }
    }
    return null;
  }

  extractDate() {
    for (let regex of this.dateRegexes) {
      regex = new RegExp(regex, 'i');
      const match = this.message.match(regex);
      if (match && match[0]) {
        const dateStr = match[0];
        // Try parsing the date using several formats. In production, consider dayjs/moment.
        const parsed = this.parseDate(dateStr);
        if (parsed) return parsed;
      }
    }
    return null;
  }

  getDayMonthYear(dateStr) {
    let delemeter = '-'
    if(dateStr.includes('/')) delemeter = '/';

    let day = dateStr.split(delemeter)?.[0];
    let month = dateStr.split(delemeter)?.[1];
    let year = dateStr.split(delemeter)?.[2];

    if(/[A-Za-z]/.test(dateStr)){
      // Extract day, month, and year from the string
      day = dateStr.slice(0, 2);  // First 2 characters (12)
      month = dateStr.slice(2, 5);  // Next 3 characters (Jan)
      year = dateStr.slice(5).trim();
    }

    if(day.length == 1) day = `0${day}`;
    if(month.length == 1) month = `0${month}`;
    if(year.length == 2) year = `20${year}`;

    const months = {
      jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
      jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12"
    };

    if(isNaN(month)) {
      month = months[month.toLowerCase()];
    }

    return { day, month, year };
  }

  parseDate (dateStr) {
    if(dateStr.split('-')?.[0]?.length === 4) return dateStr;
    if(dateStr.split('/')?.[0]?.length === 4) return dateStr.replaceAll('/', '-');
    let {day, month, year} = this.getDayMonthYear(dateStr);

    
    return `${year}-${month}-${day}`; // Format YYYY-MM-DD
  };

  // ================= Transaction Type Extraction ====================
  // Patterns to detect if a message is a debit/credit/other type.
  static transactionTypeRegexes = [
    /\bdebited\b/i,
    /\bcredited\b/i,
    /\bwithdrawn\b/i,
    /\bspent\b/i,
    /\bpaid\b/i,
    /\bdeposit\b/i
  ];

  static transactionLabels = {
    'debited': 'DEBIT',
    'withdrawn': 'DEBIT',
    'spent': 'DEBIT',
    'paid': 'DEBIT',
    'credited': 'CREDIT',
    'deposit': 'CREDIT',
  }

  extractTransactionType() {
    for (let regex of TransactionParser.transactionTypeRegexes) {
      const match = this.message.match(regex);
      if (match && match[0]) {
        return TransactionParser.transactionLabels[match[0].toLowerCase()];
      }
    }
    return null;
  }

  static paymentModeRegexes = {
    upi: /upi/i, // Matches "UPI" (case-insensitive)
    card: /card/i, // Matches "Card" (case-insensitive)
    cardName: /(?:visa|mastercard|rupay|amex|diners|maestro)/i, // Matches card names
  };

  extractPaymentMode(message) {
    if (!message) return null;

    // Check for UPI
    if (this.paymentModeRegexes.upi.test(message)) {
      return 'UPI';
    }

    // Check for Card
    if (this.paymentModeRegexes.card.test(message)) {
      // Check for specific card names
      const cardNameMatch = message.match(this.paymentModeRegexes.cardName);
      if (cardNameMatch) {
        return `Card (${cardNameMatch[0]})`; // Return card name if found
      }
      return 'Card'; // Generic card if no specific name is found
    }

    // Default to null if no payment mode is found
    return null;
  }

  // ================= Extract All ====================
  parseInfo(msg) {
    this.message = msg;
    return {
      amount: this.extractAmount(),
      merchant: this.extractMerchant(),
      date: this.extractDate(),
      transactionType: this.classifyTransaction(this.message),
      paymentMode: this.extractPaymentMode(),
    };
  }

  classifyTransaction = (message) => {
    const debitRegex = /(?:paid|spent|spend|withdrawn|debit|debited)/i;
    const creditRegex = /(?:deposit|deposited|credit|credited|refund|refunded|reversed|transfer|transferred)/i;
  
    if (debitRegex.test(message)) {
      return 'DEBIT';
    } else if (creditRegex.test(message)) {
      return 'CREDIT';
    } else {
      return null;
    }
  };

  async addRegexAtFront(regex, type) {
    switch(type) {
      case REGEX_TYPES.MERCHANT:
        this.merchantRegexes.unshift(regex);
        await updateRegexes(this.merchantRegexes, type);
        break;
      case REGEX_TYPES.AMOUNT:
        this.amountRegexes.unshift(regex);
        await updateRegexes(this.amountRegexes, type);
        break;
      case REGEX_TYPES.DATE:
        this.dateRegexes.unshift(regex);
        await updateRegexes(this.dateRegexes, type);
        break;
    }
  }
  async addRegexAtBack(regex, type) {
    switch(type) {
      case REGEX_TYPES.MERCHANT:
        this.merchantRegexes.push(regex);
        await updateRegexes(this.merchantRegexes, type);
        break;
      case REGEX_TYPES.AMOUNT:
        this.amountRegexes.push(regex);
        await updateRegexes(this.amountRegexes, type);
        break;
      case REGEX_TYPES.DATE:
        this.dateRegexes.push(regex);
        await updateRegexes(this.dateRegexes, type);
        break;
    }
  }
}

export default new TransactionParser();