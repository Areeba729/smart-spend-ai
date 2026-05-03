import firestore from '@react-native-firebase/firestore';

export const checkMonthAndCreateSnapshot = async userId => {
  console.log('checkMonthAndCreateSnapshot triggered');
  console.log('USER ID:', userId);
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
    const userExpensesRef = firestore()
      .collection('userExpenses')
      .doc(userId)
      .collection('expenses');
    const snapshot = await userExpensesRef
      .where('date', '>=', new Date(previousYear, previousMonth - 1, 1))
      .where('date', '<', new Date(currentYear, currentMonth - 1, 1))
      .get();

    let totalExpenses = 0;
    snapshot.forEach(doc => {
      const data = doc.data();
      totalExpenses += parseFloat(data.amount) || 0;
    });

    // Fetch user's budget for the previous month
    const userDoc = await firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();
    const totalBudget = userData?.monthlyBudget || 0;

    // Calculate savings
    const savings = totalBudget - totalExpenses;

    // Create the snapshot for the previous month
    await expenseHistoryRef
      .doc(`${previousYear}-${previousMonth.toString().padStart(2, '0')}`)
      .set({
        totalExpenses,
        totalBudget,
        savings,
        month: previousMonth,
        year: previousYear,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    console.log('Monthly snapshot created successfully.');
  } catch (error) {
    console.error('Error creating monthly snapshot:', error);
  }
};
