import {PermissionsAndroid, Alert, Platform} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {generateRegex, trimSpecialChars} from '../helper/Regex';
import {ExpenseCategories} from '../constants/ExpenseCategories';
import {insertExpense} from '../helper/SqlHelper';
import {saveValue, getValue} from '../helper/Storage';
import {convertDate} from '../utils/helper';
import {useModal} from '../context/ModalContext';
import ManualEntryModal from '../components/ManualEntryModal';
import TransactionParserService from '../services/TransactionParserService';
import {REGEX_TYPES} from '../constants/RegexTypes';

const useSmsService = () => {
  const {showModal, hideModal} = useModal();

  const requestSMSPermission = async () => {
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
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  };

  const analyzeSMS = async () => {
    await TransactionParserService.init();

    const lastReadTimestamp = await getValue('lastReadTimestamp');

    const currentTimeStamp = await fetchMessages(null, 1);
    await saveValue('lastReadTimestamp', currentTimeStamp);
    await fetchMessages(lastReadTimestamp);
  };

  const fetchMessages = async ( readFromDate = null, batchSize = 1000, startIndex = 0) => {
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
        return;
      }

      for (const msg of messages) {
        if (batchSize === 1) return msg.date;
        await categorizeTransaction(msg.body);
      }

      if (messages.length === batchSize) {
        await fetchMessages(readFromDate, batchSize, startIndex + batchSize);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const categorizeTransaction = async transactionMessage => {
    const transactionType =
      TransactionParserService.classifyTransaction(transactionMessage);
    if (!transactionType) return;
    let {merchant, amount, date, paymentMode} =
      TransactionParserService.parseInfo(transactionMessage);

    if (!merchant || !amount || !date) {
      const userInput = await showModal(ManualEntryModal, {
        initialValues: {merchant, amount, date, transactionMessage},
      });
      if (
        !userInput ||
        !userInput.merchant ||
        !userInput.amount ||
        !userInput.date
      )
        return;

      await handleRegexGeneration(
        merchant,
        userInput.merchant,
        transactionMessage,
        REGEX_TYPES.MERCHANT,
      );

      // Handle amount regex
      await handleRegexGeneration(
        amount,
        userInput.amount,
        transactionMessage,
        REGEX_TYPES.AMOUNT,
      );

      // Handle date regex
      await handleRegexGeneration(
        date,
        userInput.date,
        transactionMessage,
        REGEX_TYPES.DATE,
      );

      // Update values with user input
      merchant = userInput.merchant.trim();
      amount = Number(userInput.amount);
      date = convertDate(userInput.date);
    }

    date = convertDate(date);
    amount = Number(amount);
    merchant = trimSpecialChars(merchant);
    const category = getCategoryByMerchant(merchant);
    await insertExpense({
      merchant,
      amount,
      date,
      category,
      sub_category: category,
    });
  };

  const getCategoryByMerchant = merchant => {
    for (const category of Object.keys(ExpenseCategories)) {
      const merchantsInLowerCase = ExpenseCategories[category]?.merchants?.map(
        str => str.toLowerCase(),
      );
      if (merchantsInLowerCase.includes(merchant.toLowerCase())) {
        return category;
      }
    }

    const merchantParts = merchant.split(/\s+/);
    for (const part of merchantParts) {
      for (const category of Object.keys(ExpenseCategories)) {
        const merchantsInLowerCase = ExpenseCategories[
          category
        ]?.merchants?.map(str => str.toLowerCase());
        if (merchantsInLowerCase.includes(part.toLowerCase())) {
          return category;
        }
      }
    }

    return 'Unknown';
  };

  const handleRegexGeneration = async (
    currentValue,
    userInputValue,
    transactionMessage,
    regexType,
  ) => {
    if (!currentValue || currentValue !== userInputValue) {
      const generatedRegex = generateRegex(transactionMessage, userInputValue);
      if (currentValue && generatedRegex) {
        await TransactionParserService.addRegexAtFront(
          generatedRegex,
          regexType,
        );
      } else {
        await TransactionParserService.addRegexAtBack(
          generatedRegex,
          regexType,
        );
      }
    }
  };

  return {analyzeSMS, requestSMSPermission};
};

export default useSmsService;
