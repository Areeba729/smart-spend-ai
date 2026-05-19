import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SvgXml } from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';
import NativeText from '../../../components/NativeText/NativeText';
import { calendarIcon } from '../../../assets/icons';
import { styles } from './style';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import ScreenLoader from '../../../components/ScreenLoader/ScreenLoader';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/userSlice';
import { getExpensesFromFirestore } from '../../../hooks/ExpenseFunction';
import ExpenseItem from '../../../components/HomeComponents/ExpenseItem/ExpenseItem';
import { Theme } from '../../../libs';
import { parseExpenseDate } from '../../../utils/reportDateUtils';

const toDateString = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseDateString = dateString => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const DailyExpenses = ({ navigation }) => {
  const user = useSelector(selectUser);
  const todayString = toDateString(new Date());
  const [selectedDate, setSelectedDate] = useState(todayString);
  const [loading, setLoading] = useState(true); // Loading state to show while fetching
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);

  const fetchExpenses = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      const fetchedExpenses = await getExpensesFromFirestore();
      setAllExpenses(fetchedExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      if (showLoader) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses(true);
  }, [fetchExpenses]);

  useFocusEffect(
    useCallback(() => {
      fetchExpenses(false);
    }, [fetchExpenses]),
  );

  useEffect(() => {
    const filtered = allExpenses.filter(expense => {
      const expenseDate = parseExpenseDate(expense.date);
      return expenseDate && toDateString(expenseDate) === selectedDate;
    });

    setExpenses(filtered);
  }, [selectedDate, allExpenses]);

  const selectedDateInfo = useMemo(() => {
    const d = parseDateString(selectedDate);
    return {
      fullDate: d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };
  }, [selectedDate]);

  const markedDates = useMemo(() => {
    const marks = {};

    allExpenses.forEach((expense, index) => {
      const expenseDate = parseExpenseDate(expense.date);
      if (!expenseDate) return;

      const key = toDateString(expenseDate);
      if (!marks[key]) {
        marks[key] = { dots: [] };
      }

      marks[key].dots.push({
        key: expense.id || `expense-${index}`,
        color: Theme.colors.secondary,
      });
    });

    const selectedDots = (marks[selectedDate]?.dots ?? []).map(dot => ({
      ...dot,
      color: Theme.colors.white,
    }));

    marks[selectedDate] = {
      ...marks[selectedDate],
      dots: selectedDots,
      selected: true,
      selectedColor: Theme.colors.secondary,
      selectedTextColor: '#000',
    };

    return marks;
  }, [allExpenses, selectedDate]);
  return (
    <View style={styles.container}>
      <SimpleHeader
        title="Expense Detail"
        onBackPress={() => navigation.goBack()}
      />
      {loading ? (
        <ScreenLoader />
      ) : (
        <>
          <View style={styles.summarySection}>
            <View style={styles.dateRow}>
              <SvgXml
                xml={calendarIcon}
                width={14}
                height={14}
                style={styles.dateIcon}
                color="#A0A0A0"
              />
              <NativeText style={styles.summaryDate}>
                {selectedDateInfo.fullDate}
              </NativeText>
            </View>
            <View style={styles.amountRow}>
              <NativeText style={styles.pkrLabel}>PKR</NativeText>
              <NativeText style={styles.totalAmount}>
                {user?.monthlyBudget}
              </NativeText>
            </View>
            <View style={styles.budgetBadge}>
              <View style={styles.budgetDot} />
              <NativeText style={styles.budgetText}>On Budget</NativeText>
            </View>
          </View>

          <View style={styles.dateSelector}>
            <Calendar
              style={styles.calendar}
              markingType="multi-dot"
              current={selectedDate}
              maxDate={todayString}
              onDayPress={day => setSelectedDate(day.dateString)}
              markedDates={markedDates}
              theme={{
                backgroundColor: Theme.colors.black,
                calendarBackground: '#1C1C1E',
                textSectionTitleColor: '#A0A0A0',
                selectedDayBackgroundColor: Theme.colors.secondary,
                selectedDayTextColor: '#000',
                todayTextColor: Theme.colors.secondary,
                dayTextColor: Theme.colors.white,
                textDisabledColor: '#555',
                monthTextColor: Theme.colors.white,
                arrowColor: Theme.colors.secondary,
                dotColor: Theme.colors.secondary,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('AllMonthlyExpenses')}
          >
            {/* <NativeText style={styles.viewAllText}>
          View All Monthly Expenses
        </NativeText> */}
          </TouchableOpacity>
          {/* Dynamically render ExpenseItems */}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <ExpenseItem
                  key={index}
                  icon={expense.icon || '💸'} // Default icon if not provided
                  category={expense.category}
                  note={expense.note}
                  amount={`${expense.amount} PKR`}
                  title={expense.title}
                  date={expense.date}
                />
              ))
            ) : (
              <NativeText style={styles.noExpensesText}>
                No expenses found for this date.
              </NativeText>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default DailyExpenses;
