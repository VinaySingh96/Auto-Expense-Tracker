import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/CustomTabBar';
import Home from '../srceens/home/Home';
import Transactions from '../srceens/transactions/Transactions';
import AddAnExpense from '../srceens/addExpense/AddAnExpense';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Analysis"
        component={Home}
        // props={{title: "Analysis"}}
        options={{tabBarIcon: 'chart-donut', headerShown: false}}
      />
      <Tab.Screen
        name="Add"
        component={AddAnExpense}
        options={{tabBarIcon: 'plus', headerShown: false}}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        // title="Transactions"
        options={{tabBarIcon: 'account-cash-outline', headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
