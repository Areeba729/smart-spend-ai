import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import MyCalendar from '../../../components/MyCalendar/MyCalendar';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import ScreenLoader from '../../../components/ScreenLoader/ScreenLoader';
import { fetchUserEvents } from '../../../hooks/fetchUserEvents';
import styles from './style';
import { Theme } from '../../../libs';
import { useFocusEffect } from '@react-navigation/native';

const AddEvents = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

useFocusEffect(
  useCallback(() => {
    loadEvents();
  }, [])
);

  const loadEvents = async () => {
    setLoading(true);
    const data = await fetchUserEvents();
    setEvents(data);
    setLoading(false);
  };
  const formatTime = date => {
    const options = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true, // AM/PM format
    };
    return new Date(date).toLocaleTimeString('en-US', options);
  };

  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-GB'); // format like: 03/01/2026
  };
  const renderItem = ({ item }) => (
    <View style={styles.eventCard}>
      <Text style={styles.title}>Title: {item.title}</Text>
      <Text style={styles.description}>Description: {item.description}</Text>
      <Text style={styles.date}>
        Start: {formatTime(item.start)} → End: {formatTime(item.end)}
      </Text>
      <Text style={styles.date}>
        Start: {formatDate(item.start)} → End: {formatDate(item.end)}
      </Text>
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
        <MyCalendar events={events} setEvents={setEvents} />
      </View>
      <View style={styles.ListContainer}>
        <Text style={styles.listTitle}>Events</Text>
        <FlatList
            data={events}
            keyExtractor={(_, index) => index.toString()}
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
    </View>
  );
};

export default AddEvents;
