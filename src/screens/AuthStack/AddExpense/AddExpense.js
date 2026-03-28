import React from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AddExpenseForm from '../../../components/AddExpenseForm/AddExpenseForm';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import styles from './style';

const AddExpense = ({ navigation, route }) => {
  const prefillData = route?.params?.prefillData;

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
          prefillData={prefillData}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddExpense;
