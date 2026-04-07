import React from 'react';
import { View } from 'react-native';
import NativeText from '../../../../components/NativeText/NativeText';
import { styles } from '../style';

const LimitCard = ({ dailyLimit = 3500 }) => {
  return (
    <View style={[styles.card, styles.aiLimitCard]}>
      <View style={styles.verticalLine} />
      <View style={styles.aiIconWrapper}>
        <NativeText style={styles.mediumIcon}>🤖</NativeText>
      </View>
      <View style={styles.aiContent}>
        <NativeText style={styles.aiTitle}>AI Daily Limit</NativeText>
        <NativeText style={styles.aiDescription}>
          You can safely spend{' '}
          <NativeText style={styles.highlightText}>
            {dailyLimit.toLocaleString()} PKR
          </NativeText>{' '}
          per day to stay on track.
        </NativeText>
      </View>
    </View>
  );
};

export default LimitCard;
