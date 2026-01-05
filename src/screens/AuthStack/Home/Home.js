import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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
import { fetchUserEvents } from '../../../hooks/fetchUserEvents';
import firestore from '@react-native-firebase/firestore';

const Home = ({ navigation }) => {
  const { name, greeting } = useUserGreeting();
  const user = useSelector(selectUser);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false); // State for loader

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

  // calculate daily limit

  const calculateDailyLimit = () => {
    if (!startDate || !endDate || !user?.monthlyBudget) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Ensure valid date range
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      return 0;
    }

    // Calculate difference in milliseconds
    const diffTime = end.getTime() - start.getTime();

    // Calculate days difference (+1 to include both start and end dates)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays <= 0) return 0;

    return user.monthlyBudget / diffDays;
  };

  const dailyLimit = calculateDailyLimit();

  const [expenses, setExpenses] = useState([]); // State to hold expenses
  const [totalSpent, setTotalSpent] = useState(0); // State to hold total spent

  const parseDate = dateField => {
    if (!dateField) return null; // Skip invalid or undefined date fields

    if (typeof dateField === 'string') {
      // Handle string format (e.g., DD-MM-YYYY)
      const [day, month, year] = dateField.split('-');
      return new Date(`${year}-${month}-${day}`); // Convert to YYYY-M
      // M-DD format
    }

    if (typeof dateField === 'object' && dateField._seconds) {
      // Handle Firestore timestamp
      return new Date(dateField._seconds * 1000);
    }

    return null; // Skip unsupported formats
  };

  useEffect(() => {
    // Fetch expenses when the component is mounted
    const fetchExpenses = async () => {
      setLoading(true); // Show loader
      try {
        const fetchedExpenses = await getExpensesFromFirestore();
        const today = new Date();
        const filteredExpenses = fetchedExpenses.filter(expense => {
          const expenseDate = parseDate(expense.date); // Parse the date field
          return (
            expenseDate &&
            expenseDate.getDate() === today.getDate() &&
            expenseDate.getMonth() === today.getMonth() &&
            expenseDate.getFullYear() === today.getFullYear()
          );
        });
        setExpenses(filteredExpenses.slice(0, 2)); // Limit to first 2 expenses

        // Calculate total spent
        const total = fetchedExpenses.reduce((sum, expense) => {
          return sum + (parseFloat(expense.amount) || 0);
        }, 0);
        setTotalSpent(total);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false); // Hide loader
      }
    };

    fetchExpenses();
  }, []); // Empty dependency array

  useEffect(() => {
    const loadEvents = async () => {
      setLoadingEvents(true);
      try {
        const userEvents = await fetchUserEvents();

        const now = new Date();

        // Filter events starting today or later
        const upcomingEvents = userEvents.filter(event => {
          const eventStart = new Date(event.start);
          return eventStart >= now;
        });

        // Sort by closest start date
        upcomingEvents.sort((a, b) => new Date(a.start) - new Date(b.start));

        // Limit to 2 closest events
        const nearestTwoEvents = upcomingEvents.slice(0, 2);

        setEvents(nearestTwoEvents);
      } catch (error) {
        console.log('Error fetching events:', error);
      } finally {
        setLoadingEvents(false);
      }
    };

    loadEvents();
  }, []);

  const fetchUserDates = async () => {
    try {
      const userDoc = await firestore()
        .collection('users')
        .doc(user?.uid) // Assuming `user.uid` is available
        .get();

      if (userDoc.exists) {
        const userData = userDoc.data();

        // Convert Firestore timestamp to JavaScript Date
        const startDate = userData.startDate?._seconds
          ? new Date(userData.startDate._seconds * 1000)
          : null;
        const endDate = userData.endDate?._seconds
          ? new Date(userData.endDate._seconds * 1000)
          : null;

        setStartDate(startDate);
        setEndDate(endDate);
      } else {
        console.error('User document does not exist');
      }
    } catch (error) {
      console.error('Error fetching user dates:', error);
    }
  };

  useEffect(() => {
    fetchUserDates();
  }, []);
  console.log('Start Date:', startDate);
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

  const remainingBudget = (user?.monthlyBudget || 0) - totalSpent; // Calculate remaining budget

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color={Theme.colors.primary} />
      </View>
    );
  }

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
          spentPercentage={(totalSpent / (user?.monthlyBudget || 1)) * 100}
          currency="PKR"
        />
        {/* Budget Date Range - Added here */}
        <BudgetDateRange onDateChange={handleDateChange} />
        {/* Daily Limit Display */}
        <View style={styles.dailyLimitContainer}>
          <NativeText style={styles.dailyLimitText}>
            Daily Spending Limit: {dailyLimit.toFixed(2)} PKR
          </NativeText>
        </View>

        <View style={styles.statsRow}>
          <StatCard
            icon="💸"
            label="Spent"
            amount={`${totalSpent.toFixed(0)} PKR`}
            iconColor="#FF6B6B"
          />
          <StatCard
            icon="💰"
            label="Remaining"
            amount={`${remainingBudget.toFixed(0)} PKR`}
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
          <NativeText style={styles.noExpensesText}>
            No expenses found for today.
          </NativeText>
        )}
        {/* Upcoming Alerts Section */}
        <View style={styles.sectionHeader}>
          <NativeText style={styles.sectionTitle}>UPCOMING ALERTS</NativeText>
        </View>
        <View style={styles.alertsGrid}>
          <View style={styles.alertsGrid}>
            {loadingEvents ? (
              <ActivityIndicator size="small" color={Theme.colors.primary} />
            ) : events.length > 0 ? (
              events.map((event, index) => (
                <AlertCard
                  key={index}
                  icon="🔔"
                  title={event.title}
                  description={event.description}
                  status={new Date(event.start).toLocaleDateString()}
                  statusColor="#4CD964"
                  onPress={() => console.log(`Event pressed: ${event.title}`)}
                />
              ))
            ) : (
              <>
                {/* Optionally keep your existing static alerts here */}
                <AlertCard
                  icon="🔔"
                  status="No upcoming events"
                  statusColor={Theme.colors.secondary}
                  title="No Events"
                  description="You have no scheduled events."
                />
              </>
            )}
          </View>
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
