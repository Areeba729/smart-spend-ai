// screens/Reports/Report.js
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from './style';

import ReportTabs from '../../../components/ReportTab/ReportTab';
import SummaryCard from '../../../components/SummaryCardReport/SummaryCardReport';
import DailyCategoryChart from '../../../components/DailyCategoryChart/DailyCategoryChart';
import WeeklyBarChart from '../../../components/WeeklyBarChart/WeeklyBarChart';
import AIInsightCard from '../../../components/AIInsightard/AIInsightCard';
import RecentList from '../../../components/RecentList/RecentList';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import ScreenLoader from '../../../components/ScreenLoader/ScreenLoader';
import NativeText from '../../../components/NativeText/NativeText';

import { selectUser } from '../../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { getExpensesFromFirestore } from '../../../hooks/ExpenseFunction';
import { Theme } from '../../../libs';
import {
  normalizeTransactions,
  getDailyTransactions,
  getWeeklyTransactions,
  getTotalAmount,
  groupByCategory,
  groupByDay,
  getDailyBudget,
  getWeeklyBudget,
  getBudgetUsedPercent,
} from '../../../utils/reportCalculationUtils';

const Report = () => {
  const [activeTab, setActiveTab] = useState('Daily');
  const user = useSelector(selectUser);
  const [rawExpenses, setRawExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = useCallback(async () => {
    try {
      const fetched = await getExpensesFromFirestore();
      setRawExpenses(Array.isArray(fetched) ? fetched : []);
    } catch (error) {
      console.log('Error fetching expenses:', error);
      setRawExpenses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [fetchExpenses])
  );

  const monthlyBudget = Number(user?.monthlyBudget || 0);

  const transactions = useMemo(
    () => normalizeTransactions(rawExpenses),
    [rawExpenses]
  );

  const dailyTransactions = useMemo(
    () => getDailyTransactions(transactions),
    [transactions]
  );

  const weeklyTransactions = useMemo(
    () => getWeeklyTransactions(transactions),
    [transactions]
  );

  const dailyTotal = useMemo(
    () => getTotalAmount(dailyTransactions),
    [dailyTransactions]
  );

  const weeklyTotal = useMemo(
    () => getTotalAmount(weeklyTransactions),
    [weeklyTransactions]
  );

  const dailyCategoryTotals = useMemo(
    () => groupByCategory(dailyTransactions),
    [dailyTransactions]
  );

  const weeklyCategoryTotals = useMemo(
    () => groupByCategory(weeklyTransactions),
    [weeklyTransactions]
  );

  const weeklyDayTotals = useMemo(
    () => groupByDay(weeklyTransactions),
    [weeklyTransactions]
  );

  const dailyBudgetAmount = useMemo(
    () => getDailyBudget(monthlyBudget),
    [monthlyBudget]
  );

  const weeklyBudgetAmount = useMemo(
    () => getWeeklyBudget(monthlyBudget),
    [monthlyBudget]
  );

  const dailyBudgetPercent = useMemo(
    () => getBudgetUsedPercent(dailyTotal, dailyBudgetAmount),
    [dailyTotal, dailyBudgetAmount]
  );

  const weeklyBudgetPercent = useMemo(
    () => getBudgetUsedPercent(weeklyTotal, weeklyBudgetAmount),
    [weeklyTotal, weeklyBudgetAmount]
  );

  const isDailyOverBudget = dailyBudgetAmount > 0 && dailyTotal > dailyBudgetAmount;
  const isWeeklyOverBudget = weeklyBudgetAmount > 0 && weeklyTotal > weeklyBudgetAmount;
  const isDaily = activeTab === 'Daily';
  const totalSpent = isDaily ? dailyTotal : weeklyTotal;
  const budgetPercent = isDaily ? dailyBudgetPercent : weeklyBudgetPercent;
  const budgetLabel = isDaily ? 'Daily budget' : 'Weekly budget';
  const isOverBudget = isDaily ? isDailyOverBudget : isWeeklyOverBudget;

  return (
    <View style={styles.container}>
      <SimpleHeader title="Reports" />

      {loading ? (
        <ScreenLoader color={Theme.colors.secondary} />
      ) : (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <ReportTabs activeTab={activeTab} onChange={setActiveTab} />

        {/* Statistics graph - shown first so user sees it immediately */}
        <NativeText style={styles.statisticsTitle}>Statistics</NativeText>
        {isDaily ? (
          <DailyCategoryChart categoryTotals={dailyCategoryTotals} />
        ) : (
          <WeeklyBarChart dayTotals={weeklyDayTotals} />
        )}

        {isDaily ? (
          <>
            <SummaryCard
              title="TODAY'S SPENDING"
              value={`PKR ${dailyTotal.toFixed(0)}`}
              subtitle={`${dailyBudgetPercent.toFixed(1)}% of daily budget`}
              type="expense"
            />
            <View style={styles.cardRow}>
              <SummaryCard
                title="DAILY BUDGET"
                value={`PKR ${dailyBudgetAmount.toFixed(0)}`}
                subtitle="Your daily limit"
                type="category"
              />
              <SummaryCard
                title="REMAINING"
                value={`PKR ${Math.max(0, dailyBudgetAmount - dailyTotal).toFixed(0)}`}
                subtitle="Left for today"
                type="category"
              />
            </View>
            {/* {Object.keys(dailyCategoryTotals).length > 0 && (
              <>
                <NativeText style={styles.sectionTitle}>By category today</NativeText>
                {Object.entries(dailyCategoryTotals).map(([cat, amount]) => (
                  <View key={cat} style={styles.categoryRow}>
                    <NativeText style={{ color: '#fff' }}>{cat}</NativeText>
                    <NativeText style={{ color: Theme.colors.secondary }}>
                      PKR {amount.toFixed(0)}
                    </NativeText>
                  </View>
                ))}
              </>
            )} */}
            {isDailyOverBudget && (
              <View style={[styles.alertContainer, { backgroundColor: Theme.colors.error }]}>
                <NativeText style={styles.alertText}>
                  You have exceeded your daily budget by PKR {(dailyTotal - dailyBudgetAmount).toFixed(0)}.
                </NativeText>
              </View>
            )}
          </>
        ) : (
          <>
            <SummaryCard
              title="WEEK'S SPENDING"
              value={`PKR ${weeklyTotal.toFixed(0)}`}
              subtitle={`${weeklyBudgetPercent.toFixed(1)}% of weekly budget`}
              type="expense"
            />
            <View style={styles.cardRow}>
              <SummaryCard
                title="WEEKLY BUDGET"
                value={`PKR ${weeklyBudgetAmount.toFixed(0)}`}
                subtitle="Mon–Sun limit"
                type="category"
              />
              <SummaryCard
                title="REMAINING"
                value={`PKR ${Math.max(0, weeklyBudgetAmount - weeklyTotal).toFixed(0)}`}
                subtitle="Left this week"
                type="category"
              />
            </View>
            {Object.keys(weeklyCategoryTotals).length > 0 && (
              <>
                <NativeText style={styles.sectionTitle}>By category this week</NativeText>
                {Object.entries(weeklyCategoryTotals).map(([cat, amount]) => (
                  <View key={cat} style={styles.categoryRow}>
                    <NativeText style={styles.categoryName} numberOfLines={2}>
                      {cat}
                    </NativeText>
                    <NativeText style={styles.categoryAmount}>
                      PKR {amount.toFixed(0)}
                    </NativeText>
                  </View>
                ))}
              </>
            )}
            {isWeeklyOverBudget && (
              <View style={[styles.alertContainer, { backgroundColor: Theme.colors.error }]}>
                <NativeText style={styles.alertText}>
                  You have exceeded your weekly budget by PKR {(weeklyTotal - weeklyBudgetAmount).toFixed(0)}.
                </NativeText>
              </View>
            )}
          </>
        )}

        {!isOverBudget && (isDaily ? dailyTotal > 0 : weeklyTotal > 0) && (
          <View
            style={[
              styles.alertContainer,
              { backgroundColor: Theme.colors.secondary },
            ]}
          >
            <NativeText style={styles.alertText}>
              {isDaily ? "Today's" : "This week's"} spending is within budget.
            </NativeText>
          </View>
        )}

        <AIInsightCard />
        <RecentList mode={activeTab} rawExpenses={rawExpenses} />
      </ScrollView>
      )}
    </View>
  );
};

export default Report;
