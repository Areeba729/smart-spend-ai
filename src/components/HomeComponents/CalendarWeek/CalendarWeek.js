import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import NativeText from '../../NativeText/NativeText';
import styles from './CalendarWeekStyles';

const CalendarWeek = ({ selectedDate, onDateSelect }) => {
  const today = new Date();

  const formatDate = date => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getWeekDays = () => {
    const days = [];
    // Start with a date at midnight
    const baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0);

    // Get Monday of the current week (Sunday is 0, Monday is 1)
    const dayOfWeek = baseDate.getDay();
    const diff = baseDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

    const monday = new Date(baseDate.setDate(diff));

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push({
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
        fullDate: d,
      });
    }
    return days;
  };

  const weekDays = getWeekDays();
  const currentMonth = formatDate(today);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.monthHeader}>
        <NativeText style={styles.monthText}>{currentMonth}</NativeText>
        <NativeText style={styles.dropdownIcon}>▼</NativeText>
      </TouchableOpacity>

      <View style={styles.weekContainer}>
        {weekDays.map(item => {
          const todayMidnight = new Date().setHours(0, 0, 0, 0);
          const itemTime = item.fullDate.getTime();
          const isPast = itemTime < todayMidnight;
          const isSelected = selectedDate === itemTime;

          return (
            <TouchableOpacity
              key={item.date}
              style={[styles.dayContainer, isPast && styles.disabledDay]}
              onPress={() =>
                !isPast && onDateSelect && onDateSelect(item.fullDate.getTime())
              }
              disabled={isPast}
            >
              <NativeText style={styles.dayLabel}>{item.day}</NativeText>
              <View
                style={[
                  styles.dateCircle,
                  isSelected && styles.selectedDateCircle,
                ]}
              >
                <NativeText
                  style={[
                    styles.dateText,
                    isSelected && styles.selectedDateText,
                  ]}
                >
                  {item.date}
                </NativeText>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CalendarWeek;
