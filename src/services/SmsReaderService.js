import {PermissionsAndroid, Alert, Platform} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {
  amountDebitedRegexes,
  dateRegexes,
  merchantRegexes,
} from '../helper/Regex';
import {ExpenseCategories} from '../constants/ExpenseCategories';
import {insertExpense} from '../helper/SqlHelper';
import {saveValue, getValue} from '../helper/Storage';
import {convertDate} from '../utils/helper';
import { useModal } from '../context/ModalContext';
import ManualEntryModal from '../components/ManualEntryModal';

class SmsService {
  constructor() {
    this.merchantRegexes = merchantRegexes;
    this.amountDebitedRegexes = amountDebitedRegexes;
    this.dateRegexes = dateRegexes;
    this.lastReadTimestampKey = 'lastReadTimestamp';
  }

  async requestSMSPermission() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: 'SMS Permission',
            message:
              'App needs access to your SMS messages to analyze transactions.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS?.GRANTED;
      }
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  }

  async analyseSMS() {
    const hasPermission = await this.requestSMSPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Please enable SMS permission to analyze your transactions.',
      );
      return;
    }

    const lastReadTimestamp = await getValue(this.lastReadTimestampKey);

    const currentTimeStamp = await this.fetchMessages(null, 1);
    await saveValue(this.lastReadTimestampKey, currentTimeStamp);
    await this.fetchMessages(lastReadTimestamp);
    return;
  }

  async fetchMessages(readFromDate = null, batchSize = 1000, startIndex = 0) {
    console.log({startIndex});
    const filter = {
      box: 'inbox',
      ...(readFromDate && {minDate: readFromDate + 10}),
      indexFrom: startIndex,
      maxCount: batchSize,
    };

    try {
      const messages = await new Promise((resolve, reject) => {
        SmsAndroid.list(
          JSON.stringify(filter),
          fail => reject(`Failed to fetch SMS: ${fail}`),
          (count, smsList) => {
            if (!smsList) return resolve([]);
            console.log(`Fetched ${count} messages.`);
            resolve(JSON.parse(smsList));
          },
        );
      });

      if (messages.length === 0) {
        console.log('No new messages to process.');
        return;
      }

      for (const msg of messages) {
        if (batchSize === 1) return msg.date;
        await this.categorizeTransaction(msg.body);
      }

      // Recursive fetch if full batch was retrieved
      if (messages.length === batchSize) {
        await this.fetchMessages(
          readFromDate,
          batchSize,
          startIndex + batchSize,
        );
      } else {
        console.log('Finished fetching all messages.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async categorizeTransaction(transactionMessage) {
    // const isDebitTransaction = /debit(ed)?/i.test(transactionMessage);
    // if (!isDebitTransaction) return;
    console.log(transactionMessage);
    let merchant = 'Unknown',
      amount,
      date;
    // Extract Merchant
    for (const merchantRegex of this.merchantRegexes) {
      const merchantMatch = transactionMessage.match(merchantRegex);
      if (merchantMatch) {
        console.log({merchantMatch});
        merchant = merchantMatch ? merchantMatch[1].trim() : null;
        break;
      }
    }

    // Extract Amount Debited
    for (const amountDebitedRegex of this.amountDebitedRegexes) {
      const amountMatch = transactionMessage.match(amountDebitedRegex);
      if (amountMatch) {
        amount = amountMatch ? amountMatch[1].trim() : null;
        break;
      }
    }

    // Extract Date
    for (const dateRegex of this.dateRegexes) {
      const dateMatch = transactionMessage.match(dateRegex);
      if (dateMatch) {
        date = dateMatch ? dateMatch[0].trim() : null;
        break;
      }
    }

    console.log({merchant, amount, date});
    if (!merchant || !amount || !date || merchant === 'Unknown') {
      const { showModal } = useModal();
      showModal(ManualEntryModal, {
        visible: true,
        initialValues: { merchant, amount, date },
        onSave: (data) => {
          merchant = data.merchant;
          amount = data.amount;
          date = data.date;
          console.log('User entered:', merchant, amount, date);
        },
        onClose: () => console.log('Modal closed'),
      });

      if (!userInputs) {
        console.log('User canceled manual entry.');
        return;
      }

      merchant = userInputs.merchant;
      amount = userInputs.amount;
      date = userInputs.date;
    }

    date = convertDate(date);
    amount = Number(amount);
    const category = this.getCategoryByMerchant(merchant);

    console.log({merchant, amount, date, category});
    await insertExpense({
      merchant,
      amount,
      date,
      category,
      sub_category: category,
    });
  }

  getCategoryByMerchant(merchant) {
    for (const category of Object.keys(ExpenseCategories)) {
      const merchantsInLowerCase = ExpenseCategories[category]?.merchants?.map(
        str => str.toLowerCase(),
      );
      if (merchantsInLowerCase.includes(merchant)) {
        return category;
      }
    }

    const merchantParts = merchant.split(/\s+/); // Split by space
    for (const part of merchantParts) {
      for (const category of Object.keys(ExpenseCategories)) {
        const merchantsInLowerCase = ExpenseCategories[
          category
        ]?.merchants?.map(str => str.toLowerCase());
        if (merchantsInLowerCase.includes(part.toLowerCase())) {
          return category; // Return the first match found
        }
      }
    }

    return 'Unknown';
  }
}

export default new SmsService();
