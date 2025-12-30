import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import NativeText from '../../components/NativeText/NativeText';
import CalendarModal from '../../components/CalendarModal/CalendarModal';
import styles from './style';
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';

const Calendar = ({ navigation, route }) => {
  const selectedDateFromHome = route?.params?.selectedDate;
  const [selectedDate, setSelectedDate] = useState(
    selectedDateFromHome ? new Date(selectedDateFromHome) : new Date(),
  );
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  useEffect(() => {
    if (selectedDateFromHome) {
      setSelectedDate(new Date(selectedDateFromHome));
    }
  }, [selectedDateFromHome]);

  const formatDate = date => {
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatDayMonth = date => {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleDateChange = newDate => {
    setSelectedDate(newDate);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const getExpenseDataForDate = date => {
    // Mock data - replace with actual API call
    return {
      totalSpent: 12700,
      transactions: 4,
      budgetImpact: 'Medium',
      budgetPercentage: 60,
      insight: 'Aaj aap ka kharch normal se thora zyada raha',
      transactionList: [
        {
          id: 1,
          name: 'McDonalds',
          category: 'Food',
          amount: 2500,
          time: '02:30 PM',
          icon: '🍔',
        },
        {
          id: 2,
          name: 'Uber Ride',
          category: 'Transport',
          amount: 1200,
          time: '04:15 PM',
          icon: '🚗',
        },
        {
          id: 3,
          name: 'Grocery Store',
          category: 'Shopping',
          amount: 8500,
          time: '07:00 PM',
          icon: '🛒',
        },
        {
          id: 4,
          name: 'Mobile Top-up',
          category: 'Bills',
          amount: 500,
          time: '09:45 PM',
          icon: '📱',
        },
      ],
    };
  };

  const getDaysInMonth = (year, month) => {
    const days = [];
    // Get the first day of the month (0 = Sunday, 1 = Monday, ...)
    const firstDay = new Date(year, month, 1).getDay();

    // Previous month's trailing days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      days.push({
        day: day,
        month: month - 1,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, day),
      });
    }

    // Current month's days
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: month,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i),
      });
    }

    // Next month's leading days to complete the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        month: month + 1,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, i),
      });
    }

    return days;
  };

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const calendarDays = getDaysInMonth(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
  );
  const expenseData = getExpenseDataForDate(selectedDate);

  const getDotsForDay = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return [];
    // Mock logic for dots
    if ([2, 9, 16, 24].includes(day)) return ['#4CD964']; // Green
    if ([4, 14, 21, 27].includes(day)) return ['#FF3B30']; // Red
    if ([7, 18, 29].includes(day)) return ['#FFCC00']; // Yellow
    return [];
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <SvgXml xml={BackArrowIcon} />
        </TouchableOpacity>

        <NativeText style={styles.headerTitle}>Calendar</NativeText>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.menuButton}>
            <NativeText style={styles.menuIcon}>⋯</NativeText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton}>
            <NativeText style={styles.settingsIcon}>⚙️</NativeText>
          </TouchableOpacity>
        </View>
      </View> */}

      <SimpleHeader title="Profile" onBackPress={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Month Header */}
        <View style={styles.monthHeader}>
          <TouchableOpacity onPress={handlePrevMonth}>
            <NativeText style={styles.navArrow}>‹</NativeText>
          </TouchableOpacity>

          <View style={styles.monthInfo}>
            <NativeText style={styles.monthText}>
              {formatDate(selectedDate)}
            </NativeText>
            <NativeText style={styles.totalSpent}>
              Total:{' '}
              <NativeText style={styles.totalAmount}>PKR 45,200</NativeText>
            </NativeText>
          </View>

          <TouchableOpacity onPress={handleNextMonth}>
            <NativeText style={styles.navArrow}>›</NativeText>
          </TouchableOpacity>
        </View>

        {/* Custom Calendar Grid */}
        <View style={styles.calendarContainer}>
          <View style={styles.weekDaysContainer}>
            {weekDays.map(day => (
              <NativeText key={day} style={styles.weekDayText}>
                {day}
              </NativeText>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {calendarDays.map((item, index) => {
              const itemTime = item.fullDate ? item.fullDate.getTime() : 0;
              const isSelected =
                item.isCurrentMonth &&
                itemTime === new Date(selectedDate).setHours(0, 0, 0, 0);
              const dots = getDotsForDay(item.day, item.isCurrentMonth);

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.dayCell}
                  onPress={() => {
                    if (item.isCurrentMonth) {
                      const newDate = new Date(selectedDate);
                      newDate.setDate(item.day);
                      handleDateChange(newDate);
                    }
                  }}
                >
                  {isSelected && <View style={styles.selectedDayCell} />}
                  <NativeText
                    style={[
                      styles.dayText,
                      !item.isCurrentMonth && styles.notCurrentMonthText,
                      isSelected && styles.selectedDayText,
                    ]}
                  >
                    {item.day}
                  </NativeText>
                  <View style={styles.dotContainer}>
                    {dots.map((color, i) => (
                      <View
                        key={i}
                        style={[styles.dot, { backgroundColor: color }]}
                      />
                    ))}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Date Overview Section */}
        <View style={styles.overviewSection}>
          <View style={styles.overviewHeader}>
            <NativeText style={styles.overviewTitle}>
              {formatDayMonth(selectedDate)} Overview
            </NativeText>
            <TouchableOpacity>
              <NativeText style={styles.viewFullList}>
                View Full List →
              </NativeText>
            </TouchableOpacity>
          </View>

          <View style={styles.overviewCard}>
            <NativeText style={styles.totalSpentLabel}>Total Spent</NativeText>
            <NativeText style={styles.totalSpentAmount}>
              PKR {expenseData.totalSpent.toLocaleString()}
            </NativeText>

            <View style={styles.budgetBadge}>
              <NativeText style={styles.budgetIcon}>⚠️</NativeText>
              <NativeText style={styles.budgetText}>
                {expenseData.budgetImpact}
              </NativeText>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <NativeText style={styles.statLabel}>Transactions</NativeText>
                <NativeText style={styles.statValue}>
                  {expenseData.transactions}
                </NativeText>
              </View>

              <View style={styles.statItem}>
                <NativeText style={styles.statLabel}>Budget Impact</NativeText>
                <View style={styles.impactBar}>
                  <View
                    style={[
                      styles.impactFill,
                      { width: `${expenseData.budgetPercentage}%` },
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* AI Insight Section */}
            <View style={styles.insightSection}>
              <View style={styles.insightIconContainer}>
                <NativeText style={styles.robotIcon}>🤖</NativeText>
              </View>
              <NativeText style={styles.insightText}>
                "{expenseData.insight}"
              </NativeText>
            </View>
          </View>
        </View>
        {/* Daily Transactions Section */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <NativeText style={styles.sectionTitle}>
              DAILY TRANSACTIONS
            </NativeText>
            <NativeText style={styles.transactionCount}>
              {expenseData.transactionList.length} items
            </NativeText>
          </View>

          <View style={styles.transactionsList}>
            {expenseData.transactionList.map(item => (
              <View key={item.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={styles.transactionIconContainer}>
                    <NativeText style={styles.transactionIcon}>
                      {item.icon}
                    </NativeText>
                  </View>
                  <View style={styles.transactionTextContent}>
                    <NativeText style={styles.transactionName}>
                      {item.name}
                    </NativeText>
                    <NativeText style={styles.transactionCategory}>
                      {item.category} • {item.time}
                    </NativeText>
                  </View>
                </View>
                <NativeText style={styles.transactionAmount}>
                  -PKR {item.amount.toLocaleString()}
                </NativeText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Calendar Modal */}
      <CalendarModal
        visible={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
    </View>
  );
};

export default Calendar;
