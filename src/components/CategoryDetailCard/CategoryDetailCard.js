import React from 'react';
import { View } from 'react-native';
import NativeText from '../NativeText/NativeText';
import { styles } from './style';

const CategoryDetailCard = ({
  icon = '🍔',
  budgetAmount = 50000,
  remainingAmount = 12500,
  spentAmount = 37500,
  percentageUsed = 75,
  daysToReset = 5,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <View style={styles.iconWrapper}>
            <NativeText style={styles.cardEmoji}>{icon}</NativeText>
          </View>
          <View>
            <NativeText style={styles.titleLabel}>Monthly Budget</NativeText>
            <NativeText style={styles.mainAmount}>
              PKR {budgetAmount.toLocaleString()}
            </NativeText>
          </View>
        </View>
        <View style={styles.badge}>
          <NativeText style={styles.badgeEmoji}>📈</NativeText>
          <NativeText style={styles.badgeText}>High Spend</NativeText>
        </View>
      </View>

      <View style={styles.remainingSection}>
        <NativeText style={styles.remainingLabel}>Remaining</NativeText>
        <NativeText style={styles.remainingAmount}>
          PKR {remainingAmount.toLocaleString()}
        </NativeText>
      </View>

      <View style={styles.progressInfoRow}>
        <NativeText style={styles.percentageText}>
          {percentageUsed}% Used
        </NativeText>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${percentageUsed}%` }]} />
      </View>

      <View style={styles.footerRow}>
        <NativeText style={styles.footerText}>
          Spent: PKR {spentAmount.toLocaleString()}
        </NativeText>
        <NativeText style={styles.footerText}>
          Reset: {daysToReset} Days
        </NativeText>
      </View>
    </View>
  );
};

export default CategoryDetailCard;
