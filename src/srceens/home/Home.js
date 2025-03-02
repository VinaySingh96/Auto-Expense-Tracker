import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import ButtonComponent from '../../components/Button';
import {getToken, saveToken, saveValue} from '../../helper/Storage';
import {UserContext} from '../../context/UserContext';
import {PermissionsAndroid, Alert, Platform} from 'react-native';
import MOCK_DATA from '../../utils/data/MOCK_DATA';
import {
  createExpenseTable,
  createRegexTable,
  deleteAllExpenses,
  // fetchExpensesBetweenDateRange,
  insertBulkExpenses,
  openDatabase,
} from '../../helper/SqlHelper';
import MonthlyTransactionReport from '../monthlyTransactionReport/MonthlyTransactionReport';
import NotificationService from '../../services/NotificationService';
// import SmsService from '../../services/SmsReaderService';
import { THEME_COLOR } from '../../constants/Colour';
import useSmsService from '../../hooks/useSmsService';

let notificationService = new NotificationService();

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [smsPermissionGranted, setSmsPermissionGranted] = useState(false);
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

  const { analyzeSMS, requestSMSPermission } = useSmsService();
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await openDatabase(); // Wait for the database to open
        await createExpenseTable(); // Create the table using the opened DB instance
        await createRegexTable();
        console.log('Database setup completed successfully');
      } catch (error) {
        console.error('Database setup error:', error);
      }
    };

    const setupPermissions = async () => {
      await requestNotificationPermission();
      const permissionGranted = await requestSMSPermission();
      setSmsPermissionGranted(prev => permissionGranted);
    }

    const scheduleMonthEndNotification = () => {
      notificationService.scheduleMonthEndReportNotification();
      notificationService.scheduleDailyNotification();
    }

    const setupApp = async () => {
      if(smsPermissionGranted){
        setLoading(true);
        await analyzeSMS();
        setLoading(false);
        setUpdateFlag(prevFlag => !prevFlag);
      }
    };

    setupDatabase(); // Call the async function
    setupPermissions();
    setupApp();

    notificationService.cancelAllScheduledNotification();
    scheduleMonthEndNotification();
  }, [smsPermissionGranted]);

  const insertInitialExpenses = async () => {
    await insertBulkExpenses(MOCK_DATA);
  };
  let currentMonth = 1;
  // const fetchData = async () => {
  //   currentMonth++;
  //   const expenses = await fetchExpensesBetweenDateRange(
  //     `2024-01-01`,
  //     `2024-0${currentMonth}-30`,
  //   );
  //   const totalAmount = expenses.reduce((acc, expense) => {
  //     acc += expense.amount;
  //     return acc;
  //   }, 0);
  //   console.log('total expense = ', totalAmount);
  //   generateData(expenses);
  //   return expenses;
  // };

  const clearData = async () => {
    await deleteAllExpenses();
    await saveValue('lastReadTimestamp', null);
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
      <ScrollView contentContainerStyle={{paddingBottom: 10}}>
        <MonthlyTransactionReport updateFlag={updateFlag} />
        
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
        {/* <ButtonComponent label={'Send Notification'} onPress={showNotification} />
        <ButtonComponent label={'Schedule Notification'} onPress={scheduleNotification} /> */}
        
        <View style={{marginTop: 10, marginBottom: 100}}>
        <ButtonComponent label={'Clear Data'} onPress={clearData} />
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Analysing Expenses...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject, // Makes it cover the whole screen
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10, // Space between loader and text
    fontSize: 18, // Increase text size
    fontWeight: 'bold', // Make it bold
    color: THEME_COLOR.primary, // White text for visibility
    textAlign: 'center',
  },
})

export default Home;
