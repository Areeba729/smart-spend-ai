import React, { useCallback, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { styles } from './style';
import MonthlyBudgetCard from './components/MonthlyBudgetCard';
import LimitCard from './components/LimitCard';
import ActionGrid from './components/ActionGrid';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import ScreenLoader from '../../../components/ScreenLoader/ScreenLoader';
import { aiAssistant } from '../../../utils/aiAssistant';
import { getExpensesFromFirestore } from '../../../hooks/ExpenseFunction';
import { parseExpenseDate } from '../../../utils/reportDateUtils';
import BudgetModal from '../../../components/BudgetModal';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const getCurrentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const getCurrentMonthDateRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return { startDate: start, endDate: end };
};

const isDateInRange = (date, start, end) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const s = new Date(start);
  s.setHours(0, 0, 0, 0);
  const e = new Date(end);
  e.setHours(23, 59, 59, 999);
  return d >= s && d <= e;
};

const getEffectiveBudgetRange = (startDate, endDate) => {
  const today = new Date();
  if (startDate && endDate && isDateInRange(today, startDate, endDate)) {
    return { startDate, endDate };
  }
  return getCurrentMonthDateRange();
};

const BudgetScreen = ({ navigation }) => {
  const [monthlyBudget, setMonthlyBudget] = useState(null);
  const [totalSpent, setTotalSpent] = useState(0);
  const [todaySpent, setTodaySpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [newBudget, setNewBudget] = useState('');

  const fetchBudgetData = useCallback(async () => {
    setLoading(true);
    const firebaseUser = auth().currentUser;
    if (!firebaseUser?.uid) {
      setLoading(false);
      return;
    }

    try {
      const userDoc = await firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .get();

      let budgetAmount = null;
      let start = null;
      let end = null;

      if (userDoc.exists) {
        const userData = userDoc.data();
        const currentMonth = getCurrentMonthKey();
        const budgets = userData.budgets || {};

        if (budgets[currentMonth] !== undefined) {
          budgetAmount = Number(budgets[currentMonth]);
        } else if (userData.monthlyBudget) {
          budgetAmount = Number(userData.monthlyBudget);
        }

        start = userData.startDate?._seconds
          ? new Date(userData.startDate._seconds * 1000)
          : null;
        end = userData.endDate?._seconds
          ? new Date(userData.endDate._seconds * 1000)
          : null;

        if (budgetAmount !== null && budgetAmount > 0) {
          const today = new Date();
          const needsDateMigration =
            !start || !end || !isDateInRange(today, start, end);

          if (needsDateMigration) {
            const monthRange = getCurrentMonthDateRange();
            start = monthRange.startDate;
            end = monthRange.endDate;

            await firestore()
              .collection('users')
              .doc(firebaseUser.uid)
              .update({
                startDate: firestore.Timestamp.fromDate(start),
                endDate: firestore.Timestamp.fromDate(end),
              });
          }
        }
      }

      setMonthlyBudget(budgetAmount);

      const range = getEffectiveBudgetRange(start, end);
      const expenses = await getExpensesFromFirestore();
      const today = new Date();

      let total = 0;
      let todayTotal = 0;

      expenses.forEach(exp => {
        const expenseDate = parseExpenseDate(exp.date);
        if (
          !expenseDate ||
          expenseDate < range.startDate ||
          expenseDate > range.endDate
        ) {
          return;
        }

        const amount = parseFloat(exp.amount) || 0;
        total += amount;

        if (
          expenseDate.getDate() === today.getDate() &&
          expenseDate.getMonth() === today.getMonth() &&
          expenseDate.getFullYear() === today.getFullYear()
        ) {
          todayTotal += amount;
        }
      });

      setTotalSpent(total);
      setTodaySpent(todayTotal);
    } catch (error) {
      console.error('Error fetching budget data:', error);
      setMonthlyBudget(null);
      setTotalSpent(0);
      setTodaySpent(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchBudgetData();
    }, [fetchBudgetData]),
  );

  const aiResult = aiAssistant({
    monthlyBudget: monthlyBudget || 0,
    totalSpent,
    todaySpent,
  });

  const handleSetBudget = async () => {
    if (!newBudget) return;

    const firebaseUser = auth().currentUser;
    if (!firebaseUser?.uid) return;

    setLoading(true);
    try {
      const docRef = firestore().collection('users').doc(firebaseUser.uid);
      const doc = await docRef.get();
      let budgets = {};
      if (doc.exists) {
        budgets = doc.data().budgets || {};
      }

      const currentMonth = getCurrentMonthKey();
      const { startDate: monthStart, endDate: monthEnd } =
        getCurrentMonthDateRange();

      budgets[currentMonth] = Number(newBudget);
      await docRef.update({
        budgets,
        startDate: firestore.Timestamp.fromDate(monthStart),
        endDate: firestore.Timestamp.fromDate(monthEnd),
        monthlyBudget: String(newBudget),
      });

      setMonthlyBudget(Number(newBudget));
      setShowBudgetModal(false);
      setNewBudget('');
      await fetchBudgetData();
    } catch (error) {
      console.error('Error setting budget:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SimpleHeader title="Budget" />
      {loading ? (
        <ScreenLoader />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {monthlyBudget === null ? (
            <View style={{ alignItems: 'center', marginVertical: 24 }}>
              <Text>No budget set for this month.</Text>
              <PrimaryButton
                containerStyle={{ backgroundColor: '#86AE12' }}
                title="Set Budget Now"
                onPress={() => setShowBudgetModal(true)}
              />
            </View>
          ) : (
            <MonthlyBudgetCard
              monthlyBudget={monthlyBudget}
              totalSpent={totalSpent}
            />
          )}

          {monthlyBudget !== null && (
            // <View style={{ marginTop: 24 }}>
            <LimitCard dailyLimit={aiResult.dailyLimit} />
            // </View>
          )}
          <View style={{ marginTop: 90 }}>
            <ActionGrid navigation={navigation} />
          </View>
        </ScrollView>
      )}
      <BudgetModal
        visible={showBudgetModal}
        value={newBudget}
        onChange={setNewBudget}
        onSave={handleSetBudget}
        onCancel={() => {
          setShowBudgetModal(false);
          setNewBudget('');
        }}
        loading={loading}
      />
    </View>
  );
};

export default BudgetScreen;
