import React, { useEffect, useState } from 'react';
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
import { useUserGreeting } from '../../../libs/getUserGreetings';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/userSlice';
import { SvgXml } from 'react-native-svg';
import { calendarIcon } from '../../../assets/icons';
import { getExpensesFromFirestore } from '../../../hooks/ExpenseFunction';
import BudgetDateRange from '../../../components/BudgetDateRange/BudgetDateRange';

const Home = ({ navigation }) => {
  const { name, greeting } = useUserGreeting();
  const user = useSelector(selectUser);
  console.log(user);
  console.log('User Created At:', user?.createdAt);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleDateChange = (date, type) => {
    if (type === 'start') {
      setStartDate(date);
    } else if (type === 'end') {
      setEndDate(date);
    }
  };
  const [selectedDate, setSelectedDate] = useState(
    new Date().setHours(0, 0, 0, 0),
  );

  const [expenses, setExpenses] = useState([]); // State to hold expenses

  useEffect(() => {
    // Fetch expenses when the component is mounted
    const fetchExpenses = async () => {
      const fetchedExpenses = await getExpensesFromFirestore();
      setExpenses(fetchedExpenses.slice(0, 2)); // Set fetched expenses to state
    };

    fetchExpenses();
  }, []); // Empty dependen
  const handleDateSelect = date => {
    setSelectedDate(date);
    // Navigate to Calendar screen with selected date
    navigation.navigate('Calendar', { selectedDate: date });
  };

  const handleAddExpense = () => {
    // Navigate to add expense screen
    navigation.navigate('AddExpense');
  };

  const handleScanBill = () => {
    // Navigate to scan bill screen
    console.log('Scan Bill');
  };

  const handleAddEvent = () => {
    // Navigate to voice input screen
    navigation.navigate('AddEvents');
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        initial={name.charAt(0).toUpperCase()}
        greeting={greeting} // dynamic greeting
        userName={name}
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
        <BudgetCard
          totalBudget={user?.monthlyBudget}
          spentPercentage={30}
          currency="PKR"
        />
        {/* Budget Date Range - Added here */}
        <BudgetDateRange onDateChange={handleDateChange} />
        {/* Display Budget Date Range */}
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
        {/* Dynamically render ExpenseItems */}
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <ExpenseItem
              key={index}
              icon={expense.icon || '💸'} // Default icon if not provided
              category={expense.category}
              title={expense.title}
              amount={`${expense.amount} PKR`}
            />
          ))
        ) : (
          <NativeText>No expenses found for today.</NativeText>
        )}
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
            icon={<SvgXml xml={calendarIcon} />}
            label="Add Events"
            onPress={handleAddEvent}
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
