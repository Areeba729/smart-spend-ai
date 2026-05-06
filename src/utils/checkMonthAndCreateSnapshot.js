import firestore from '@react-native-firebase/firestore';

export const checkMonthAndCreateSnapshot = async userId => {
  try {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    // Reference to the user's expenseHistory collection
    const expenseHistoryRef = firestore()
      .collection('expenseHistory')
      .doc(userId)
      .collection('months');

    // Check if the current month snapshot already exists
    const currentMonthDoc = await expenseHistoryRef
      .doc(`${currentYear}-${currentMonth.toString().padStart(2, '0')}`)
      .get();

    if (currentMonthDoc.exists()) {
      // Snapshot for the current month already exists, no action needed
      return;
    }

    // Calculate the previous month
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    // Fetch all expenses for the previous month from userExpenses
    const userExpensesDoc = await firestore()
      .collection('userExpenses')
      .doc(userId)
      .get();

    const allExpenses = userExpensesDoc.data()?.expenses || [];

    const rangeStart = new Date(previousYear, previousMonth - 1, 1).getTime();
    const rangeEnd = new Date(currentYear, currentMonth - 1, 1).getTime();

    const previousMonthExpenses = allExpenses.filter(expense => {
      const expenseDate = expense.date?.toDate
        ? expense.date.toDate().getTime()
        : new Date(expense.date).getTime();
      return expenseDate >= rangeStart && expenseDate < rangeEnd;
    });

    let totalExpenses = 0;
    previousMonthExpenses.forEach(expense => {
      totalExpenses += parseFloat(expense.amount) || 0;
    });

    // Fetch user's budget for the previous month
    const userDoc = await firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();
    const datePath = `${previousYear}-${previousMonth
      .toString()
      .padStart(2, '0')}`;
    const totalBudget = userData?.budgets[datePath] || 0;

    // Calculate savings
    const savings = totalBudget - totalExpenses;
    const historyDoc = {
      totalExpenses,
      totalBudget,
      savings,
      month: previousMonth,
      year: previousYear,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    // Create the snapshot for the previous month
    await expenseHistoryRef.doc(datePath).set(historyDoc);

    return {historyDoc, previousMonthExpenses};
  } catch (error) {
    console.error('Error creating monthly snapshot:', error);
  }
};
