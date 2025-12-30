import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import NativeText from '../../../components/NativeText/NativeText';
import BudgetCard from '../../../components/HomeComponents/BudgetCard/BudgetCard';
import CalendarWeek from '../../../components/HomeComponents/CalendarWeek/CalendarWeek';
import StatCard from '../../../components/HomeComponents/StatCard/StatCard';
import ExpenseItem from '../../../components/HomeComponents/ExpenseItem/ExpenseItem';
import AlertCard from '../../../components/HomeComponents/AlertCard/AlertCard';
import QuickActionButton from '../../../components/HomeComponents/QuickActionButton/QuickActionButton';
import AIInsightCard from '../../../components/HomeComponents/AIInsightCard/AIInsightCard';
import { Theme } from '../../../libs';
import styles from './style';
import HomeHeader from '../../../components/Header/Header';

const Home = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().setHours(0, 0, 0, 0),
  );

  const handleDateSelect = date => {
    setSelectedDate(date);
    // Navigate to Calendar screen with selected date
    navigation.navigate('Calendar', { selectedDate: date });
  };

  const handleAddExpense = () => {
    // Navigate to add expense screen
    console.log('Add Expense');
  };

  const handleScanBill = () => {
    // Navigate to scan bill screen
    console.log('Scan Bill');
  };

  const handleVoiceInput = () => {
    // Navigate to voice input screen
    console.log('Voice Input');
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        initial="A"
        greeting="Good Morning"
        userName="Alex"
        onNotificationPress={() => console.log('Notification pressed')}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Calendar Week */}
        <CalendarWeek
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        {/* Budget Card */}
        <BudgetCard totalBudget={150000} spentPercentage={30} currency="PKR" />

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <StatCard icon="💸" label="Spent" amount="45k" iconColor="#FF6B6B" />
          <StatCard
            icon="💰"
            label="Remaining"
            amount="105k"
            iconColor={Theme.colors.secondary}
          />
        </View>

        {/* Today's Expense Section */}
        <View style={styles.sectionHeader}>
          <NativeText style={styles.sectionTitle}>TODAY'S EXPENSE</NativeText>
          <TouchableOpacity
            onPress={() => navigation.navigate('DailyExpenses')}
          >
            <NativeText style={styles.viewAll}>View All</NativeText>
          </TouchableOpacity>
        </View>

        <ExpenseItem
          icon="🍔"
          category="Food"
          location="Lunch At Office"
          amount="-500 PKR"
        />
        <ExpenseItem
          icon="🚗"
          category="Travel"
          location="Uber Ride"
          amount="-300 PKR"
        />

        {/* Upcoming Alerts Section */}
        <View style={styles.sectionHeader}>
          <NativeText style={styles.sectionTitle}>UPCOMING ALERTS</NativeText>
        </View>

        <View style={styles.alertsGrid}>
          <AlertCard
            icon="🔔"
            status="In 12 days"
            statusColor="#4CD964"
            title="Eid ul Fitr"
            description="Expected extra spending"
          />
          <AlertCard
            icon="⚠️"
            status="Warning"
            statusColor="#FF3B30"
            title="Budget Alert"
            description="Reaching 75% of limit"
          />
          <AlertCard
            icon="💵"
            status="Due Today"
            statusColor="#FF9500"
            title="House Rent"
            description="Monthly payment due"
          />
          <AlertCard
            icon="📉"
            status="Insight"
            statusColor="#5AC8FA"
            title="Saving Tip"
            description="Reduce utility bills"
          />
        </View>

        {/* Quick Actions Section */}
        <View style={styles.sectionHeader}>
          <NativeText style={styles.sectionTitle}>QUICK ACTIONS</NativeText>
        </View>

        <View style={styles.quickActionsRow}>
          <QuickActionButton
            icon="+"
            label="Add Expense"
            onPress={handleAddExpense}
          />
          <QuickActionButton
            icon="📄"
            label="Scan Bill"
            onPress={handleScanBill}
            isPrimary
          />
          <QuickActionButton
            icon="🎤"
            label="Voice Input"
            onPress={handleVoiceInput}
          />
        </View>

        {/* AI Smart Insight */}
        <AIInsightCard
          title="AI Smart Insight"
          message={
            <NativeText>
              You can still spend{' '}
              <NativeText style={styles.budgetAmount}>8,500 PKR</NativeText>{' '}
              comfortably this month based on your spending habits.
            </NativeText>
          }
          actionLabel="View Details"
          onActionPress={() => navigation.navigate('Calendar')}
        />
      </ScrollView>
    </View>
  );
};

export default Home;
