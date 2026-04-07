// import React from 'react';
// import { Text, View } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import AddExpenseForm from '../../../components/AddExpenseForm/AddExpenseForm';
// import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
// import styles from './style';

// const AddExpense = ({ navigation, route }) => {
//   const prefillData = route?.params?.prefillData;

//   const handleSave = values => {
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <SimpleHeader
//         title="Add Expense"
//         onBackPress={() => navigation.goBack()}
//       />
//       <KeyboardAwareScrollView
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//         enableOnAndroid={true}
//         extraScrollHeight={120}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Text style={styles.title}>Add Expense</Text>
//         <AddExpenseForm
//           onSubmit={handleSave}
//           onCancel={() => navigation.goBack()}
//           prefillData={prefillData}
//         />
//       </KeyboardAwareScrollView>
//     </View>
//   );
// };

// export default AddExpense;

import React from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AddExpenseForm from '../../../components/AddExpenseForm/AddExpenseForm';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import styles from './style';

const AddExpense = ({ navigation, route }) => {
  const prefillData = route?.params?.prefillData;
  const budget = route?.params?.budget; // 👈 pass budget from previous screen

  // 🔹 Check if budget is active
  const isBudgetActive = () => {
    if (!budget) return false;

    const today = new Date();
    const start = new Date(budget.startDate);
    const end = new Date(budget.endDate);

    return today >= start && today <= end;
  };

  const isExpired = budget && new Date() > new Date(budget.endDate);

  const handleSave = values => {
    if (!isBudgetActive()) {
      alert('Budget period has ended. You cannot add expenses.');
      return;
    }

    // ✅ Save expense logic here
    navigation.goBack();
  };

  // ❌ No budget OR expired
  if (!budget || isExpired) {
    return (
      <View style={styles.container}>
        <SimpleHeader
          title="Add Expense"
          onBackPress={() => navigation.goBack()}
        />

        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>
            No active budget available.
          </Text>

          <Text style={{ marginTop: 10, textAlign: 'center' }}>
            Please create a new budget to add expenses.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SimpleHeader
        title="Add Expense"
        onBackPress={() => navigation.goBack()}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Add Expense</Text>

        {/* ✅ Optional: Show budget info */}
        <Text style={{ marginBottom: 10 }}>
          Budget valid till: {new Date(budget.endDate).toDateString()}
        </Text>

        <AddExpenseForm
          onSubmit={handleSave}
          onCancel={() => navigation.goBack()}
          prefillData={prefillData}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddExpense;
