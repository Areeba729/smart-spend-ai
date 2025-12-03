import React from 'react';
import { StatusBar } from 'react-native';
const CustomStatusBar = ({
  barStyle = 'dark-content',
  backgroundColor = 'transparent',
  translucent = true,
}) => {
  return (
    <StatusBar
      barStyle={barStyle}
      backgroundColor={backgroundColor}
      translucent={translucent}
    />
  );
};
export default CustomStatusBar;
