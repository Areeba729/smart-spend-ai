import React from 'react';
import { View, Modal, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import NativeText from '../NativeText/NativeText';
import { Theme } from '../../libs';
import styles from './CalendarModalStyles';

const CalendarModal = ({ visible, onClose, selectedDate, onDateChange }) => {
  const [date, setDate] = React.useState(selectedDate || new Date());

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      if (event.type === 'set') {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        onDateChange(currentDate);
        onClose();
      } else {
        onClose();
      }
    } else {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      onDateChange(currentDate);
    }
  };

  const handleDone = () => {
    onDateChange(date);
    onClose();
  };

  if (Platform.OS === 'android') {
    return visible ? (
      <DateTimePicker
        value={date}
        mode="date"
        display="calendar"
        onChange={handleDateChange}
      />
    ) : null;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <NativeText
                style={styles.cancelButton}
                fontFamily={Theme.fonts.medium}
              >
                Cancel
              </NativeText>
            </TouchableOpacity>
            <NativeText
              style={styles.modalTitle}
              fontFamily={Theme.fonts.semiBold}
            >
              Select Date
            </NativeText>
            <TouchableOpacity onPress={handleDone}>
              <NativeText
                style={styles.doneButton}
                fontFamily={Theme.fonts.semiBold}
              >
                Done
              </NativeText>
            </TouchableOpacity>
          </View>

          <DateTimePicker
            value={date}
            mode="date"
            display="inline"
            onChange={handleDateChange}
            textColor={Theme.colors.white}
            themeVariant="dark"
          />
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;
