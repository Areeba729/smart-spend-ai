import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import styles from './style'; // Assuming you already have styles defined
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const BudgetDateRange = ({ onDateChange }) => {
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Function to calculate the end date (one month after the start date)
  const calculateEndDate = start => {
    const endDate = new Date(start);
    endDate.setMonth(start.getMonth() + 1); // Adding 1 month to the start date
    return endDate;
  };

  useEffect(() => {
    // Fetch the start and end dates from Firestore when the component mounts
    const fetchUserDates = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();
          const data = userDoc.data();

          if (data && data.startDate && data.endDate) {
            setStartDate(data.startDate.toDate()); // Convert firestore Timestamp to JS Date
            setEndDate(data.endDate.toDate()); // Convert firestore Timestamp to JS Date
          }
        }
      } catch (error) {
        console.error('Error fetching user dates:', error);
      }
    };

    fetchUserDates();
  }, []);

  const handleStartDateConfirm = date => {
    setStartDate(date);
    setStartDatePickerVisibility(false);

    // Automatically calculate end date based on the start date
    const calculatedEndDate = calculateEndDate(date);
    setEndDate(calculatedEndDate);
    onDateChange(date, 'start');
    onDateChange(calculatedEndDate, 'end');

    // Save the date range to Firestore
    saveBudgetDateRange(date, calculatedEndDate);
  };

  const formattedStartDate = startDate
    ? format(startDate, 'MMMM dd, yyyy')
    : 'Select Start Date';
  const formattedEndDate = endDate
    ? format(endDate, 'MMMM dd, yyyy')
    : 'End Date Will Be Calculated';

  // Function to save the budget date range to Firestore
  const saveBudgetDateRange = async (startDate, endDate) => {
    try {
      const user = auth().currentUser;

      if (!user) {
        throw new Error('User is not logged in');
      }

      const userRef = firestore().collection('users').doc(user.uid);

      // Update Firestore with the start date and end date
      await userRef.update({
        startDate: firestore.Timestamp.fromDate(new Date(startDate)),
        endDate: firestore.Timestamp.fromDate(endDate),
      });

      console.log('Budget date range saved successfully!');
    } catch (error) {
      console.error('Error saving budget date range:', error.message);
    }
  };

  return (
    <View style={styles.dateRangeContainer}>
      <TouchableOpacity onPress={() => setStartDatePickerVisibility(true)}>
        <Text style={styles.dateRangeText}>
          <Text style={styles.boldText}>Start Date: </Text>
          <Text style={styles.changeDateText}>{formattedStartDate}</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.changeDateText}>
        <Text style={styles.dateRangeText}>
          <Text style={styles.boldText}>End Date: </Text>
          <Text style={styles.changeDateText}>{formattedEndDate}</Text>
        </Text>
      </TouchableOpacity>

      {/* Start Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDateConfirm}
        onCancel={() => setStartDatePickerVisibility(false)}
      />
    </View>
  );
};

export default BudgetDateRange;
