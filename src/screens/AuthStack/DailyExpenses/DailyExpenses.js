import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { moderateScale } from 'react-native-size-matters';
import NativeText from '../../../components/NativeText/NativeText';
import { calendarIcon } from '../../../assets/icons';
import { styles } from './style';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';

const DailyExpenses = ({ navigation }) => {
  const dateListRef = React.useRef(null);

  const dates = React.useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const d = new Date(year, month, i + 1);
      return {
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: i + 1,
        month: d.toLocaleString('en-US', { month: 'long' }),
        year: d.getFullYear(),
        fullDate: d.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      };
    });
  }, []);

  const today = new Date().getDate();
  const [selectedDate, setSelectedDate] = useState(today);

  React.useEffect(() => {
    if (dateListRef.current) {
      setTimeout(() => {
        dateListRef.current.scrollToIndex({
          index: today - 1,
          animated: true,
          viewPosition: 0.5,
        });
      }, 500);
    }
  }, [today]);

  const selectedDateInfo =
    dates.find(d => d.date === selectedDate) || dates[today - 1];

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
    {
      id: '6',
      title: 'Amazon Prime',
      amount: '- 1,200',
      time: '11:00 AM',
      category: 'Subscription',
      icon: '📦',
      iconBg: 'rgba(0, 122, 255, 0.15)',
    },
    {
      id: '7',
      title: 'Gym Membership',
      amount: '- 5,000',
      time: '7:00 AM',
      category: 'Health',
      icon: '💪',
      iconBg: 'rgba(52, 199, 89, 0.15)',
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
        <NativeText style={styles.categoryIcon}>{item.icon}</NativeText>
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
    <View style={styles.container}>
      <SimpleHeader
        title="Expense Detail"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.summarySection}>
        <View style={styles.dateRow}>
          <SvgXml
            xml={calendarIcon}
            width={14}
            height={14}
            style={styles.dateIcon}
            color="#A0A0A0"
          />
          <NativeText style={styles.summaryDate}>
            {selectedDateInfo.fullDate}
          </NativeText>
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
          ref={dateListRef}
          data={dates}
          renderItem={renderDateItem}
          keyExtractor={item => item.date.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: moderateScale(65) + moderateScale(12), // width + marginRight from style.js
            offset: (moderateScale(65) + moderateScale(12)) * index,
            index,
          })}
        />
      </View>

      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={item => item.id}
        style={styles.transactionList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default DailyExpenses;
