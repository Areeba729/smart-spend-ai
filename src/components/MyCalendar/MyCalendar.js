import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Theme } from '../../libs';
import { scale } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import {
  saveEventToFirestore,
  updateEventInFirestore,
} from '../../hooks/AddEventFunction';
import { fetchUserEvents } from '../../hooks/fetchUserEvents';
import { useFocusEffect } from '@react-navigation/native';

/* ================= HELPERS ================= */

const parseCalendarDate = dateString => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const startOfDay = date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = date => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const formatDisplayDate = date => date.toLocaleDateString('en-GB');

const parseEventDate = value => {
  if (!value) return null;
  if (typeof value.toDate === 'function') return value.toDate();
  return new Date(value);
};

const toDateString = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const buildMarkedDates = eventsList =>
  eventsList.reduce((acc, event, index) => {
    if (!event?.start) return acc;

    const d = parseEventDate(event.start);
    if (!d || Number.isNaN(d.getTime())) return acc;

    const formattedDate = toDateString(d);

    if (!acc[formattedDate]) {
      acc[formattedDate] = { dots: [] };
    }

    acc[formattedDate].dots.push({
      key: event.id || `event-${index}`,
      color: Theme.colors.secondary,
    });

    return acc;
  }, {});

/* ================= COMPONENT ================= */

export default function MyCalendar({
  events,
  setEvents,
  eventToEdit,
  onEditModalClose,
}) {
  // const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEventIndex, setEditingEventIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    eventTitle.trim().length > 0 && startDate !== null && endDate !== null;

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

  const submitEvent = async () => {
    if (!isFormValid) {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Event',
        text2: 'Please fill all required fields',
        position: 'top',
      });
      return;
    }

    if (isSubmitting) return;

    const start = startOfDay(startDate);
    const end = endOfDay(endDate);

    const eventPayload = {
      title: eventTitle,
      description: eventDescription,
      start,
      end,
    };

    setIsSubmitting(true);

    try {
      if (isEditMode && editingEventIndex !== null) {
        await updateEventInFirestore(editingEventIndex, eventPayload);

        setEvents(prev =>
          prev.map((event, index) =>
            index === editingEventIndex
              ? { ...eventPayload, id: event.id }
              : event,
          ),
        );

        closeModal();
        Toast.show({
          type: 'success',
          text1: 'Event Updated',
          text2: 'Your event has been updated successfully',
          position: 'top',
        });
      } else {
        const savedEvent = await saveEventToFirestore(eventPayload);

        setEvents(prev => [...prev, { ...eventPayload, id: savedEvent.id }]);

        closeModal();
        Toast.show({
          type: 'success',
          text1: 'Event Added',
          text2: 'Your event has been added successfully',
          position: 'top',
        });
      }
    } catch {
      Toast.show({
        type: 'error',
        text1: isEditMode ? 'Update Failed' : 'Save Failed',
        text2: 'Please try again',
        position: 'top',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModalFields = () => {
    setEventTitle('');
    setEventDescription('');
    setStartDate(null);
    setEndDate(null);
    setIsEditMode(false);
    setEditingEventIndex(null);
    setSelectedDate('');
  };

  const closeModal = () => {
    if (isSubmitting) return;
    resetModalFields();
    setModalVisible(false);
    onEditModalClose?.();
  };

  const openModalForDate = dateString => {
    setIsEditMode(false);
    setEditingEventIndex(null);
    setSelectedDate(dateString);
    setEventTitle('');
    setEventDescription('');
    setStartDate(parseCalendarDate(dateString));
    setEndDate(null);
    setModalVisible(true);
  };

  const openModalForEdit = (event, index) => {
    const start = parseEventDate(event.start);
    const end = parseEventDate(event.end);

    setIsEditMode(true);
    setEditingEventIndex(index);
    setSelectedDate(start ? toDateString(start) : '');
    setEventTitle(event.title || '');
    setEventDescription(event.description || '');
    setStartDate(start);
    setEndDate(end);
    setModalVisible(true);
  };

  useEffect(() => {
    if (!eventToEdit) return;
    openModalForEdit(eventToEdit.event, eventToEdit.index);
  }, [eventToEdit]);

  /* ================= UI ================= */

  return (
    <View>
      {/* CALENDAR */}
      <Calendar
        style={styles.calendar}
        markingType="multi-dot"
        onDayPress={day => openModalForDate(day.dateString)}
        markedDates={buildMarkedDates(events)}
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
            <Text style={styles.modalTitle1}>
              {isEditMode ? 'Update Event' : 'Add Event'}
            </Text>
            <Text style={styles.modalTitle}>Event Title</Text>
            <TextInput
              placeholder="Event Title"
              placeholderTextColor={Theme.colors.black}
              style={styles.input}
              value={eventTitle}
              onChangeText={setEventTitle}
            />
            <Text style={styles.modalTitle}>Event Description</Text>
            <TextInput
              placeholder="Event Description"
              placeholderTextColor={Theme.colors.black}
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
              <Text>
                Start Date:{' '}
                {startDate ? formatDisplayDate(startDate) : 'Select'}
              </Text>
            </TouchableOpacity>

            {showStartDatePicker && startDate && (
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

            {/* END DATE */}
            <Text style={styles.modalTitle}>End Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text>
                End Date: {endDate ? formatDisplayDate(endDate) : 'Select'}
              </Text>
            </TouchableOpacity>

            {showEndDatePicker && (
              <DateTimePicker
                value={endDate || startDate || new Date()}
                mode="date"
                onChange={(e, date) => {
                  setShowEndDatePicker(false);
                  if (!date) return;
                  setEndDate(date);
                }}
              />
            )}

            {/* BUTTONS */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                onPress={submitEvent}
                disabled={isSubmitting}
              >
                <View style={styles.buttonInner}>
                  <Text
                    style={[
                      styles.buttonText,
                      isSubmitting && styles.buttonTextHidden,
                    ]}
                  >
                    {isEditMode ? 'Update Event' : 'Add Event'}
                  </Text>
                  {isSubmitting && (
                    <View style={styles.loaderOverlay}>
                      <ActivityIndicator
                        color={Theme.colors.white}
                        size="small"
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.cancelButton,
                  isSubmitting && styles.buttonDisabled,
                ]}
                onPress={closeModal}
                disabled={isSubmitting}
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
  calendar: {
    paddingBottom: scale(8),
  },
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
    gap: scale(8),
  },
  modalTitle: { fontSize: scale(12), fontWeight: '600', marginBottom: 10 },
  button: {
    flex: 1,
    minHeight: scale(44),
    backgroundColor: Theme.colors.secondary,
    paddingVertical: scale(10),
    paddingHorizontal: scale(10),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'red',
  },
  buttonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonTextHidden: {
    opacity: 0,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
