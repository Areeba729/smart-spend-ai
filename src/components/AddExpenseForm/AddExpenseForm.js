import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SvgXml } from 'react-native-svg';
import NativeText from '../NativeText/NativeText';
import NativeInput from '../NativeInput/NativeInput';
import SuccessModal from '../SuccessModal/SuccessModal';
import { calendarIcon } from '../../assets/icons';
import { styles } from './style';
import {
  saveExpenseToFirestore,
  updateExpenseInFirestore,
} from '../../hooks/ExpenseFunction';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '../../libs';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const AddExpenseForm = ({ onSubmit, prefillData, editExpense }) => {
  const isEditing = !!editExpense;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const dateValue = prefillData?.date;

    if (dateValue instanceof Date) {
      return dateValue; // Already a JS Date
    }

    // Firestore Timestamp
    if (dateValue?.seconds != null && dateValue?.nanoseconds != null) {
      return new firestore.Timestamp(
        dateValue.seconds,
        dateValue.nanoseconds,
      ).toDate();
    }

    // Fallback to current date
    return new Date();
  });
  console.log(prefillData);

  const [loading, setLoading] = useState(false); // State for loader

  // Sync selectedDate when navigated from the receipt scanner or edit flow
  useEffect(() => {
    const dateFromEdit = parseExpenseDateForForm(editExpense?.date);
    if (dateFromEdit) {
      setSelectedDate(dateFromEdit);
    } else if (prefillData?.date instanceof Date) {
      setSelectedDate(prefillData.date);
    }
  }, [editExpense?.date, prefillData?.date]);

  const categories = [
    { id: 5, name: 'others', icon: '📦', color: '#1C1C1E' },
    { id: 1, name: 'shopping', icon: '🛒', color: '#86AE12' },
    { id: 2, name: 'food', icon: '🍴', color: '#1C1C1E' },
    { id: 3, name: 'transport', icon: '🚗', color: '#1C1C1E' },
    { id: 4, name: 'medical', icon: '💊', color: '#1C1C1E' },
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
    setLoading(true);
    const expenseData = {
      amount: values.amount,
      title: values.title,
      category: values.category,
      date: values.date,
      note: values.note,
      currency: values.currency || 'PKR',
    };

    try {
      if (isEditing) {
        await updateExpenseInFirestore(editExpense, expenseData);
      } else {
        await saveExpenseToFirestore(expenseData);
      }
      setLoading(false);
      setShowSuccessModal(true);
      if (!isEditing) resetForm();
    } catch (error) {
      console.error('Error saving expense:', error);
      setLoading(false);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        amount: editExpense?.amount ?? prefillData?.amount ?? '',
        title: editExpense?.title ?? prefillData?.title ?? '',
        category:
          editExpense?.category?.toLowerCase() ??
          prefillData?.category?.toLowerCase() ??
          'others',
        date:
          parseExpenseDateForForm(editExpense?.date) ??
          (prefillData?.date instanceof Date ? prefillData.date : new Date()),
        note: editExpense?.note ?? prefillData?.note ?? '',
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
            <ScrollView
              style={styles.categoryGrid}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {categories.map((cat, i) => (
                <TouchableOpacity
                  key={cat.name}
                  style={[
                    styles.categoryItem,
                    values.category === cat.name
                      ? styles.categoryItemActive
                      : styles.categoryItemInactive,
                    i === 0 ? { marginLeft: 0 } : { marginLeft: 4 }, // Remove left margin for the first item
                    i === categories.length - 1
                      ? { marginRight: 0 }
                      : { marginRight: 4 }, // Remove right margin for the last item
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
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                  </NativeText>
                </TouchableOpacity>
              ))}
            </ScrollView>
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

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            <NativeText style={styles.saveButtonText}>
              {isEditing ? 'Update Expense' : 'Save Expense'}
            </NativeText>
          </TouchableOpacity>

          {/* Full-screen loader while saving */}
          <Modal visible={loading} transparent animationType="fade">
            <View style={loaderStyles.overlay}>
              <View style={loaderStyles.box}>
                <ActivityIndicator
                  size="large"
                  color={Theme.colors.secondary}
                />
                <NativeText style={loaderStyles.text}>
                  {isEditing ? 'Updating expense...' : 'Saving expense...'}
                </NativeText>
              </View>
            </View>
          </Modal>

          <SuccessModal
            visible={showSuccessModal}
            onClose={() => {
              setShowSuccessModal(false);
              if (isEditing) {
                navigation.goBack();
              } else {
                navigation.navigate('Home');
              }
            }}
            title={isEditing ? 'Updated Successfully' : 'Added Successfully'}
            message={
              isEditing
                ? 'Your expense has been updated successfully.'
                : 'Your expense has been added successfully. You can now view it in your transaction history.'
            }
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

const parseExpenseDateForForm = dateField => {
  if (!dateField) return null;
  if (dateField instanceof Date) return dateField;
  if (typeof dateField === 'object' && typeof dateField.toDate === 'function') {
    return dateField.toDate();
  }
  if (typeof dateField === 'object' && dateField._seconds != null) {
    return new Date(dateField._seconds * 1000);
  }
  if (typeof dateField === 'string') {
    const parts = dateField.split('-');
    if (parts.length === 3 && parts[0].length <= 2) {
      const [day, month, year] = parts;
      return new Date(`${year}-${month}-${day}`);
    }
    return new Date(dateField);
  }
  return null;
};

const formatDate = date => {
  if (!(date instanceof Date)) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const loaderStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: Theme.colors.primary,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 200,
  },
  text: {
    color: Theme.colors.text,
    fontSize: 14,
    marginTop: 12,
  },
});

export default AddExpenseForm;
