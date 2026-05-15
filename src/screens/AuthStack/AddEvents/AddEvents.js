import React, { useCallback, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import MyCalendar from '../../../components/MyCalendar/MyCalendar';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import ScreenLoader from '../../../components/ScreenLoader/ScreenLoader';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import { fetchUserEvents } from '../../../hooks/fetchUserEvents';
import { deleteEventFromFirestore } from '../../../hooks/AddEventFunction';
import { editIcon, trashIcon } from '../../../assets/icons';
import styles from './style';
import { Theme } from '../../../libs';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const AddEvents = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadEvents();
    }, []),
  );

  const loadEvents = async () => {
    setLoading(true);
    const data = await fetchUserEvents();
    setEvents(data);
    setLoading(false);
  };
  const handleEditPress = (event, index) => {
    setEventToEdit({ event, index });
  };

  const handleDeletePress = event => {
    setSelectedEvent(event);
    setDeleteModalVisible(true);
  };

  const handleCancelDelete = () => {
    if (isDeleting) return;
    setDeleteModalVisible(false);
    setSelectedEvent(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEvent?.id || isDeleting) return;

    setIsDeleting(true);

    try {
      await deleteEventFromFirestore(selectedEvent.id);
      setEvents(prev => prev.filter(event => event.id !== selectedEvent.id));
      setDeleteModalVisible(false);
      setSelectedEvent(null);
      Toast.show({
        type: 'success',
        text1: 'Event Deleted',
        text2: 'Your event has been removed successfully',
        position: 'top',
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Delete Failed',
        text2: 'Please try again',
        position: 'top',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventCardContent}>
        <Text style={styles.title}>Title: {item.title}</Text>
        <Text style={styles.description}>Description: {item.description}</Text>
      </View>
      <View style={styles.eventCardActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditPress(item, index)}
        >
          <SvgXml
            xml={editIcon}
            width={20}
            height={20}
            color={Theme.colors.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeletePress(item)}
        >
          <SvgXml
            xml={trashIcon}
            width={20}
            height={20}
            color={Theme.colors.secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SimpleHeader
        title="Add Events"
        onBackPress={() => navigation.goBack()}
      />

      {loading ? (
        <ScreenLoader color={Theme.colors.secondary} />
      ) : (
        <>
          <View style={styles.calendarContainer}>
            <MyCalendar
              events={events}
              setEvents={setEvents}
              eventToEdit={eventToEdit}
              onEditModalClose={() => setEventToEdit(null)}
            />
          </View>
          <Text style={styles.listTitle}>Events</Text>
          <View style={styles.ListContainer}>
            <FlatList
              data={events}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No events found</Text>
              }
            />
          </View>
        </>
      )}

      <DeleteModal
        visible={deleteModalVisible}
        message="Are you sure you want to delete this event?"
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
    </View>
  );
};

export default AddEvents;
