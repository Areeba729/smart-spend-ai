import React, { useMemo, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { SvgXml } from 'react-native-svg';
import { groupByDay } from '../../utils/reportCalculationUtils';
import { getWeekStart, parseExpenseDate } from '../../utils/reportDateUtils';
import NativeText from '../NativeText/NativeText';
import styles from './style';

const screenWidth = Dimensions.get('window').width;

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const chevronLeftSvg = `<svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 1.5L1.5 7.5L7.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const chevronRightSvg = `<svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1.5L7.5 7.5L1.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const WeeklyBarChart = ({ transactions }) => {
  const [weekOffset, setWeekOffset] = useState(0);

  const weekStart = useMemo(() => {
    const s = getWeekStart();
    s.setDate(s.getDate() + weekOffset * 7);
    return s;
  }, [weekOffset]);

  const weekEnd = useMemo(() => {
    const e = new Date(weekStart);
    e.setDate(e.getDate() + 6);
    e.setHours(23, 59, 59, 999);
    return e;
  }, [weekStart]);

  const weekLabel = useMemo(() => {
    if (weekOffset === 0) return 'This week';
    const startMonth = MONTH_LABELS[weekStart.getMonth()];
    const endMonth = MONTH_LABELS[weekEnd.getMonth()];
    if (weekStart.getMonth() === weekEnd.getMonth()) {
      return `${startMonth} ${weekStart.getDate()} – ${weekEnd.getDate()}`;
    }
    return `${startMonth} ${weekStart.getDate()} – ${endMonth} ${weekEnd.getDate()}`;
  }, [weekOffset, weekStart, weekEnd]);

  const weeklyTransactions = useMemo(() => {
    return (transactions || []).filter(t => {
      const d = t.date instanceof Date ? t.date : parseExpenseDate(t.date);
      return d && d >= weekStart && d <= weekEnd;
    });
  }, [transactions, weekStart, weekEnd]);

  const dayTotals = useMemo(
    () => groupByDay(weeklyTransactions, weekStart),
    [weeklyTransactions, weekStart],
  );

  const chartData = useMemo(() => {
    const labels = dayTotals.map(d => d.dayLabel);
    const data = dayTotals.map(d => d.total);
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
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#2a2a2e',
      strokeWidth: 1,
    },
  };

  return (
    <View style={styles.container}>
      <NativeText style={styles.title}>Spending per day</NativeText>
      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setWeekOffset(o => o - 1)}
        >
          <SvgXml xml={chevronLeftSvg} color="#b4b4b4" width={9} height={15} />
        </TouchableOpacity>
        <NativeText style={styles.weekLabel}>{weekLabel}</NativeText>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setWeekOffset(o => o + 1)}
          disabled={weekOffset === 0}
        >
          <SvgXml
            xml={chevronRightSvg}
            color={weekOffset === 0 ? '#444444' : '#b4b4b4'}
            width={9}
            height={15}
          />
        </TouchableOpacity>
      </View>
      <BarChart
        data={chartData}
        width={screenWidth - 32}
        height={240}
        chartConfig={{ ...chartConfig, fillShadowGradient: 'rgba(154, 194, 60, 1)', fillShadowGradientOpacity: 1 }}
        style={styles.chart}
        showValuesOnTopOfBars
        showBarTops={false}
      />
    </View>
  );
};

export default WeeklyBarChart;
