import React from 'react';
import { View, Text } from 'react-native';
import NativeText from '../../NativeText/NativeText';
import styles from './BudgetCardStyles';

const BudgetCard = ({ totalBudget, spentPercentage, currency = 'PKR' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <NativeText style={styles.label}>Total Budget</NativeText>
        <NativeText style={styles.currencyBadge}>{currency}</NativeText>
      </View>

      <NativeText style={styles.amount}>
        {totalBudget.toLocaleString()}
      </NativeText>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${spentPercentage}%` }]}
          />
        </View>
      </View>

      <View style={styles.messageContainer}>
        <View style={styles.dot} />
        <NativeText style={styles.message}>
          23 din mein aap ne{' '}
          <NativeText style={styles.highlight}>30% budget</NativeText> use kar
          liya hai.
        </NativeText>
      </View>
    </View>
  );
};

export default BudgetCard;
