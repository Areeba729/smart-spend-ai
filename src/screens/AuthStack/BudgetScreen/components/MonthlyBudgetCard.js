import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import NativeText from '../../../../components/NativeText/NativeText';
import { budgetIcon } from '../../../../assets/icons';
import { styles } from '../style';

const MonthlyBudgetCard = ({ totalBudget = 150000, totalSpent = 45000 }) => {
  const remaining = totalBudget - totalSpent;
  const percentageUsed = Math.round((totalSpent / totalBudget) * 100);

  return (
    <View style={[styles.card, styles.monthlyBudgetCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.labelContainer}>
          <View style={styles.iconWrapper}>
            <SvgXml xml={budgetIcon} width={18} height={18} color="#A0A0A0" />
          </View>
          <NativeText style={styles.label}>Monthly Budget</NativeText>
        </View>
        <TouchableOpacity>
          <NativeText style={styles.ellipsis}>•••</NativeText>
        </TouchableOpacity>
      </View>

      <View style={styles.amountRow}>
        <NativeText style={styles.mainAmount}>
          {totalBudget.toLocaleString()}
        </NativeText>
        <NativeText style={styles.currency}>PKR</NativeText>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <NativeText style={styles.statLabel}>Total Spent</NativeText>
          <NativeText style={styles.statValue}>
            {totalSpent.toLocaleString()}
          </NativeText>
        </View>
        <View style={[styles.statItem, styles.flexEnd]}>
          <NativeText style={styles.statLabel}>Remaining</NativeText>
          <NativeText style={[styles.statValue, styles.remainingValue]}>
            {remaining.toLocaleString()}
          </NativeText>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${percentageUsed}%` }]} />
      </View>
      <NativeText style={styles.progressText}>
        {percentageUsed}% Used
      </NativeText>
    </View>
  );
};

export default MonthlyBudgetCard;
