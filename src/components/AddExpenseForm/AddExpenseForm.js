import React, { useState } from 'react';
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
import NativeInput from '../NativeInput/NativeInput';
import { calendarIcon } from '../../assets/icons';
import { styles } from './style';
import { Theme } from '../../libs';

const AddExpenseForm = ({ onSubmit, onCancel }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const categories = [
    { id: 1, name: 'Shopping', icon: '🛒', color: '#86AE12' },
    { id: 2, name: 'Food', icon: '🍴', color: '#1C1C1E' },
    { id: 3, name: 'Transport', icon: '🚗', color: '#1C1C1E' },
    { id: 4, name: 'More', icon: '•••', color: '#1C1C1E' },
  ];

  const form = useSmartForm({
    fields: {
      amount: {
        type: 'number',
        required: true,
        defaultValue: '0',
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
    // Android
    if (Platform.OS === 'android') {
      setShowDatePicker(false);

      if (event.type === 'set' && selectedDate) {
        form.setFieldValue('date', selectedDate);
        form.setFieldTouched('date', true);
      }
      return;
    }

    // iOS
    if (selectedDate) {
      form.setFieldValue('date', selectedDate);
      form.setFieldTouched('date', true);
    }
  };

  const handleSave = async () => {
    await form.submitForm();
    if (form.isValid) {
      setShowSuccessModal(true);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    onSubmit(form.values);
  };

  const formatDate = date => {
    if (!(date instanceof Date)) return '';
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        {/* Amount Field */}
        <View style={styles.amountSection}>
          <NativeText style={styles.label}>AMOUNT</NativeText>
          <View style={styles.amountInputRow}>
            <NativeText style={styles.currencySymbol}>PKR</NativeText>
            <TextInput
              style={styles.amountValue}
              value={form.values.amount}
              onChangeText={val => form.setFieldValue('amount', val)}
              keyboardType="numeric"
            />
          </View>
          {form.errors.amount && (
            <NativeText style={styles.error}>{form.errors.amount}</NativeText>
          )}
        </View>

        {/* Title Field */}
        <SmartFormField
          name="title"
          label="Expense Title"
          placeholder="e.g. Grocery Shopping"
          placeholderTextColor="#666"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
          leftIcon={<NativeText style={styles.inputIcon}>✏️</NativeText>}
        />

        {/* Category Field */}
        <View style={styles.inputSection}>
          <View style={styles.sectionHeader}>
            <NativeText style={styles.label}>Category</NativeText>
            <NativeText style={styles.aiTag}>✨ AI Suggested</NativeText>
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
        <View style={styles.inputSection1}>
          <NativeText style={styles.label}>Date</NativeText>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowDatePicker(true)}
          >
            <NativeInput
              value={formatDate(form.values.date)}
              placeholder="Select date"
              placeholderTextColor="#666"
              editable={false} // ⛔ keyboard nahi khulega
              pointerEvents="none" // ⛔ input touch handle nahi karega
              leftIcon={<SvgXml xml={calendarIcon} width={20} height={20} />}
              inputContainerStyle={[
                styles.datePickerTrigger,
                form.errors.date && styles.datePickerError,
              ]}
              inputStyle={styles.dateText}
            />
          </TouchableOpacity>

          {form.errors.date && (
            <NativeText style={styles.error}>{form.errors.date}</NativeText>
          )}
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={
              form.values.date instanceof Date ? form.values.date : new Date()
            }
            mode="date"
            minimumDate={new Date()} // 🚫 past date disabled
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}

        {/* Note Field */}
        <SmartFormField
          name="note"
          label="Note (Optional)"
          placeholder="Add details..."
          placeholderTextColor="#666"
          multiline
          fieldStyle={[styles.field, styles.noteContainer]}
          labelStyle={styles.label}
          style={styles.noteInput}
          errorStyle={styles.error}
          inputContainerStyle={[
            styles.inputContainer,
            styles.noteInputContainer,
          ]}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <NativeText style={styles.saveButtonIcon}>✓</NativeText>
          <NativeText style={styles.saveButtonText}>Save Expense</NativeText>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCancel}>
          <NativeText style={styles.cancelText}>Cancel</NativeText>
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
