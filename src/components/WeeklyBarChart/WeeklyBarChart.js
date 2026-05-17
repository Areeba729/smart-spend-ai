import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import NativeText from '../NativeText/NativeText';
import styles from './style';

const screenWidth = Dimensions.get('window').width;

/**
 * Bar chart of spending per day (Mon–Sun) for the current week.
 * @param {{ dayTotals: Array<{ dayLabel: string, total: number }> }} props
 */
const WeeklyBarChart = ({ dayTotals }) => {
  const chartData = useMemo(() => {
    const labels = (dayTotals || []).map((d) => d.dayLabel);
    const data = (dayTotals || []).map((d) => d.total);
    return {
      labels: labels.length ? labels : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{ data: data.length ? data : [0, 0, 0, 0, 0, 0, 0] }],
    };
  }, [dayTotals]);

  const chartConfig = {
    backgroundColor: '#161618',
    backgroundGradientFrom: '#161618',
    backgroundGradientTo: '#161618',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(154, 194, 60, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(180, 180, 180, ${opacity})`,
    barPercentage: 0.65,
    paddingRight: 16,
    paddingTop: 28,
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#2a2a2e',
      strokeWidth: 1,
    },
    propsForHorizontalLabels: {
      textAnchor: 'start',
    },
  };

  return (
    <View style={styles.container}>
      <NativeText style={styles.title}>Spending per day this week</NativeText>
      <BarChart
        data={chartData}
        width={screenWidth - 32}
        height={240}
        chartConfig={{...chartConfig, fillShadowGradient: 'rgba(154, 194, 60, 1)', fillShadowGradientOpacity: 1,}}
        style={styles.chart}
        showValuesOnTopOfBars
        showBarTops={false}
        // yAxisSuffix=""
      />
    </View>
  );
};

export default WeeklyBarChart;
