import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import NativeText from '../../../components/NativeText/NativeText';
import { calendarIcon, backIcon } from '../../../assets/icons'; // Need to check if backIcon exists
import { styles } from './style';
import { Theme } from '../../../libs';

const DailyExpenses = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(24);

  const dates = [
    { day: 'Mon', date: 23 },
    { day: 'Tue', date: 24 },
    { day: 'Wed', date: 25 },
    { day: 'Thu', date: 26 },
    { day: 'Fri', date: 27 },
  ];

  const transactions = [
    {
      id: '1',
      title: 'Lunch at Haveli',
      amount: '- 2,450',
      time: '1:30 PM',
      category: 'Food',
      icon: '🍴',
      iconBg: 'rgba(255, 149, 0, 0.2)',
    },
    {
      id: '2',
      title: 'Uber Ride',
      amount: '- 650',
      time: '9:15 AM',
      category: 'Transport',
      icon: '🚗',
      iconBg: 'rgba(0, 122, 255, 0.2)',
    },
    {
      id: '3',
      title: 'Grocery Run',
      amount: '- 8,500',
      time: '6:45 PM',
      category: 'Shopping',
      icon: '🛍️',
      iconBg: 'rgba(52, 199, 89, 0.2)',
    },
    {
      id: '4',
      title: 'Internet Bill',
      amount: '- 3,500',
      time: '10:00 AM',
      category: 'Bills',
      icon: '⚡',
      iconBg: 'rgba(88, 86, 214, 0.2)',
    },
    {
      id: '5',
      title: 'Coffee Break',
      amount: '- 850',
      time: '4:20 PM',
      category: 'Snacks',
      icon: '☕',
      iconBg: 'rgba(255, 45, 85, 0.2)',
    },
  ];

  const renderDateItem = ({ item }) => {
    const isActive = selectedDate === item.date;
    return (
      <TouchableOpacity
        onPress={() => setSelectedDate(item.date)}
        style={[styles.dateCard, isActive && styles.activeDateCard]}
      >
        <NativeText style={[styles.dayText, isActive && styles.activeDayText]}>
          {item.day}
        </NativeText>
        <NativeText
          style={[styles.dateNumber, isActive && styles.activeDateNumber]}
        >
          {item.date}
        </NativeText>
      </TouchableOpacity>
    );
  };

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
        <NativeText style={{ fontSize: 24 }}>{item.icon}</NativeText>
      </View>
      <View style={styles.transactionInfo}>
        <NativeText style={styles.transactionTitle}>{item.title}</NativeText>
        <View style={styles.timeRow}>
          <NativeText style={styles.timeText}>🕒 {item.time}</NativeText>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <NativeText style={styles.transactionAmount}>{item.amount}</NativeText>
        <NativeText style={styles.transactionCategory}>
          {item.category}
        </NativeText>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <SvgXml xml={backIcon} width={24} height={24} color="#fff" />
        </TouchableOpacity>
        <NativeText style={styles.headerTitle}>Daily Expenses</NativeText>
        <TouchableOpacity style={styles.iconButton}>
          <SvgXml xml={calendarIcon} width={20} height={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.summarySection}>
        <View style={styles.dateRow}>
          <SvgXml
            xml={calendarIcon}
            width={14}
            height={14}
            style={styles.dateIcon}
            color="#A0A0A0"
          />
          <NativeText style={styles.summaryDate}>October 24, 2023</NativeText>
        </View>
        <View style={styles.amountRow}>
          <NativeText style={styles.pkrLabel}>PKR</NativeText>
          <NativeText style={styles.totalAmount}>12,450</NativeText>
        </View>
        <View style={styles.budgetBadge}>
          <View style={styles.budgetDot} />
          <NativeText style={styles.budgetText}>On Budget</NativeText>
        </View>
      </View>

      <View style={styles.dateSelector}>
        <FlatList
          data={dates}
          renderItem={renderDateItem}
          keyExtractor={item => item.date.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={item => item.id}
        style={styles.transactionList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default DailyExpenses;
