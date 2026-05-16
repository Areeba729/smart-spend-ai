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

const isDateInRange = (date, start, end) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const s = new Date(start);
  s.setHours(0, 0, 0, 0);
  const e = new Date(end);
  e.setHours(23, 59, 59, 999);
  return d >= s && d <= e;
};

const AddExpense = ({ navigation, route }) => {
  const prefillData = route?.params?.prefillData;
  const editExpense = route?.params?.editExpense;
  const budget = route?.params?.budget;

  const isBudgetActive = () => {
    if (!budget?.startDate || !budget?.endDate) return false;
    return isDateInRange(new Date(), budget.startDate, budget.endDate);
  };

  const isExpired =
    budget?.endDate &&
    !isDateInRange(new Date(), budget.startDate, budget.endDate);

  const handleSave = values => {
    if (!isBudgetActive()) {
      alert('Budget period has ended. You cannot add expenses.');
      return;
    }

    // ✅ Save expense logic here
    navigation.goBack();
  };

  // ❌ No budget OR expired (skip when editing an existing expense)
  if (!editExpense && (!budget || isExpired)) {
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
        title={editExpense ? 'Edit Expense' : 'Add Expense'}
        onBackPress={() => navigation.goBack()}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          {editExpense ? 'Edit Expense' : 'Add Expense'}
        </Text>

        {budget?.endDate && !editExpense ? (
          <Text style={{ marginBottom: 10 }}>
            Budget valid till: {new Date(budget.endDate).toDateString()}
          </Text>
        ) : null}

        <AddExpenseForm
          onSubmit={handleSave}
          onCancel={() => navigation.goBack()}
          prefillData={prefillData}
          editExpense={editExpense}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddExpense;
