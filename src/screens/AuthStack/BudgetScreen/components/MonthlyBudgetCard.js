import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { budgetIcon } from '../../../../assets/icons';
import NativeText from '../../../../components/NativeText/NativeText';
import { styles } from '../style';

const MonthlyBudgetCard = ({ monthlyBudget, totalSpent }) => {
  const remainingBudget = Math.max(0, monthlyBudget - totalSpent);

  const spentPercentage = monthlyBudget
    ? Math.min((totalSpent / monthlyBudget) * 100, 100)
    : 0;

  return (
    <View style={[styles.card, styles.monthlyBudgetCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.labelContainer}>
          <View style={styles.iconWrapper}>
            <SvgXml xml={budgetIcon} width={18} height={18} color="#A0A0A0" />
          </View>
          <NativeText style={styles.label}>Monthly Budget</NativeText>
        </View>
      </View>

      <View style={styles.amountRow}>
        <NativeText style={styles.mainAmount}>
          {monthlyBudget.toLocaleString()}
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
            {remainingBudget.toLocaleString()}
          </NativeText>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressFill, { width: `${spentPercentage}%` }]} />
      </View>

      <NativeText style={styles.progressText}>
        {spentPercentage.toFixed(0)}% Used
      </NativeText>
    </View>
  );
};

export default MonthlyBudgetCard;
