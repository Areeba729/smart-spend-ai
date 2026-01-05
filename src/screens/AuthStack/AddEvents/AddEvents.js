import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import MyCalendar from '../../../components/MyCalendar/MyCalendar';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { fetchUserEvents } from '../../../hooks/fetchUserEvents';
import styles from './style';
import { Theme } from '../../../libs';

const AddEvents = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

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

      <View style={styles.calendarContainer}>
        <MyCalendar />
      </View>
      <View style={styles.ListContainer}>
        <Text style={styles.listTitle}>Events</Text>
        {loading ? (
          <ActivityIndicator size="small" color={Theme.colors.secondary} />
        ) : (
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
        )}
      </View>
    </View>
  );
};

export default AddEvents;
