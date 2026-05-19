import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { parseExpenseDate } from '../utils/reportDateUtils';

const getExpenseDateKey = dateField => {
  const d = parseExpenseDate(dateField);
  return d ? d.getTime() : '';
};

export const expensesAreEqual = (a, b) => {
  if (!a || !b) return false;
  if (a.id && b.id) return a.id === b.id;
  return (
    String(a.amount) === String(b.amount) &&
    a.title === b.title &&
    a.category === b.category &&
    (a.note || '') === (b.note || '') &&
    getExpenseDateKey(a.date) === getExpenseDateKey(b.date)
  );
};

const generateExpenseId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const saveExpenseToFirestore = async expenseData => {
  try {
    // Get current user from Firebase Authentication
    const user = auth().currentUser;

    if (!user) {
      throw new Error('User is not logged in');
    }

    // Reference to the user's expenses collection
    const userExpensesRef = firestore()
      .collection('userExpenses')
      .doc(user.uid);

    // Save expense data along with user UID
    await userExpensesRef.set(
      {
        expenses: firestore.FieldValue.arrayUnion({
          id: expenseData.id || generateExpenseId(),
          amount: expenseData.amount,
          title: expenseData.title,
          category: expenseData.category,
          date: expenseData.date,
          note: expenseData.note || '',
          uid: user.uid, // Save the user UID
        }),
      },
      { merge: true }, // Merge with existing expenses array if any
    );

    console.log('Expense saved successfully!');
  } catch (error) {
    console.error('Error saving expense:', error.message);
  }
};

export const getExpensesFromFirestore = async () => {
  try {
    // Get current user from Firebase Authentication
    const user = auth().currentUser;

    if (!user) {
      throw new Error('User is not logged in');
    }

    // Reference to the user's expenses collection
    const userExpensesRef = firestore()
      .collection('userExpenses')
      .doc(user.uid);

    // Get expenses data
    const doc = await userExpensesRef.get();

    if (!doc.exists) {
      console.log('No expenses found for this user');
      return [];
    }

    // Extract expenses from the document
    const expenses = doc.data().expenses || [];
    console.log('Expenses retrieved successfully:', expenses);

    return expenses.map((expense, index) => ({
      ...expense,
      id:
        expense.id ||
        `legacy-${index}-${getExpenseDateKey(expense.date)}-${expense.amount}-${
          expense.title
        }`,
    }));
  } catch (error) {
    console.error('Error retrieving expenses:', error.message);
    return [];
  }
};

const CATEGORY_KEYS = ['Food', 'Transport', 'Shopping', 'Medical', 'Others'];

const matchesCategory = (expense, categoryKey) =>
  (expense.category || '').trim().toLowerCase() ===
  categoryKey.toLowerCase();

export const getCategorizedExpensesFromFirestore = async ({
  startDate,
  endDate,
} = {}) => {
  try {
    // Get current user from Firebase Authentication
    const user = auth().currentUser;

    if (!user) {
      throw new Error('User is not logged in');
    }

    // Reference to the user's expenses collection
    const userExpensesRef = firestore()
      .collection('userExpenses')
      .doc(user.uid);

    // Get expenses data
    const doc = await userExpensesRef.get();

    if (!doc.exists) {
      console.log('No expenses found for this user');
      return CATEGORY_KEYS.reduce((acc, key) => {
        acc[key] = [];
        return acc;
      }, {});
    }

    // Extract expenses from the document
    let expenses = doc.data().expenses || [];

    if (startDate && endDate) {
      const rangeStart = new Date(startDate);
      rangeStart.setHours(0, 0, 0, 0);
      const rangeEnd = new Date(endDate);
      rangeEnd.setHours(23, 59, 59, 999);

      expenses = expenses.filter(expense => {
        const expenseDate = parseExpenseDate(expense.date);
        return (
          expenseDate && expenseDate >= rangeStart && expenseDate <= rangeEnd
        );
      });
    }

    // Categorize expenses (case-insensitive; matches AddExpenseForm values)
    const categorizedExpenses = CATEGORY_KEYS.reduce((acc, key) => {
      acc[key] = expenses.filter(expense => matchesCategory(expense, key));
      return acc;
    }, {});

    console.log(
      'Categorized expenses retrieved successfully:',
      categorizedExpenses,
    );

    return categorizedExpenses;
  } catch (error) {
    console.error('Error retrieving categorized expenses:', error.message);
    return CATEGORY_KEYS.reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
  }
};

// get user current date expense
export const getTodayExpensesFromFirestore = async () => {
  try {
    const user = auth().currentUser;

    if (!user) {
      throw new Error('User not logged in');
    }

    const doc = await firestore()
      .collection('userExpenses')
      .doc(user.uid)
      .get();

    if (!doc.exists) {
      return [];
    }

    const expenses = doc.data().expenses || [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayExpenses = expenses.filter(expense => {
      const expenseDate = expense.date.toDate(); // 🔥 VERY IMPORTANT
      return expenseDate >= today && expenseDate < tomorrow;
    });

    return todayExpenses;
  } catch (error) {
    console.error('Error getting today expenses:', error.message);
    return [];
  }
};

export const deleteExpenseFromFirestore = async expenseToDelete => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User is not logged in');

    const userExpensesRef = firestore()
      .collection('userExpenses')
      .doc(user.uid);

    const doc = await userExpensesRef.get();
    if (!doc.exists) return;

    const expenses = doc.data().expenses || [];
    const updatedExpenses = expenses.filter(
      exp => !expensesAreEqual(exp, expenseToDelete),
    );

    await userExpensesRef.set({ expenses: updatedExpenses }, { merge: true });
  } catch (error) {
    console.error('Error deleting expense:', error.message);
    throw error;
  }
};

export const updateExpenseInFirestore = async (oldExpense, expenseData) => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User is not logged in');

    const userExpensesRef = firestore()
      .collection('userExpenses')
      .doc(user.uid);

    const doc = await userExpensesRef.get();
    if (!doc.exists) return;

    const expenses = doc.data().expenses || [];
    const updatedExpenses = expenses.map(exp => {
      if (!expensesAreEqual(exp, oldExpense)) return exp;
      return {
        ...exp,
        amount: expenseData.amount,
        title: expenseData.title,
        category: expenseData.category,
        date: expenseData.date,
        note: expenseData.note || '',
        id: exp.id || oldExpense.id || generateExpenseId(),
      };
    });

    await userExpensesRef.set({ expenses: updatedExpenses }, { merge: true });
  } catch (error) {
    console.error('Error updating expense:', error.message);
    throw error;
  }
};
