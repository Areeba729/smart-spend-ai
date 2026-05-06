import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

import { scanReceiptWithMindee } from '../../../utils/scanReceiptWithMindee';
import { calendarIcon } from '../../../assets/icons';
import { Theme } from '../../../libs';
import { useUserGreeting } from '../../../libs/getUserGreetings';
import { selectUser } from '../../../redux/slices/userSlice';
import BudgetModal from '../../../components/BudgetModal';
import { getExpensesFromFirestore } from '../../../hooks/ExpenseFunction';
import { fetchUserEvents } from '../../../hooks/fetchUserEvents';
import { checkMonthAndCreateSnapshot } from '../../../utils/checkMonthAndCreateSnapshot';

import HomeHeader from '../../../components/Header/Header';
import BudgetDateRange from '../../../components/BudgetDateRange/BudgetDateRange';
import StatCard from '../../../components/HomeComponents/StatCard/StatCard';
import ExpenseItem from '../../../components/HomeComponents/ExpenseItem/ExpenseItem';
import AlertCard from '../../../components/HomeComponents/AlertCard/AlertCard';
import QuickActionButton from '../../../components/HomeComponents/QuickActionButton/QuickActionButton';
import NativeText from '../../../components/NativeText/NativeText';
import ScreenLoader from '../../../components/ScreenLoader/ScreenLoader';
import styles from './style';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
console.log('CURRENT USER:', auth().currentUser);

const Home = ({ navigation }) => {
  const { name, greeting } = useUserGreeting();
  const user = useSelector(selectUser);

  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [monthlyBudget, setMonthlyBudget] = useState(null); // null means not set
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [newBudget, setNewBudget] = useState('');
  const [lastMonthSummary, setLastMonthSummary] = useState({});

  // Budget dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Scan receipt modal
  const [showScanModal, setShowScanModal] = useState(false);
  const [scanningGallery, setScanningGallery] = useState(false);

  // Selected date for calendar
  const [selectedDate, setSelectedDate] = useState(
    new Date().setHours(0, 0, 0, 0),
  );

  // ----------------------
  // Helper Functions
  // ----------------------
  const handleDateChange = (date, type) => {
    if (type === 'start') setStartDate(date);
    else if (type === 'end') setEndDate(date);
  };

  const parseDate = dateField => {
    if (!dateField) return null;
    if (typeof dateField === 'string') {
      const [day, month, year] = dateField.split('-');
      return new Date(`${year}-${month}-${day}`);
    }
    if (dateField?._seconds) return new Date(dateField._seconds * 1000);
    return null;
  };

  const isBudgetActive = () => {
    if (!startDate || !endDate) return false;
    const today = new Date();
    return today >= startDate && today <= endDate;
  };

  // ----------------------
  // Budget Calculations
  // ----------------------
  const getBudgetDuration = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = endDate - startDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getRemainingDays = () => {
    if (!endDate) return 0;
    const today = new Date();
    const diffTime = endDate - today;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const dailyLimit = useMemo(() => {
    if (!monthlyBudget || !startDate || !endDate) return 0;
    return monthlyBudget / Math.max(1, getBudgetDuration());
  }, [monthlyBudget, startDate, endDate]);

  const remainingBudget = useMemo(() => {
    if (!monthlyBudget || !startDate || !endDate) return 0;
    return Math.max(0, (monthlyBudget || 0) - totalSpent);
  }, [monthlyBudget, totalSpent, startDate, endDate]);

  const remainingDays = useMemo(() => getRemainingDays(), [endDate]);
  const isBudgetAtRisk = remainingBudget < dailyLimit * remainingDays;

  // ----------------------
  // Fetch Expenses
  // ----------------------
  const fetchExpenses = async () => {
    if (!startDate || !endDate) return;

    setLoading(true);
    try {
      const fetchedExpenses = await getExpensesFromFirestore();

      // Filter expenses within budget period
      const filteredExpenses = fetchedExpenses.filter(expense => {
        const expenseDate = parseDate(expense.date);
        return (
          expenseDate && expenseDate >= startDate && expenseDate <= endDate
        );
      });

      // Today's expenses (for display)
      const today = new Date();
      const todayExpenses = filteredExpenses.filter(expense => {
        const expenseDate = parseDate(expense.date);
        return (
          expenseDate.getDate() === today.getDate() &&
          expenseDate.getMonth() === today.getMonth() &&
          expenseDate.getFullYear() === today.getFullYear()
        );
      });

      setExpenses(todayExpenses.slice(0, 2));

      // Total spent in current budget period
      const total = filteredExpenses.reduce(
        (sum, expense) => sum + (parseFloat(expense.amount) || 0),
        0,
      );
      setTotalSpent(total);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------
  // Fetch Events
  // ----------------------
  const loadEvents = async () => {
    setLoadingEvents(true);
    try {
      const userEvents = await fetchUserEvents();
      const now = new Date();
      const upcomingEvents = userEvents
        .filter(event => new Date(event.start) >= now)
        .sort((a, b) => new Date(a.start) - new Date(b.start));
      setEvents(upcomingEvents.slice(0, 2));
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoadingEvents(false);
    }
  };

  // ----------------------
  // Fetch Budget Dates and Budget for Current Month from Firestore
  // ----------------------
  const fetchUserDates = async () => {
    try {
      const firebaseUser = auth().currentUser;

      if (!firebaseUser?.uid) {
        console.log('❌ No Firebase user for dates');
        return;
      }

      const userDoc = await firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .get();

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Budget period
        const start = userData.startDate?._seconds
          ? new Date(userData.startDate._seconds * 1000)
          : null;

        const end = userData.endDate?._seconds
          ? new Date(userData.endDate._seconds * 1000)
          : null;

        setStartDate(start);
        setEndDate(end);

        // Budget for current month
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(
          now.getMonth() + 1,
        ).padStart(2, '0')}`;
        const budgets = userData.budgets || {};
        if (budgets[currentMonth] !== undefined) {
          setMonthlyBudget(Number(budgets[currentMonth]));
        } else {
          setMonthlyBudget(null);
        }
      }
    } catch (error) {
      console.error('Error fetching user dates:', error);
    }
  };
  // Set budget for current month
  const handleSetBudget = async () => {
    if (!newBudget) return;
    try {
      const firebaseUser = auth().currentUser;
      if (!firebaseUser?.uid) return;
      const docRef = firestore().collection('users').doc(firebaseUser.uid);
      const doc = await docRef.get();
      let budgets = {};
      if (doc.exists) {
        const data = doc.data();
        budgets = data.budgets || {};
      }
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(
        now.getMonth() + 1,
      ).padStart(2, '0')}`;
      budgets[currentMonth] = Number(newBudget);
      await docRef.update({ budgets });
      setMonthlyBudget(Number(newBudget));
      setShowBudgetModal(false);
      setNewBudget('');
    } catch (error) {
      console.log('Error setting budget:', error);
    }
  };
  // ----------------------
  // Effects
  // ----------------------
  useEffect(() => {
    const initialize = async () => {
      const firebaseUser = auth().currentUser;

      console.log('🔥 Firebase Auth User:', firebaseUser);

      if (!firebaseUser?.uid) {
        console.log('❌ No Firebase Auth user found');
        return;
      }
      setLoadingSummary(true)
      const doc = await checkMonthAndCreateSnapshot(firebaseUser.uid);
      setLastMonthSummary(doc);
      setLoadingSummary(false)
    };

    initialize();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserDates();
    }, []),
  );

  // Refetch expenses when budget changes
  useEffect(() => {
    if (startDate && endDate) {
      fetchExpenses();
      loadEvents();
    }
  }, [startDate, endDate]);

  useFocusEffect(
    useCallback(() => {
      if (startDate && endDate) {
        fetchExpenses();
        loadEvents();
      }
    }, [startDate, endDate]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchExpenses(), loadEvents(), fetchUserDates()]);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, [startDate, endDate]);

  // ----------------------
  // Handlers
  // ----------------------
  const handleDateSelect = date => {
    setSelectedDate(date);
    navigation.navigate('Calendar', { selectedDate: date });
  };

  const handleAddExpense = () => {
    if (!isBudgetActive()) {
      Toast.show({
        type: 'error',
        text1: 'Budget Blocked',
        text2: 'Budget expired. Please create a new budget.',
        position: 'top',
      });
      return;
    }
    navigation.navigate('AddExpense', { budget: { startDate, endDate } });
  };

  const handleAddEvent = () => navigation.navigate('AddEvents');

  const handleScanBill = () => setShowScanModal(true);

  const handleOpenCamera = () => {
    setShowScanModal(false);
    navigation.navigate('ReceiptScannerScreen');
  };

  const handleOpenGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, async response => {
      if (response.didCancel || response.errorCode) return;
      const asset = response.assets?.[0];
      if (!asset?.uri) return;
      const imagePath = asset.uri.replace('file://', '');
      setScanningGallery(true);
      try {
        const prefillData = await scanReceiptWithMindee(imagePath);
        setShowScanModal(false);
        navigation.navigate('AddExpense', { prefillData });
      } catch {
        setShowScanModal(false);
        navigation.navigate('AddExpense');
      } finally {
        setScanningGallery(false);
      }
    });
  };

  const onHistoryPress = () => {
    navigation.navigate('History', {
      historyData: lastMonthSummary?.previousMonthExpenses || [],
    });
  };

  // ----------------------
  // Render
  // ----------------------
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.secondary}
      />
      <HomeHeader
        initial={name.charAt(0).toUpperCase()}
        greeting={greeting}
        userName={name}
        onNotificationPress={() => navigation.navigate('Notifications')}
      />

      {loading ? (
        <ScreenLoader color={Theme.colors.secondary} />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Budget Date Range */}
          <BudgetDateRange
            onDateChange={handleDateChange}
            historyDoc={lastMonthSummary?.historyDoc || {}}
            onPress={onHistoryPress}
            loading={loadingSummary}
          />

          {/* Budget Modal Trigger if no budget for current month */}
          {monthlyBudget === null && (
            <View style={{ alignItems: 'center', marginVertical: 24 }}>
              <NativeText style={{ fontSize: 16, marginBottom: 8 }}>
                No budget set for this month.
              </NativeText>
              <PrimaryButton
                containerStyle={{ backgroundColor: '#86AE12' }}
                title="Set Budget Now"
                onPress={() => setShowBudgetModal(true)}
              />
            </View>
          )}

          {/* Daily Limit */}
          <View style={styles.dailyLimitContainer}>
            <NativeText style={styles.dailyLimitText}>
              Daily Spending Limit: {dailyLimit.toFixed(2)} PKR
            </NativeText>
            <NativeText style={styles.dailyLimitExplanation}>
              (If you spend within this limit daily, your budget will last the
              period.)
            </NativeText>
          </View>

          {/* Stats */}
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

          {/* Today's Expenses */}
          <View style={styles.sectionHeader}>
            <NativeText style={styles.sectionTitle}>TODAY'S EXPENSE</NativeText>
            <TouchableOpacity
              onPress={() => navigation.navigate('DailyExpenses')}
            >
              <NativeText style={styles.viewAll}>View All</NativeText>
            </TouchableOpacity>
          </View>

          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <ExpenseItem
                key={index}
                icon={expense.icon || '💸'}
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

          {/* Upcoming Alerts */}
          <View style={styles.sectionHeader}>
            <NativeText style={styles.sectionTitle}>UPCOMING ALERTS</NativeText>
          </View>

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
              <AlertCard
                icon="🔔"
                status="No upcoming events"
                statusColor={Theme.colors.secondary}
                title="No Events"
                description="You have no scheduled events."
              />
            )}
          </View>

          {/* Quick Actions */}
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
        </ScrollView>
      )}
      {/* Budget Modal for setting budget */}
      <BudgetModal
        visible={showBudgetModal}
        value={newBudget}
        onChange={setNewBudget}
        onSave={handleSetBudget}
        onCancel={() => {
          setShowBudgetModal(false);
          setNewBudget('');
        }}
        loading={false}
      />

      {/* Scan Receipt Modal */}
      <Modal
        visible={showScanModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowScanModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowScanModal(false)}>
          <View style={scanModalStyles.overlay}>
            <TouchableWithoutFeedback>
              <View style={scanModalStyles.sheet}>
                <NativeText style={scanModalStyles.title}>
                  Scan Receipt
                </NativeText>
                <NativeText style={scanModalStyles.subtitle}>
                  Choose how you'd like to scan your receipt
                </NativeText>

                <TouchableOpacity
                  style={scanModalStyles.option}
                  onPress={handleOpenCamera}
                >
                  <NativeText style={scanModalStyles.optionIcon}>📷</NativeText>
                  <View>
                    <NativeText style={scanModalStyles.optionLabel}>
                      Use Camera
                    </NativeText>
                    <NativeText style={scanModalStyles.optionSub}>
                      Take a photo of your receipt
                    </NativeText>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={scanModalStyles.option}
                  onPress={handleOpenGallery}
                  disabled={scanningGallery}
                >
                  <NativeText style={scanModalStyles.optionIcon}>🖼️</NativeText>
                  <View style={{ flex: 1 }}>
                    <NativeText style={scanModalStyles.optionLabel}>
                      Choose from Gallery
                    </NativeText>
                    <NativeText style={scanModalStyles.optionSub}>
                      {scanningGallery
                        ? 'AI Scanning Receipt...'
                        : 'Pick an existing receipt photo'}
                    </NativeText>
                  </View>
                  {scanningGallery && (
                    <ActivityIndicator
                      size="small"
                      color={Theme.colors.secondary}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={scanModalStyles.cancelButton}
                  onPress={() => setShowScanModal(false)}
                >
                  <NativeText style={scanModalStyles.cancelText}>
                    Cancel
                  </NativeText>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const scanModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 36,
  },
  title: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#999', fontSize: 13, marginBottom: 20 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 14,
  },
  optionIcon: { fontSize: 26 },
  optionLabel: { color: '#fff', fontSize: 15, fontWeight: '600' },
  optionSub: { color: '#999', fontSize: 12, marginTop: 2 },
  cancelButton: { alignItems: 'center', marginTop: 4, padding: 14 },
  cancelText: { color: '#FF453A', fontSize: 15, fontWeight: '600' },
});

export default Home;
