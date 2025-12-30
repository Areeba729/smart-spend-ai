import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import NativeText from '../../NativeText/NativeText';
import styles from './ExpenseItemStyles';

const ExpenseItem = ({ icon, category, location, amount, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <NativeText style={styles.icon}>{icon}</NativeText>
        </View>
        <View style={styles.textContainer}>
          <NativeText style={styles.category}>{category}</NativeText>
          <NativeText style={styles.location}>{location}</NativeText>
        </View>
      </View>
      <NativeText style={styles.amount}>{amount}</NativeText>
    </TouchableOpacity>
  );
};

export default ExpenseItem;
