import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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

    return expenses;
  } catch (error) {
    console.error('Error retrieving expenses:', error.message);
    return [];
  }
};

export const getCategorizedExpensesFromFirestore = async () => {
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
      return {
        Food: [],
        Transport: [],
        Shopping: [],
        Medical: [],
      };
    }

    // Extract expenses from the document
    const expenses = doc.data().expenses || [];

    // Categorize expenses
    const categorizedExpenses = {
      Food: expenses.filter(expense => expense.category === 'Food'),
      Transport: expenses.filter(expense => expense.category === 'Transport'),
      Shopping: expenses.filter(expense => expense.category === 'Shopping'),
      Medical: expenses.filter(expense => expense.category === 'Medical'),
    };

    console.log(
      'Categorized expenses retrieved successfully:',
      categorizedExpenses,
    );

    return categorizedExpenses;
  } catch (error) {
    console.error('Error retrieving categorized expenses:', error.message);
    return {
      Food: [],
      Transport: [],
      Shopping: [],
      Medical: [],
    };
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
