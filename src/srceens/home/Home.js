import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import ButtonComponent from '../../components/Button';
import {DefaultStyle} from '../../utils/DefaultStyle';
import {getToken, saveToken} from '../../helper/Storage';
import {UserContext} from '../../context/UserContext';
import {PermissionsAndroid, Alert} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {transactionRegexes} from '../../helper/Regex';
import SQLite from 'react-native-sqlite-storage';
import MOCK_DATA from '../../utils/data/MOCK_DATA';
import {
  createTable,
  deleteAllExpenses,
  fetchAllExpenses,
  fetchExpensesBetweenDateRange,
  fetchExpensesByCategory,
  insertBulkExpenses,
  openDatabase,
} from '../../helper/SqlHelper';
import DonutChart from '../charts/DonutChart';
import CategoryModal from '../../components/CategoryModal';
import {CategoryColors} from '../../constants/ExpenseCategories';
import MonthlyTransactionReport from '../monthlyTransactionReport/MonthlyTransactionReport';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Chips from '../../components/Chips';
import Accordion from '../../components/Accordion';
import TooltipDonutChart from '../charts/TooltipDonutChart';
// import { Notifications } from 'react-native-notifications';

SQLite.enablePromise(true);

const ReadSMS = () => {
  useEffect(() => {
    // const requestSMSPermission = async () => {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.READ_SMS,
    //     {
    //       title: 'SMS Permission',
    //       message: 'App needs access to your SMS messages',
    //       buttonNeutral: 'Ask Me Later',
    //       buttonNegative: 'Cancel',
    //       buttonPositive: 'OK',
    //     }
    //   );

    //   console.log('requesting permission')
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     const filter = {
    //       box: 'inbox', // 'inbox' or 'sent'
    //       indexFrom: 0, // Start from the first message
    //       maxCount: 10, // Read maximum 10 messages
    //     };

    //     SmsAndroid.list(
    //       JSON.stringify(filter),
    //       (fail) => {
    //         console.log('Failed with this error: ' + fail);
    //       },
    //       (count, smsList) => {
    //         console.log('Count: ', count);
    //         console.log('SMS List: ', smsList);

    //         const messages = JSON.parse(smsList);
    //         console.log('date = ', new Date(messages[0].date))
    //         console.log('date_sent = ', new Date(messages[0].date_sent))
    //         Alert.alert('Messages', JSON.stringify(messages, null, 2));
    //       }
    //     );
    //   } else {
    //     Alert.alert('Permission Denied');
    //   }
    // };

    // requestSMSPermission();
    fetchMessages();
  }, []);

  return null;
};

const fetchMessages = async (startIndex = 0, batchSize = 10) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const filter = {
        box: 'inbox',
        indexFrom: startIndex, // Start from the given index
        maxCount: batchSize, // Fetch in batches
      };

      SmsAndroid.list(
        JSON.stringify(filter),
        fail => {
          console.log('Failed with this error: ' + fail);
        },
        (count, smsList) => {
          console.log('Fetched Messages from index:', startIndex);
          console.log('Total SMS count:', count);

          const messages = JSON.parse(smsList);
          messages.forEach((msg, i) => {
            // console.log(`Message ${startIndex + i + 1}:`, msg.body);
            categorizeTransaction(msg.body);
          });

          if (messages.length === batchSize) {
            // If we fetched the full batch, fetch the next batch recursively
            fetchMessages(startIndex + batchSize, batchSize);
          } else {
            console.log('Finished fetching all messages.');
          }
        },
      );
    } else {
      Alert.alert('Permission Denied');
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

const categorizeTransaction = message => {
  message = message.toLowerCase();
  let match;
  // console.log(message)
  for (const transactionRegex of transactionRegexes) {
    match = message.match(transactionRegex);
  }
  // TODO: if don't match ask ai
  // console.log(match);
};

const Home = ({navigation}) => {
  const handleMakePayment = () => {
    navigation.navigate('Payment');
  };

  const handleLogout = async () => {
    await saveToken(null);
    navigation.reset({
      index: 0,
      routes: [{name: 'SignIn'}],
    });
  };

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await openDatabase(); // Wait for the database to open
        await createTable(); // Create the table using the opened DB instance
        // await insertInitialExpenses(); // Insert data if needed (optional)
      } catch (error) {
        console.error('Database setup error:', error);
      }
    };

    setupDatabase(); // Call the async function
  }, []);

  const insertInitialExpenses = async () => {
    await insertBulkExpenses(MOCK_DATA);
  };
  let currentMonth = 1;
  const fetchData = async () => {
    // const expenses = await fetchExpensesByCategory('food');
    currentMonth++;
    console.log(currentMonth);
    const expenses = await fetchExpensesBetweenDateRange(
      `2024-01-01`,
      `2024-0${currentMonth}-30`,
    );
    const totalAmount = expenses.reduce((acc, expense) => {
      acc += expense.amount;
      return acc;
    }, 0);
    console.log('total expense = ', totalAmount);
    generateData(expenses);
    return expenses;
  };

  const clearData = async () => {
    await deleteAllExpenses();
  };

  const sendNotification = () => {

    // Notifications.postLocalNotification({
    //   title: "Local Notification",
    //   body: "This is a local notification.",
    // });

  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{paddingBottom: 10}}>
        <MonthlyTransactionReport />
        
        <ReadSMS />
        {/* <Chips /> */}
        {/* <ButtonComponent
          label={'Fill database with mock'}
          onPress={insertInitialExpenses}
        /> */}
        {/* <TooltipDonutChart />
        <CustomButton
          title="Contained Button"
          mode="contained"
          onPress={async () => {
            const expenses = await fetchAllExpenses();
            console.log(expenses);
          }}
          icon={<Icon name="camera" size={20} color="#ffffff" />}
        /> */}
        {/* <ButtonComponent label={'Fetch data'} onPress={fetchData} /> */}
        {/* <ButtonComponent label={'Clear Data'} onPress={clearData} /> */}
        <ButtonComponent label={'Send Notification'} onPress={sendNotification} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
