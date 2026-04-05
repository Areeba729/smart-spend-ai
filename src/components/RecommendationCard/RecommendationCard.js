import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import NativeText from '../NativeText/NativeText';
import { styles } from './style';

const RecommendationCard = ({
  recommendationRange = '140,000 - 150,000 PKR',
  onApply,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <NativeText style={styles.icon}>✨</NativeText>
        <NativeText style={styles.title}>SMART INSIGHT</NativeText>
      </View>

      <NativeText style={styles.description}>
        Based on your spending history, we recommend a safe limit of{' '}
        <NativeText style={styles.highlight}>{recommendationRange}</NativeText>.
      </NativeText>

      <TouchableOpacity style={styles.button} onPress={onApply}>
        <NativeText style={styles.buttonText}>Apply Recommendation</NativeText>
      </TouchableOpacity>
    </View>
  );
};

export default RecommendationCard;
