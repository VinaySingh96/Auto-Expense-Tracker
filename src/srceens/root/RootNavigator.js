import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../home/Home';
import SignInScreen from '../signIn/SignIn';
import { getToken } from '../../helper/Storage';
import OtpScreen from '../otp/OtpScreen';
import SignUpScreen from '../signUp/SignUp';
// import PaymentScreen from '../payment/Payment';
import { UserContext } from '../../context/UserContext';
import { fetchUserProfile } from '../../api/user';
import TabNavigator from '../../navigator/TabNavigator';
import 'react-native-gesture-handler';
// import { notificationService } from '../../services/NotificationService';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Manage authentication state
  const {setUser} = useContext(UserContext);

  useEffect(() => {
    // const checkToken = async () => {
    //   try {
    //     const token = await getToken();

    //     if (!token) setIsAuthenticated(false);
    //     else {
    //       const response = await fetchUserProfile(token);
    //       setUser(response.user)
    //       setIsAuthenticated(true);
    //     }
    //   } catch (error) {
    //     console.error('Error checking token:', error);
    //     setIsAuthenticated(false);
    //   }
    // };

    // checkToken(); // Run the check when the app starts

    // notificationService.configure();
  }, []);

  if (isAuthenticated === null) {
    return null; // Optionally, you can render a loading indicator while checking the token
  }

  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={isAuthenticated ? 'Home' : 'SignIn'}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator> */}
      <TabNavigator />
      
    </NavigationContainer>
  );
};

export default RootNavigator;
