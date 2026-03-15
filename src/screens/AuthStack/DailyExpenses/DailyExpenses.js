import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { moderateScale } from 'react-native-size-matters';
import NativeText from '../../../components/NativeText/NativeText';
import { calendarIcon } from '../../../assets/icons';
import { styles } from './style';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import ScreenLoader from '../../../components/ScreenLoader/ScreenLoader';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/userSlice';
import { getExpensesFromFirestore } from '../../../hooks/ExpenseFunction';
import ExpenseItem from '../../../components/HomeComponents/ExpenseItem/ExpenseItem';
import { Text } from 'react-native';

const DailyExpenses = ({ navigation }) => {
  const dateListRef = React.useRef(null);
  const user = useSelector(selectUser);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [loading, setLoading] = useState(true); // Loading state to show while fetching
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const parseDate = dateField => {
    if (!dateField) return null; // Skip invalid or undefined date fields

    if (typeof dateField === 'string') {
      // Handle string format (e.g., DD-MM-YYYY)
      const [day, month, year] = dateField.split('-');
      return new Date(`${year}-${month}-${day}`); // Convert to YYYY-MM-DD format
    }

    if (typeof dateField === 'object' && dateField._seconds) {
      // Handle Firestore timestamp
      return new Date(dateField._seconds * 1000);
    }

    return null; // Skip unsupported formats
  };
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const fetchedExpenses = await getExpensesFromFirestore();
        setAllExpenses(fetchedExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);
  useEffect(() => {
    if (!allExpenses.length) return;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const filtered = allExpenses.filter(expense => {
      const expenseDate = parseDate(expense.date);

      return (
        expenseDate &&
        expenseDate.getDate() === selectedDate &&
        expenseDate.getMonth() === month &&
        expenseDate.getFullYear() === year
      );
    });

    setExpenses(filtered);
  }, [selectedDate, allExpenses]);
  const dates = React.useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const d = new Date(year, month, i + 1);
      return {
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: i + 1,
        month: d.toLocaleString('en-US', { month: 'long' }),
        year: d.getFullYear(),
        fullDate: d.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      };
    });
  }, []);

  const today = new Date().getDate();

  React.useEffect(() => {
    if (dateListRef.current) {
      setTimeout(() => {
        dateListRef.current.scrollToIndex({
          index: today - 1,
          animated: true,
          viewPosition: 0.5,
        });
      }, 500);
    }
  }, [today]);

  const selectedDateInfo =
    dates.find(d => d.date === selectedDate) || dates[today - 1];

const renderDateItem = ({ item }) => {
  const isActive = selectedDate === item.date;
  const isFuture = item.date > today; // 🔥 check future date

  return (
    <TouchableOpacity
      disabled={isFuture} // 🔥 disable press
      onPress={() => setSelectedDate(item.date)}
      style={[
        styles.dateCard,
        isActive && styles.activeDateCard,
        isFuture && { opacity: 0.4 }, // 🔥 grey out future dates
      ]}
    >
      <NativeText
        style={[
          styles.dayText,
          isActive && styles.activeDayText,
          isFuture && { color: '#999' },
        ]}
      >
        {item.day}
      </NativeText>

      <NativeText
        style={[
          styles.dateNumber,
          isActive && styles.activeDateNumber,
          isFuture && { color: '#999' },
        ]}
      >
        {item.date}
      </NativeText>
    </TouchableOpacity>
  );
};
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
        <FlatList
          ref={dateListRef}
          data={dates}
          renderItem={renderDateItem}
          keyExtractor={item => item.date.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: moderateScale(65) + moderateScale(12), // width + marginRight from style.js
            offset: (moderateScale(65) + moderateScale(12)) * index,
            index,
          })}
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
            No expenses found for today.
          </NativeText>
        )}
      </ScrollView>
      </>
      )}
    </View>
  );
};

export default DailyExpenses;
