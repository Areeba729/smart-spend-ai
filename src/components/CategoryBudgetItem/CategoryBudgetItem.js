import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import NativeText from '../NativeText/NativeText';
import { editIcon } from '../../assets/icons';
import { styles } from './style';

const CategoryBudgetItem = ({
  icon,
  iconBg = 'rgba(134, 174, 18, 0.15)',
  title,
  spent,
  totalLimit,
  onEditPress,
  onPress,
}) => {
  const percentageUsed = Math.round((spent / totalLimit) * 100);
  const isOverbudget = spent > totalLimit;
  const remaining = totalLimit - spent;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, isOverbudget && styles.overbudgetContainer]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={[styles.iconWrapper, { backgroundColor: iconBg }]}>
          <NativeText style={styles.largeEmoji}>{icon}</NativeText>
        </View>
        <View style={styles.titleWrapper}>
          <NativeText style={styles.title}>{title}</NativeText>
          <NativeText
            style={[styles.subtitle, isOverbudget && styles.overbudgetSubtitle]}
          >
            {isOverbudget
              ? `Over budget by ${percentageUsed - 100}%`
              : `${percentageUsed}% of budget used`}
          </NativeText>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
          <SvgXml xml={editIcon} width={18} height={18} color="#A0A0A0" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            isOverbudget && styles.overbudgetProgressBar,
            { width: `${Math.min(percentageUsed, 100)}%` },
          ]}
        />
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <NativeText style={styles.detailLabel}>Spent</NativeText>
          <NativeText
            style={[styles.detailValue, isOverbudget && styles.overbudgetValue]}
          >
            PKR {spent.toLocaleString()}
          </NativeText>
        </View>
        <View style={[styles.detailItem, styles.centerAlign]}>
          <NativeText style={styles.detailLabel}>Total Limit</NativeText>
          <NativeText style={styles.detailValue}>
            PKR {totalLimit.toLocaleString()}
          </NativeText>
        </View>
        <View style={[styles.detailItem, styles.flexEndAlign]}>
          <NativeText style={styles.detailLabel}>
            {isOverbudget ? 'Overspent' : 'Remaining'}
          </NativeText>
          <NativeText
            style={[
              styles.detailValue,
              isOverbudget ? styles.overbudgetValue : styles.remainingValue,
            ]}
          >
            {isOverbudget ? '-' : ''}PKR {Math.abs(remaining).toLocaleString()}
          </NativeText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryBudgetItem;
