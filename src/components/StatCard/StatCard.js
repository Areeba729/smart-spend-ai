import React from 'react';
import { View } from 'react-native';
import NativeText from '../NativeText/NativeText';
import { styles } from './style';

const StatCard = ({ icon, label, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <NativeText style={styles.icon}>{icon}</NativeText>
        <NativeText style={styles.label}>{label}</NativeText>
      </View>
      <NativeText style={styles.value}>{value}</NativeText>
    </View>
  );
};

export default StatCard;
