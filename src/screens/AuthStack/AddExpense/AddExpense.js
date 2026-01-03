import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import AddExpenseForm from '../../../components/AddExpenseForm/AddExpenseForm';
import styles from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddExpense = ({ navigation }) => {
  const handleSave = values => {
    navigation.goBack();
  };

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
        <AddExpenseForm
          onSubmit={handleSave}
          onCancel={() => navigation.goBack()}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddExpense;
