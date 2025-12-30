import React from 'react';
import { View, ScrollView } from 'react-native';
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import AddExpenseForm from '../../components/AddExpenseForm/AddExpenseForm';
import styles from './style';

const AddExpense = ({ navigation }) => {
  const handleSave = values => {
    console.log('Expense Saved:', values);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SimpleHeader
        title="Add Expense"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AddExpenseForm
          onSubmit={handleSave}
          onCancel={() => navigation.goBack()}
        />
      </ScrollView>
    </View>
  );
};

export default AddExpense;
