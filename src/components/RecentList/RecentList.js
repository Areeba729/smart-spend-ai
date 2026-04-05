// screens/Reports/components/RecentList/RecentList.js
import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { format, isToday, isYesterday } from 'date-fns';
import styles from './style';

import {
  grocerySvg,
  entertainmentSvg,
  foodSvg,
  transportSvg,
  expenseSvg,
} from '../../assets/icons';
import { getExpensesFromFirestore } from '../../hooks/ExpenseFunction';
import {
  normalizeTransactions,
  getDailyTransactions,
  getWeeklyTransactions,
} from '../../utils/reportCalculationUtils';
import { Theme } from '../../libs';

const iconMap = {
  Food: foodSvg,
  Transport: transportSvg,
  Shopping: grocerySvg,
  Medical: expenseSvg,
  Entertainment: entertainmentSvg,
  Grocery: grocerySvg,
};

const getIconForCategory = (category) =>
  iconMap[category] || expenseSvg;

const formatRecentTime = (date) => {
  if (!date || !(date instanceof Date)) return '';
  if (isToday(date)) return `Today, ${format(date, 'h:mm a')}`;
  if (isYesterday(date)) return `Yesterday, ${format(date, 'h:mm a')}`;
  return format(date, 'MMM d, yyyy · h:mm a');
};

const RecentItem = ({ title, amount, time, description }) => (
  <View style={styles.itemContainer}>
    <View style={styles.left}>
      <View style={styles.iconWrapper}>
        <SvgXml xml={getIconForCategory(title)} width={22} height={22} />
      </View>
      <View style={styles.itemTextWrap}>
        <Text style={styles.itemTitle} numberOfLines={2}>{description || title}</Text>
        <Text style={styles.itemTime}>{time}</Text>
      </View>
    </View>
    <Text style={styles.amount}>- PKR {Number(amount).toLocaleString()}</Text>
  </View>
);

const MAX_RECENT = 10;

const RecentList = ({ mode = 'Daily', rawExpenses }) => {
  const [ownExpenses, setOwnExpenses] = useState([]);
  const [loading, setLoading] = useState(!rawExpenses);
  const isDaily = mode === 'Daily';

  const list = React.useMemo(() => {
    const raw = Array.isArray(rawExpenses) ? rawExpenses : [];
    const normalized = normalizeTransactions(raw);
    const filtered = isDaily
      ? getDailyTransactions(normalized)
      : getWeeklyTransactions(normalized);
    const sorted = [...filtered].sort(
      (a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0)
    );
    return sorted.slice(0, MAX_RECENT);
  }, [rawExpenses, isDaily]);

  const expenses = rawExpenses ? list : ownExpenses;

  useFocusEffect(
    useCallback(() => {
      if (rawExpenses != null) return;
      let mounted = true;
      const load = async () => {
        try {
          const raw = await getExpensesFromFirestore();
          const normalized = normalizeTransactions(Array.isArray(raw) ? raw : []);
          const filtered = isDaily
            ? getDailyTransactions(normalized)
            : getWeeklyTransactions(normalized);
          const sorted = [...filtered].sort(
            (a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0)
          );
          if (mounted) setOwnExpenses(sorted.slice(0, MAX_RECENT));
        } catch (e) {
          if (mounted) setOwnExpenses([]);
        } finally {
          if (mounted) setLoading(false);
        }
      };
      setLoading(true);
      load();
      return () => { mounted = false; };
    }, [isDaily, rawExpenses])
  );

  const showLoading = !rawExpenses && loading;

  const subheading = isDaily ? "Today only · most recent first" : "This week only · most recent first";

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recent Details</Text>
      <Text style={styles.subheading}>{subheading}</Text>

      {showLoading ? (
        <ActivityIndicator
          size="small"
          color={Theme.colors.secondary}
          style={{ marginVertical: 20 }}
        />
      ) : expenses.length === 0 ? (
        <Text style={styles.emptyText}>
          {isDaily ? "No transactions today" : "No transactions this week"}
        </Text>
      ) : (
        expenses.map((item) => (
          <RecentItem
            key={item.id}
            title={item.category}
            amount={item.amount}
            time={formatRecentTime(item.date)}
            description={item.description || item.category}
          />
        ))
      )}
    </View>
  );
};

export default RecentList;
