import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import NativeText from '../../NativeText/NativeText';
import styles from './AIInsightCardStyles';

const AIInsightCard = ({ title, message, actionLabel, onActionPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <NativeText style={styles.icon}>✨</NativeText>
        </View>
        <NativeText style={styles.title}>{title}</NativeText>
      </View>

      <NativeText style={styles.message}>{message}</NativeText>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onActionPress}
        activeOpacity={0.7}
      >
        <NativeText style={styles.actionText}>{actionLabel}</NativeText>
        {/* <NativeText style={styles.arrow}>→</NativeText> */}
      </TouchableOpacity>
    </View>
  );
};

export default AIInsightCard;
