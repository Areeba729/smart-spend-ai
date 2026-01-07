// screens/Reports/components/ExpenseChart/ExpenseChart.js
import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import styles from './style';
import { scale } from 'react-native-size-matters';

const screenWidth = Dimensions.get('window').width;

const ExpenseChart = ({
  monthlyBudget,
  totalSpent,
  remainingBudget,
  isBudgetAtRisk,
}) => {
  const user = useSelector(selectUser);
  const progress = (totalSpent / monthlyBudget) * 100;

  const chartData = {
    labels: ['Start', 'Mid', 'End'],
    datasets: [
      {
        data: [0, totalSpent / 2, totalSpent],
        color: () => (isBudgetAtRisk ? 'red' : 'green'), // Line color based on risk
        strokeWidth: 2, // Optional
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Expense Trend</Text>
          <Text style={styles.amount}>PKR {monthlyBudget || '0'}</Text>
        </View>

        <View style={styles.percentageBadge}>
          <Text style={styles.percentageText}>
            {progress.toFixed(2)}% Spent
          </Text>
        </View>
      </View>

      {/* Dynamic Chart */}
      <View style={styles.graphWrapper}>
        <LineChart
          data={chartData}
          width={screenWidth - 40} // Adjust width
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#f7f7f7',
            backgroundGradientTo: '#e3e3e3',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            alignItems: 'center',
          }}
        />
      </View>

      {/* Y-axis Label */}
      <Text style={styles.yAxisLabel}>Amount Spent (PKR)</Text>

      {/* Alert for Budget Risk */}
      {isBudgetAtRisk && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>
            Warning: Your budget is at risk of being exceeded!
          </Text>
        </View>
      )}

      {/* Remaining Budget */}
      <View style={styles.footer}>
        <Text style={styles.remainingText}>
          Remaining: PKR {remainingBudget.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

ExpenseChart.propTypes = {
  monthlyBudget: PropTypes.number.isRequired,
  totalSpent: PropTypes.number.isRequired,
  remainingBudget: PropTypes.number.isRequired,
  isBudgetAtRisk: PropTypes.bool.isRequired,
};

export default ExpenseChart;
