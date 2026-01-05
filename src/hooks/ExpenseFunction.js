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

//Get Expenses Function
// export const fetchAllExpenses = async () => {
//   try {
//     const user = auth().currentUser;
//     console.log('Current user:', user); // Log the user object

//     if (!user) throw new Error('User is not logged in');

//     const expensesQuerySnapshot = await firestore()
//       .collection('userExpenses')
//       .doc(user.uid)
//       .collection('expenses')
//       .get();

//     if (expensesQuerySnapshot.empty) {
//       console.log('No expenses found');
//       return [];
//     }

//     const expenses = [];
//     expensesQuerySnapshot.forEach(doc => {
//       expenses.push(doc.data());
//     });
//     return expenses;
//   } catch (error) {
//     console.error('Error fetching expenses:', error);
//     return [];
//   }
// };

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

// Add budget date range function
