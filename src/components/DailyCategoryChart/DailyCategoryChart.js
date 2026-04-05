import React, { useMemo } from 'react';
import { View } from 'react-native';
import NativeText from '../NativeText/NativeText';
import styles from './style';

const CATEGORY_COLORS = [
  '#86AE12',
  '#5688A9',
  '#FF9800',
  '#9AC23C',
  '#E91E63',
  '#607D8B',
  '#4E6F66',
  '#1C1C1E',
];

/**
 * Easy-to-understand daily spending: total + one row per category with amount and bar.
 * @param {{ categoryTotals: Record<string, number> }} props
 */
const DailyCategoryChart = ({ categoryTotals }) => {
  const { totalAmount, items } = useMemo(() => {
    const entries = Object.entries(categoryTotals || {}).filter(
      ([_, value]) => value > 0
    );
    const total = entries.reduce((sum, [, value]) => sum + value, 0);
    if (entries.length === 0) {
      return { totalAmount: 0, items: [] };
    }
    const list = entries.map(([name, amount], index) => ({
      name,
      amount,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      percent: total > 0 ? (amount / total) * 100 : 0,
    }));
    return { totalAmount: total, items: list };
  }, [categoryTotals]);

  const isEmpty = items.length === 0;

  return (
    <View style={styles.container}>
      <NativeText style={styles.title}>Today's spending</NativeText>
      <NativeText style={styles.subtitle}>
        Amount spent in each category. Longer bar = more spent.
      </NativeText>

      {!isEmpty && (
        <View style={styles.totalBox}>
          <NativeText style={styles.totalLabel}>Total today</NativeText>
          <NativeText style={styles.totalAmount}>PKR {totalAmount.toFixed(0)}</NativeText>
        </View>
      )}

      {items.length > 0 ? (
        <View style={styles.list}>
          {items.map((item) => (
            <View key={item.name} style={styles.row}>
              <View style={styles.rowTop}>
                <View style={[styles.dot, { backgroundColor: item.color }]} />
                <NativeText style={styles.categoryName}>{item.name}</NativeText>
                <NativeText style={styles.amount}>
                  PKR {item.amount.toFixed(0)}
                </NativeText>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${Math.min(item.percent, 100)}%`,
                      backgroundColor: item.color,
                    },
                  ]}
                />
              </View>
              <NativeText style={styles.percentText}>{item.percent.toFixed(0)}% of total</NativeText>
            </View>
          ))}
        </View>
      ) : (
        <NativeText style={styles.placeholderText}>
          No expenses today. Add an expense to see your spending here.
        </NativeText>
      )}
    </View>
  );
};

export default DailyCategoryChart;
