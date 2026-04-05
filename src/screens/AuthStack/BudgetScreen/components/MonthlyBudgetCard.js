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
  const fetchExpenses = async () => {
    const fetchedExpenses = await getExpensesFromFirestore();
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const monthlyExpenses = fetchedExpenses.filter(expense => {
      const expenseDate = parseDate(expense.date);
      return (
        expenseDate &&
        expenseDate.getMonth() === month &&
        expenseDate.getFullYear() === year
      );
    });

    setExpenses(monthlyExpenses.slice(0, 2));

    const total = monthlyExpenses.reduce((sum, expense) => {
      return sum + (parseFloat(expense.amount) || 0);
    }, 0);

    setTotalSpent(total);
  };

  fetchExpenses();
}, []);

  const monthlyBudget = Number(user?.monthlyBudget || 0);
  const remainingBudget = monthlyBudget - totalSpent; // Calculate remaining budget
const spentPercentage = monthlyBudget
  ? Math.min((totalSpent / monthlyBudget) * 100, 100)
  : 0;
  console.log('Monthly Budget:', monthlyBudget);
console.log('Total Spent This Month:', totalSpent);
console.log('Spent %:', spentPercentage);
  return (
    <View style={[styles.card, styles.monthlyBudgetCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.labelContainer}>
          <View style={styles.iconWrapper}>
            <SvgXml xml={budgetIcon} width={18} height={18} color="#A0A0A0" />
          </View>
          <NativeText style={styles.label}>Monthly Budget</NativeText>
        </View>
        {/* <TouchableOpacity>
          <NativeText style={styles.ellipsis}>•••</NativeText>
        </TouchableOpacity> */}
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
  <View
    style={[
      styles.progressFill,
      { width: `${spentPercentage}%` },
    ]}
  />
</View>

      <NativeText style={styles.progressText}>
        {spentPercentage.toFixed(0)}% Used
      </NativeText>
    </View>
  );
};

export default MonthlyBudgetCard;
