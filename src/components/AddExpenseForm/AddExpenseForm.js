import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, Platform } from 'react-native';
import {
  useSmartForm,
  FormProvider,
  SmartFormField,
} from 'react-native-fn-forms';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SvgXml } from 'react-native-svg';
import NativeText from '../NativeText/NativeText';
import SuccessModal from '../SuccessModal/SuccessModal';
import { calendarIcon } from '../../assets/icons';
import { styles } from './style';
import { Theme } from '../../libs';
import { saveExpenseToFirestore } from '../../hooks/ExpenseFunction';

const AddExpenseForm = ({ onSubmit, onCancel }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const categories = [
    { id: 1, name: 'Shopping', icon: '🛒', color: '#86AE12' },
    { id: 2, name: 'Food', icon: '🍴', color: '#1C1C1E' },
    { id: 3, name: 'Transport', icon: '🚗', color: '#1C1C1E' },
    { id: 4, name: 'Medical', icon: '💊', color: '#1C1C1E' },
  ];

  const form = useSmartForm({
    fields: {
      amount: {
        type: 'number',
        required: true,
        defaultValue: '', // Removed the default value of '0' for better flexibility
      },
      title: {
        type: 'text',
        required: true,
        minLength: 2,
      },
      category: {
        type: 'text',
        required: true,
        defaultValue: 'Shopping',
      },
      date: {
        type: 'date',
        required: true,
        defaultValue: new Date(), // ✅ MUST be Date object
      },
      note: {
        type: 'text',
        required: false,
      },
    },
  });

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (event.type === 'set' && selectedDate) {
        // Ensure the selected date is updated in form state
        form.setFieldValue('date', selectedDate); // Save selected date in form
        form.setFieldTouched('date', true); // Mark the date field as touched
      }
    }
  };

  const formatDate = date => {
    if (!(date instanceof Date)) return '';
    const day = String(date.getDate()).padStart(2, '0'); // Adds leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adds leading zero if necessary
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleSave = async () => {
    await form.submitForm();
    if (form.isValid) {
      // Call Firebase function to save the expense
      const expenseData = {
        amount: form.values.amount,
        title: form.values.title,
        category: form.values.category,
        date: form.values.date,
        note: form.values.note,
      };

      // Call the saveExpense function
      await saveExpenseToFirestore(expenseData);

      // Show success modal after saving the expense
      setShowSuccessModal(true);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    onSubmit(form.values);
  };

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        {/* Amount Field */}
        <SmartFormField
          name="amount"
          label="Amount"
          placeholder="Enter amount"
          placeholderTextColor="#666"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
          keyboardType="numeric" // Ensures numeric input for the amount
        />

        {/* Title Field */}
        <SmartFormField
          name="title"
          label="Expense Title"
          placeholder="Enter title"
          placeholderTextColor="#666"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          keyboardType="default"
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
          leftIcon={<NativeText style={styles.inputIcon}>✏️</NativeText>}
        />

        {/* Category Field */}
        <View style={styles.inputSection}>
          <View style={styles.sectionHeader}>
            <NativeText style={styles.label}>Category</NativeText>
          </View>
          <View style={styles.categoryGrid}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.name}
                style={[
                  styles.categoryItem,
                  form.values.category === cat.name
                    ? styles.categoryItemActive
                    : styles.categoryItemInactive,
                ]}
                onPress={() => {
                  form.setFieldValue('category', cat.name);
                  form.setFieldTouched('category', true);
                }}
              >
                <NativeText style={styles.categoryIcon}>{cat.icon}</NativeText>
                <NativeText
                  style={[
                    styles.categoryName,
                    form.values.category === cat.name
                      ? styles.categoryNameActive
                      : styles.categoryNameInactive,
                  ]}
                >
                  {cat.name}
                </NativeText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <SmartFormField
          name="date"
          label="Date"
          placeholder="Enter date"
          placeholderTextColor="#666"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
          leftIcon={<SvgXml xml={calendarIcon} width={20} height={20} />}
        />
        {/* Date Field */}
        {/* <View style={styles.inputSection1}>
          <NativeText style={styles.label}>Date</NativeText>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowDatePicker(true)}
          >
            <SmartFormField
              name="date"
              value={formatDate(form.values.date)} // Display formatted date
              placeholder="3-10-2025"
              placeholderTextColor="#666"
              editable={false} // ⛔ keyboard nahi khulega
              pointerEvents="none" // ⛔ input touch handle nahi karega
              leftIcon={<SvgXml xml={calendarIcon} width={20} height={20} />}
              // errorStyle={styles.error}
              inputContainerStyle={styles.inputContainer}
              style={styles.input}
            />
          </TouchableOpacity>
        </View> */}

        {/* {showDatePicker && (
          <DateTimePicker
            value={
              form.values.date instanceof Date ? form.values.date : new Date()
            } // Use form value or fallback to current date
            mode="date"
            minimumDate={new Date()} // Disallow past dates
            display="default" // Default picker for Android
            onChange={handleDateChange} // Update date field on change
          />
        )} */}

        {/* Note Field */}
        <SmartFormField
          name="note"
          label="Note (Optional)"
          placeholder="Add details..."
          placeholderTextColor="#666"
          multiline
          fieldStyle={[styles.field, styles.noteContainer]}
          labelStyle={styles.label}
          style={[styles.noteInput, { textAlignVertical: 'top' }]}
          errorStyle={styles.error}
          inputContainerStyle={[
            styles.inputContainer,
            styles.noteInputContainer,
          ]}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <NativeText style={styles.saveButtonText}>Save Expense</NativeText>
        </TouchableOpacity>

        <SuccessModal
          visible={showSuccessModal}
          onClose={handleModalClose}
          title="Added Successfully"
          message="Your expense has been added successfully. You can now view it in your transaction history."
        />
      </View>
    </FormProvider>
  );
};

export default AddExpenseForm;
