import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/userSlice';
import MyCalendar from '../../../components/MyCalendar/MyCalendar';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    // yahan logout logic aayega
  };
  const event = {
    summary: 'Meeting with Client',
    description: 'Discuss project milestones',
    start: { dateTime: '2026-01-03T10:00:00-05:00' },
    end: { dateTime: '2026-01-03T11:00:00-05:00' },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>Welcome to your Profile</Text>
      <MyCalendar event={event} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
