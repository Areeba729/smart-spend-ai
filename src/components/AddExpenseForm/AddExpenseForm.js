import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  useSmartForm,
  FormProvider,
  SmartFormField,
} from 'react-native-fn-forms';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Import DateTimePickerModal
import { SvgXml } from 'react-native-svg';
import NativeText from '../NativeText/NativeText';
import SuccessModal from '../SuccessModal/SuccessModal';
import { calendarIcon } from '../../assets/icons';
import { styles } from './style';
import { saveExpenseToFirestore } from '../../hooks/ExpenseFunction';

const AddExpenseForm = ({ onSubmit, onCancel }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // For DateTimePicker visibility
  const [selectedDate, setSelectedDate] = useState(new Date()); // Store selected date

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

  const formatDate = date => {
    if (!(date instanceof Date)) return '';
    const day = String(date.getDate()).padStart(2, '0'); // Adds leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adds leading zero if necessary
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Handle Date Picker Confirmation
  const handleDateConfirm = date => {
    setSelectedDate(date);
    form.setFieldValue('date', date); // Set selected date in form
    setDatePickerVisibility(false); // Close the date picker
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

        {/* Date Field */}
        <SmartFormField
          name="date"
          label="Date"
          placeholder="Select date"
          placeholderTextColor="#666"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          editable={false}
          inputContainerStyle={styles.inputContainer}
          leftIcon={<SvgXml xml={calendarIcon} width={20} height={20} />}
          value={formatDate(selectedDate)} // Display the selected date
          onFocus={() => setDatePickerVisibility(true)} // Show the date picker when the input field is focused
        />

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

        {/* DateTimePickerModal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)} // Close the date picker
        />
      </View>
    </FormProvider>
  );
};

export default AddExpenseForm;
