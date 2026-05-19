import React, { useState, useEffect, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import BottomTabs from '../components/BottomTabs/BottomTabs';

import Home from '../screens/AuthStack/Home/Home';
import Budget from '../screens/AuthStack/BudgetScreen/BudgetScreen';
import Report from '../screens/AuthStack/Report/Report';
import ProfileScreen from '../screens/AuthStack/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

const getCurrentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const getCurrentMonthDateRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return { startDate: start, endDate: end };
};

const isDateInRange = (date, start, end) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const s = new Date(start);
  s.setHours(0, 0, 0, 0);
  const e = new Date(end);
  e.setHours(23, 59, 59, 999);
  return d >= s && d <= e;
};

const getEffectiveBudgetRange = (startDate, endDate) => {
  const today = new Date();
  if (startDate && endDate && isDateInRange(today, startDate, endDate)) {
    return { startDate, endDate };
  }
  return getCurrentMonthDateRange();
};

const fetchEffectiveBudgetRange = async () => {
  const firebaseUser = auth().currentUser;
  if (!firebaseUser?.uid) return null;

  const userDoc = await firestore()
    .collection('users')
    .doc(firebaseUser.uid)
    .get();

  if (!userDoc.exists) return null;

  const userData = userDoc.data();
  const currentMonth = getCurrentMonthKey();
  const budgets = userData.budgets || {};

  let budgetAmount = null;
  if (budgets[currentMonth] !== undefined) {
    budgetAmount = Number(budgets[currentMonth]);
  } else if (userData.monthlyBudget) {
    budgetAmount = Number(userData.monthlyBudget);
  }

  if (budgetAmount === null || budgetAmount <= 0) return null;

  let start = userData.startDate?._seconds
    ? new Date(userData.startDate._seconds * 1000)
    : null;
  let end = userData.endDate?._seconds
    ? new Date(userData.endDate._seconds * 1000)
    : null;

  return getEffectiveBudgetRange(start, end);
};

const TabNavigator = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hide = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const tabs = {
    Home,
    Budget,
    Report,
    ProfileScreen,
  };

  const handlePlusPress = useCallback(async navigation => {
    const parentNav = navigation.getParent();
    if (!parentNav) return;

    try {
      const budget = await fetchEffectiveBudgetRange();
      if (!budget) {
        Toast.show({
          type: 'error',
          text1: 'Budget Blocked',
          text2:
            'No budget set for this month. Please set your monthly budget.',
          position: 'top',
        });
        return;
      }

      parentNav.navigate('AddExpense', { budget });
    } catch (error) {
      console.error('Error opening Add Expense:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not open Add Expense. Please try again.',
        position: 'top',
      });
    }
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props =>
        keyboardVisible ? null : (
          <BottomTabs
            activeTab={props.state.routes[props.state.index].name}
            onTabPress={name => props.navigation.navigate(name)}
            onPlusPress={() => handlePlusPress(props.navigation)}
          />
        )
      }
      screenOptions={{
        headerShown: false,
      }}
    >
      {Object.entries(tabs).map(([name, component]) => (
        <Tab.Screen key={name} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
