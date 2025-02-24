import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import ButtonComponent from '../../components/Button';
import {getToken, saveToken} from '../../helper/Storage';
import {UserContext} from '../../context/UserContext';
import {PermissionsAndroid, Alert, Platform} from 'react-native';
import MOCK_DATA from '../../utils/data/MOCK_DATA';
import {
  createTable,
  deleteAllExpenses,
  fetchExpensesBetweenDateRange,
  insertBulkExpenses,
  openDatabase,
} from '../../helper/SqlHelper';
import MonthlyTransactionReport from '../monthlyTransactionReport/MonthlyTransactionReport';
import NotificationService from '../../services/NotificationService';
import SmsService from '../../services/SmsReaderService';

let notificationService = new NotificationService();

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

    const setupPermissions = async () => {
      await requestNotificationPermission();
    }

    const scheduleMonthEndNotification = () => {
      notificationService.scheduleMonthEndReportNotification();
    }

    SmsService.analyseSMS();
    setupDatabase(); // Call the async function
    setupPermissions();

    notificationService.cancelAllScheduledNotification();
    scheduleMonthEndNotification();
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

  const showNotification = async () => {
    const spentAmount = 100, merchant = 'Amazon';
    const description = `You have spent Rs. ${spentAmount} to ${merchant}. Do you want to categorize it?`
    notificationService.localNotification('Un-categorized Expense', description);
  };

  const requestNotificationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  return (
    <SafeAreaView>
      {/* <ScrollView contentContainerStyle={{paddingBottom: 10}}> */}
        <MonthlyTransactionReport />
        
        {/* <ReadSMS /> */}
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
        <ButtonComponent label={'Clear Data'} onPress={clearData} />
        {/* <View style={{marginTop: 10}}>

        <ButtonComponent label={'Send Notification'} onPress={showNotification} />
        <ButtonComponent label={'Schedule Notification'} onPress={scheduleNotification} />
        </View> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Home;
