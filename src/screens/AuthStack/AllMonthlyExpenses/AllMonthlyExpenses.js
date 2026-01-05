import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { moderateScale } from 'react-native-size-matters';
import NativeText from '../../../components/NativeText/NativeText';
import { calendarIcon } from '../../../assets/icons';
import { styles } from './style';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
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
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const fetchedExpenses = await getExpensesFromFirestore(); // Fetch expenses from Firestore
        setExpenses(fetchedExpenses); // Set expenses data to state
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);
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
    return (
      <TouchableOpacity
        onPress={() => setSelectedDate(item.date)}
        style={[styles.dateCard, isActive && styles.activeDateCard]}
      >
        <NativeText style={[styles.dayText, isActive && styles.activeDayText]}>
          {item.day}
        </NativeText>
        <NativeText
          style={[styles.dateNumber, isActive && styles.activeDateNumber]}
        >
          {item.date}
        </NativeText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SimpleHeader
        title="All Monthly Expenses"
        onBackPress={() => navigation.goBack()}
      />
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
      </View>

      <Text style={styles.viewAllText}>View All Monthly Expenses</Text>
      {/* Dynamically render ExpenseItems */}
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
        <NativeText>No expenses found for today.</NativeText>
      )}
    </View>
  );
};

export default DailyExpenses;
