import React, { useCallback, useMemo, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import NativeText from '../../../components/NativeText/NativeText';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import ScreenLoader from '../../../components/ScreenLoader/ScreenLoader';
import ExpenseItem from '../../../components/HomeComponents/ExpenseItem/ExpenseItem';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import {
  getExpensesFromFirestore,
  deleteExpenseFromFirestore,
} from '../../../hooks/ExpenseFunction';
import { parseExpenseDate } from '../../../utils/reportDateUtils';
import { styles } from './style';

const formatPeriodLabel = (start, end) => {
  if (!start || !end) return 'All time';
  const opts = { month: 'short', day: 'numeric', year: 'numeric' };
  return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString(
    'en-US',
    opts,
  )}`;
};

const SpentExpenses = ({ navigation, route }) => {
  const startTimestamp = route.params?.startDate;
  const endTimestamp = route.params?.endDate;
  const monthlyBudget = route.params?.monthlyBudget ?? 0;

  const budgetRange = useMemo(() => {
    if (!startTimestamp || !endTimestamp) return null;
    const start = new Date(startTimestamp);
    const end = new Date(endTimestamp);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }, [startTimestamp, endTimestamp]);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const fetchExpenses = useCallback(
    async (showLoader = false) => {
      try {
        if (showLoader) setLoading(true);
        const fetchedExpenses = await getExpensesFromFirestore();

        let filtered = fetchedExpenses;
        if (budgetRange) {
          filtered = fetchedExpenses.filter(expense => {
            const expenseDate = parseExpenseDate(expense.date);
            return (
              expenseDate &&
              expenseDate >= budgetRange.start &&
              expenseDate <= budgetRange.end
            );
          });
        }

        const sorted = [...filtered].sort((a, b) => {
          const dateA = parseExpenseDate(a.date);
          const dateB = parseExpenseDate(b.date);
          if (!dateA && !dateB) return 0;
          if (!dateA) return 1;
          if (!dateB) return -1;
          return dateB - dateA;
        });

        setExpenses(sorted);
      } catch (error) {
        console.error('Error fetching spent expenses:', error);
      } finally {
        if (showLoader) setLoading(false);
      }
    },
    [budgetRange],
  );

  useFocusEffect(
    useCallback(() => {
      fetchExpenses(true);
    }, [fetchExpenses]),
  );

  const totalSpent = useMemo(
    () =>
      expenses.reduce(
        (sum, expense) => sum + (parseFloat(expense.amount) || 0),
        0,
      ),
    [expenses],
  );

  const remainingBudget = useMemo(
    () => Math.max(0, (monthlyBudget || 0) - totalSpent),
    [monthlyBudget, totalSpent],
  );

  const periodLabel = formatPeriodLabel(budgetRange?.start, budgetRange?.end);

  const handleExpensePress = expense => {
    Alert.alert(expense.title || 'Expense', 'What would you like to do?', [
      {
        text: 'Edit',
        onPress: () =>
          navigation.navigate('AddExpense', {
            editExpense: expense,
            budget: budgetRange
              ? { startDate: budgetRange.start, endDate: budgetRange.end }
              : undefined,
          }),
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setExpenseToDelete(expense),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleConfirmDelete = async () => {
    if (!expenseToDelete) return;
    setDeleting(true);
    try {
      await deleteExpenseFromFirestore(expenseToDelete);
      setExpenseToDelete(null);
      await fetchExpenses(false);
    } catch (error) {
      console.error('Error deleting expense:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <View style={styles.container}>
      <SimpleHeader title="Spent" onBackPress={() => navigation.goBack()} />
      {loading ? (
        <ScreenLoader />
      ) : (
        <>
          <View style={styles.summarySection}>
            <NativeText style={styles.periodLabel}>{periodLabel}</NativeText>
            <View style={styles.amountRow}>
              <NativeText style={styles.pkrLabel}>PKR</NativeText>
              <NativeText style={styles.totalAmount}>
                {totalSpent.toFixed(0)}
              </NativeText>
            </View>
            <NativeText style={styles.countText}>
              {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
            </NativeText>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <NativeText style={styles.statLabel}>Spent</NativeText>
                <NativeText style={[styles.statValue, styles.spentValue]}>
                  {totalSpent.toFixed(0)}
                </NativeText>
              </View>
              <View style={styles.statBox}>
                <NativeText style={styles.statLabel}>Remaining</NativeText>
                <NativeText style={[styles.statValue, styles.remainingAmount]}>
                  {remainingBudget.toFixed(0)}
                </NativeText>
              </View>
            </View>
          </View>

          <NativeText style={styles.sectionTitle}>Expenses</NativeText>
          <NativeText style={styles.hintText}>
            Tap an expense to edit or delete
          </NativeText>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <ExpenseItem
                  key={expense.id || `spent-${index}`}
                  icon={expense.icon || '💸'}
                  category={expense.category}
                  title={expense.title}
                  amount={`${expense.amount} PKR`}
                  onPress={() => handleExpensePress(expense)}
                />
              ))
            ) : (
              <NativeText style={styles.noExpensesText}>
                No expenses found for this period.
              </NativeText>
            )}
          </ScrollView>
        </>
      )}

      <DeleteModal
        visible={!!expenseToDelete}
        message="Are you sure you want to delete this expense?"
        onCancel={() => setExpenseToDelete(null)}
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />
    </View>
  );
};

export default SpentExpenses;
