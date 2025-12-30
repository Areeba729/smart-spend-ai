import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import NativeText from '../../NativeText/NativeText';
import styles from './StatCardStyles';

const StatCard = ({ icon, label, amount, iconColor, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <NativeText style={[styles.icon, { color: iconColor }]}>
          {icon}
        </NativeText>
        <NativeText style={styles.label}>{label}</NativeText>
      </View>
      <NativeText style={styles.amount}>{amount}</NativeText>
    </TouchableOpacity>
  );
};

export default StatCard;
