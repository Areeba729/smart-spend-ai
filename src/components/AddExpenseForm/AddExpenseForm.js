import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SvgXml } from 'react-native-svg';
import NativeText from '../NativeText/NativeText';
import NativeInput from '../NativeInput/NativeInput';
import SuccessModal from '../SuccessModal/SuccessModal';
import { calendarIcon } from '../../assets/icons';
import { styles } from './style';
import { saveExpenseToFirestore } from '../../hooks/ExpenseFunction';

const AddExpenseForm = ({ onSubmit }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const categories = [
    { id: 1, name: 'Shopping', icon: '🛒', color: '#86AE12' },
    { id: 2, name: 'Food', icon: '🍴', color: '#1C1C1E' },
    { id: 3, name: 'Transport', icon: '🚗', color: '#1C1C1E' },
    { id: 4, name: 'Medical', icon: '💊', color: '#1C1C1E' },
  ];

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be positive'),
    title: Yup.string()
      .required('Title is required')
      .min(2, 'Title must be at least 2 characters'),
    category: Yup.string().required('Category is required'),
    date: Yup.date().required('Date is required'),
    note: Yup.string(),
  });

  const handleDateConfirm = (date, setFieldValue) => {
    setSelectedDate(date);
    setFieldValue('date', date);
    setDatePickerVisibility(false);
  };

  const handleSave = async (values, { resetForm }) => {
    const expenseData = {
      amount: values.amount,
      title: values.title,
      category: values.category,
      date: values.date,
      note: values.note,
    };

    await saveExpenseToFirestore(expenseData);
    setShowSuccessModal(true);
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        amount: '',
        title: '',
        category: 'Shopping',
        date: new Date(),
        note: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSave}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View style={styles.container}>
          {/* Amount Field */}
          <Text style={styles.label}>Amount</Text>
          <NativeInput
            label="Amount"
            placeholder="Enter amount"
            placeholderTextColor="#666"
            value={values.amount}
            onChangeText={handleChange('amount')}
            onBlur={handleBlur('amount')}
            keyboardType="numeric"
            error={touched.amount && errors.amount} // Display validation error
            errorMessage={touched.amount && errors.amount} // Show error message
            style={styles.input}
            inputContainerStyle={styles.inputContainer}
          />

          {/* Title Field */}
          <Text style={styles.label}>Title</Text>
          <NativeInput
            label="Expense Title"
            placeholder="Enter title"
            placeholderTextColor="#666"
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            keyboardType="default"
            error={touched.title && errors.title} // Display validation error
            errorMessage={touched.title && errors.title} // Show error message
            style={styles.input}
            inputContainerStyle={styles.inputContainer}
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
                    values.category === cat.name
                      ? styles.categoryItemActive
                      : styles.categoryItemInactive,
                  ]}
                  onPress={() => setFieldValue('category', cat.name)}
                >
                  <NativeText style={styles.categoryIcon}>
                    {cat.icon}
                  </NativeText>
                  <NativeText
                    style={[
                      styles.categoryName,
                      values.category === cat.name
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
          <Text style={styles.label}>Date</Text>
          <NativeInput
            label="Date"
            placeholder="Select date"
            placeholderTextColor="#666"
            value={formatDate(selectedDate)}
            onPressIn={() => setDatePickerVisibility(true)} // Use onPressIn to open modal
            editable={false}
            error={touched.date && errors.date} // Display validation error
            errorMessage={touched.date && errors.date} // Show error message
            style={styles.input}
            inputContainerStyle={styles.inputContainer}
            leftIcon={<SvgXml xml={calendarIcon} />}
          />

          {/* Note Field */}
          <Text style={styles.label}>Notes</Text>
          <NativeInput
            label="Note (Optional)"
            placeholder="Add details..."
            placeholderTextColor="#666"
            value={values.note}
            onChangeText={handleChange('note')}
            onBlur={handleBlur('note')}
            multiline
            inputContainerStyle={styles.inputContainer1}
            style={[styles.noteInput, { textAlignVertical: 'top' }]}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <NativeText style={styles.saveButtonText}>Save Expense</NativeText>
          </TouchableOpacity>

          <SuccessModal
            visible={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            title="Added Successfully"
            message="Your expense has been added successfully. You can now view it in your transaction history."
          />

          {/* DateTimePickerModal */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={date => handleDateConfirm(date, setFieldValue)}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </View>
      )}
    </Formik>
  );
};

const formatDate = date => {
  if (!(date instanceof Date)) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export default AddExpenseForm;
