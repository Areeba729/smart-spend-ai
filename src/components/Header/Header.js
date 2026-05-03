// components/HomeHeader.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import NativeText from '../NativeText/NativeText';
import styles from './style';

const HomeHeader = ({
  initial = 'A',
  greeting = 'Good Morning',
  userName = 'Alex',
  onNotificationPress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.profilePic}>
          <NativeText style={styles.profileInitial}>{initial}</NativeText>
        </View>

        <View>
          <NativeText style={styles.greeting}>{greeting}</NativeText>
          <NativeText style={styles.userName}>Hi, {userName}!</NativeText>
        </View>
      </View>

      <TouchableOpacity
        style={styles.notificationButton}
        onPress={onNotificationPress}
        hitSlop={20} 
      >
        <NativeText style={styles.notificationIcon}>🔔</NativeText>
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
