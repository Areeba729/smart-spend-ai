import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Theme } from '../../libs';
import { scale } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import { saveEventToFirestore } from '../../hooks/AddEventFunction';
import { fetchUserEvents } from '../../hooks/fetchUserEvents';
import { useFocusEffect } from '@react-navigation/native';

/* ================= HELPERS ================= */

const formatTime = date =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const mergeDateAndTime = (date, time) => {
  const d = new Date(date);
  d.setHours(time.getHours(), time.getMinutes(), 0, 0);
  return d;
};

/* ================= COMPONENT ================= */

export default function MyCalendar({ events, setEvents }) {
  // const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  // useFocusEffect(
  //   useCallback(() => {
  //     const loadEvents = async () => {
  //       const userEvents = await fetchUserEvents(); // Fetch events from Firestore
  //       setEvents(userEvents);
  //     };

  //     loadEvents();
  //   }, []),
  // );
  const isFormValid =
    eventTitle.trim().length > 0 &&
    startTime !== null &&
    endTime !== null &&
    startDate !== null &&
    endDate !== null;

  /* ================= ADD EVENT ================= */

  //   const addEvent = () => {
  //     if (!isFormValid) {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Incomplete Event',
  //         text2: 'Please fill all required fields',
  //         position: 'top',
  //       });
  //       return;
  //     }

  //     const start = mergeDateAndTime(startDate, startTime);
  //     const end = mergeDateAndTime(endDate, endTime);

  //     const newEvent = {
  //       title: eventTitle,
  //       description: eventDescription,
  //       start,
  //       end,
  //     };

  //     setEvents(prev => ({
  //       ...prev,
  //       [selectedDate]: [...(prev[selectedDate] || []), newEvent],
  //     }));

  //     Toast.show({
  //       type: 'success',
  //       text1: 'Event Added',
  //       text2: 'Your event has been added successfully',
  //       position: 'top',
  //     });

  //     resetModalFields();
  //     setModalVisible(false);
  //   };

  const addEvent = async () => {
    if (!isFormValid) {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Event',
        text2: 'Please fill all required fields',
        position: 'top',
      });
      return;
    }

    const start = mergeDateAndTime(startDate, startTime);
    const end = mergeDateAndTime(endDate, endTime);

    const newEvent = {
      title: eventTitle,
      description: eventDescription,
      start,
      end,
    };

    await saveEventToFirestore(newEvent);

    setEvents(prev => [...prev, newEvent]);

    Toast.show({
      type: 'success',
      text1: 'Event Added',
      text2: 'Your event has been added successfully',
      position: 'top',
    });

    resetModalFields();
    setModalVisible(false);
  };
  const resetModalFields = () => {
    setEventTitle('');
    setEventDescription('');
    setStartDate(new Date());
    setEndDate(new Date());
    setStartTime(null);
    setEndTime(null);
  };

  /* ================= UI ================= */

  return (
    <View style={{ flex: 1 }}>
      {/* CALENDAR */}
      <Calendar
        onDayPress={day => {
          setSelectedDate(day.dateString);
          resetModalFields(); // 👈 clear previous data
          setModalVisible(true);
        }}
        markedDates={events.reduce((acc, event) => {
          if (!event?.start) return acc;

          // 🔥 Convert Firestore Timestamp properly
          const d =
            typeof event.start.toDate === 'function'
              ? event.start.toDate()
              : new Date(event.start);

          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');

          const formattedDate = `${year}-${month}-${day}`;

          if (!acc[formattedDate]) {
            acc[formattedDate] = {
              marked: true,
              dotColor: 'red',
            };
          }

          return acc;
        }, {})}
        //        markedDates={events.reduce((acc, event) => {
        //   const date = new Date(event.start).toISOString().split('T')[0];
        //   acc[date] = { marked: true, dotColor: Theme.colors.secondary };
        //   return acc;
        // }, {})}
      />
      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        customModalProps={{
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle1}>Add Event for {selectedDate}</Text>
            <Text style={styles.modalTitle}>Event Title</Text>
            <TextInput
              placeholder="Event Title"
              placeholderTextColor={Theme.colors.text}
              style={styles.input}
              value={eventTitle}
              onChangeText={setEventTitle}
            />
            <Text style={styles.modalTitle}>Event Description</Text>
            <TextInput
              placeholder="Event Description"
              placeholderTextColor={Theme.colors.text}
              style={styles.input}
              value={eventDescription}
              onChangeText={setEventDescription}
            />

            {/* START DATE */}
            <Text style={styles.modalTitle}>Start Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text>Start Date: {startDate.toDateString()}</Text>
            </TouchableOpacity>

            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                onChange={(e, date) => {
                  setShowStartDatePicker(false);
                  if (!date) return;
                  setStartDate(date);
                }}
              />
            )}

            {/* START TIME */}
            <Text style={styles.modalTitle}>Start Time</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowStartTimePicker(true)}
            >
              <Text>
                Start Time: {startTime ? formatTime(startTime) : 'Select'}
              </Text>
            </TouchableOpacity>

            {showStartTimePicker && (
              <DateTimePicker
                value={startTime || new Date()}
                mode="time"
                onChange={(e, date) => {
                  setShowStartTimePicker(false);
                  if (!date) return;
                  setStartTime(date);
                }}
              />
            )}

            {/* END DATE */}
            <Text style={styles.modalTitle}>End Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text>End Date: {endDate.toDateString()}</Text>
            </TouchableOpacity>

            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                onChange={(e, date) => {
                  setShowEndDatePicker(false);
                  if (!date) return;
                  setEndDate(date);
                }}
              />
            )}

            {/* END TIME */}
            <Text style={styles.modalTitle}>End Time</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowEndTimePicker(true)}
            >
              <Text style={styles.modalText}>
                End Time: {endTime ? formatTime(endTime) : 'Select'}
              </Text>
            </TouchableOpacity>

            {showEndTimePicker && (
              <DateTimePicker
                value={endTime || new Date()}
                mode="time"
                onChange={(e, date) => {
                  setShowEndTimePicker(false);
                  if (!date) return;
                  setEndTime(date);
                }}
              />
            )}

            {/* BUTTONS */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={addEvent}>
                <Text style={styles.buttonText}>Add Event</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  resetModalFields();
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: 'red' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  eventsHeader: {
    fontSize: scale(12),
    fontWeight: '600',
    margin: 10,
  },
  eventItem: {
    backgroundColor: '#e0f0ff',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  eventText: { fontSize: 16, fontWeight: '600' },
  eventDesc: { fontSize: 14, color: '#555' },
  eventTime: { fontSize: 12, color: '#333' },
  noEvent: { textAlign: 'center', marginTop: 20, color: '#888' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle1: {
    fontSize: scale(14),
    fontWeight: 'bold',
    marginBottom: 15,
    color: Theme.colors.secondary,
  },
  //   modalText: {
  //     fontSize: scale(12),
  //     fontWeight: '500',
  //     color: Theme.colors.text,
  //   },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalTitle: { fontSize: scale(12), fontWeight: '600', marginBottom: 10 },
  button: {
    backgroundColor: Theme.colors.secondary,
    padding: 10,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
