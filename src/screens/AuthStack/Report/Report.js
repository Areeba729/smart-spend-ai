// screens/Reports/Report.js
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './style';

import ReportTabs from '../../../components/ReportTab/ReportTab';
import SummaryCard from '../../../components/SummaryCardReport/SummaryCardReport';
import ExpenseChart from '../../../components/ExpenseChart/ExpenseChart';
import AIInsightCard from '../../../components/AIInsightard/AIInsightCard';
import RecentList from '../../../components/RecentList/RecentList';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { selectUser } from '../../../redux/slices/userSlice';
import { useSelector } from 'react-redux';

const Report = () => {
  const [activeTab, setActiveTab] = useState('Daily');
  const user = useSelector(selectUser);
  return (
    <View style={styles.container}>
      <SimpleHeader title="Reports" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <ReportTabs activeTab={activeTab} onChange={setActiveTab} />

        {/* Summary Cards */}
        <View style={styles.cardRow}>
          <SummaryCard
            title="EXPENSE"
            value={`PKR ${user ? user.expense : ''}`}
            subtitle="-12% vs last mo"
            type="expense"
          />

          <SummaryCard
            title="TOP CAT."
            value="Food & Dining"
            subtitle="PKR 45,200"
            type="category"
          />
        </View>

        {/* Expense Chart */}
        {/* <ExpenseChart /> */}

        {/* AI Insight */}
        <AIInsightCard />

        {/* Recent Transactions */}
        <RecentList />
      </ScrollView>
    </View>
  );
};

export default Report;
