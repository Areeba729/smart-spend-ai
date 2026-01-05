import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import NativeText from '../../../../components/NativeText/NativeText';
import { budgetIcon } from '../../../../assets/icons';
import { styles } from '../style';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../redux/slices/userSlice';
import { getExpensesFromFirestore } from '../../../../hooks/ExpenseFunction';

const MonthlyBudgetCard = () => {
  const user = useSelector(selectUser);

  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0); // State to hold total spent

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
    // Fetch expenses when the component is mounted
    const fetchExpenses = async () => {
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
    };

    fetchExpenses();
  }, []); // Empty dependency array

  const monthlyBudget = Number(user?.monthlyBudget || 0);
  const remainingBudget = monthlyBudget - totalSpent; // Calculate remaining budget
  const spentPercentage = Math.min((totalSpent / monthlyBudget) * 100, 100); // Ensure percentage does not exceed 100

  return (
    <View style={[styles.card, styles.monthlyBudgetCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.labelContainer}>
          <View style={styles.iconWrapper}>
            <SvgXml xml={budgetIcon} width={18} height={18} color="#A0A0A0" />
          </View>
          <NativeText style={styles.label}>Monthly Budget</NativeText>
        </View>
        <TouchableOpacity>
          <NativeText style={styles.ellipsis}>•••</NativeText>
        </TouchableOpacity>
      </View>

      <View style={styles.amountRow}>
        <NativeText style={styles.mainAmount}>
          {monthlyBudget.toLocaleString()}
        </NativeText>
        <NativeText style={styles.currency}>PKR</NativeText>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <NativeText style={styles.statLabel}>Total Spent</NativeText>
          <NativeText style={styles.statValue}>
            {totalSpent.toLocaleString()}
          </NativeText>
        </View>
        <View style={[styles.statItem, styles.flexEnd]}>
          <NativeText style={styles.statLabel}>Remaining</NativeText>
          <NativeText style={[styles.statValue, styles.remainingValue]}>
            {remainingBudget.toLocaleString()}
          </NativeText>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${spentPercentage}%` }]} // Dynamically set width based on spentPercentage
          />
        </View>
      </View>

      <NativeText style={styles.progressText}>
        {spentPercentage.toFixed(0)}% Used
      </NativeText>
    </View>
  );
};

export default MonthlyBudgetCard;
