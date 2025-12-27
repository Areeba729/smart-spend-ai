import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { Theme } from '../libs';
import {
  selectIsAuthenticated,
  selectIsProfileComplete,
} from '../redux/slices/userSlice';
import AuthStack from './AuthStack';
import UnAuthStack from './UnAuthStack';

export default function AppNavigation() {
  const { themeMode } = useSelector(state => state.themeReducer);

  const isProfileComplete = useSelector(selectIsProfileComplete);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const isSignedIn = isProfileComplete && isAuthenticated;

  const scheme = useColorScheme();
  let isDarkMode =
    (themeMode !== 'light' && scheme === 'dark') || themeMode === 'dark';
  const { colors } = Theme;
  // My Theme will auto apply colors to background and text based on theme, otherwise you can also use color as desired in your file
  const MyTheme = {
    dark: isDarkMode,
    colors: {
      primary: colors.primary,
      background: isDarkMode ? colors.dark : colors.white,
      card: isDarkMode ? colors.dark : colors.white,
      text: isDarkMode ? colors.white : colors.text,
      border: isDarkMode ? colors.border : colors.grey,
      notification: colors.primary,
      transparent: isDarkMode
        ? colors.darkTransparent
        : colors.lightTransparent,
    },
    fonts: {
      regular: {
        fontFamily: 'Poppins-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Poppins-Medium',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
      },
      heavy: {
        fontFamily: 'Poppins-Bold',
        fontWeight: '900',
      },
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      {isSignedIn ? <AuthStack /> : <UnAuthStack />}
    </NavigationContainer>
  );
}
