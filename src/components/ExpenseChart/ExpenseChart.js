// screens/Reports/components/ExpenseChart/ExpenseChart.js
import React from 'react';
import { View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import styles from './style';
import { expenseGraphSvg } from '../../assets/icons';

const ExpenseChart = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Expense Trend</Text>
          <Text style={styles.amount}>PKR 125,000</Text>
        </View>

        <View style={styles.percentageBadge}>
          <Text style={styles.percentageText}>↓ 12%</Text>
        </View>
      </View>

      {/* SVG Graph */}
      <View style={styles.graphWrapper}>
        <SvgXml xml={expenseGraphSvg} width="100%" height="160" />
      </View>
    </View>
  );
};

export default ExpenseChart;
