import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './style';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import CategoryDetailCard from '../../../components/CategoryDetailCard/CategoryDetailCard';
import ActionTile from '../../../components/ActionTile/ActionTile';
import StatCard from '../../../components/StatCard/StatCard';
import CompactTransactionItem from '../../../components/CompactTransactionItem/CompactTransactionItem';
import NativeText from '../../../components/NativeText/NativeText';

const CategoryDetail = ({ navigation, route }) => {
  const { categoryTitle = 'Food & Dining', categoryIcon = '🍔' } =
    route.params || {};

  const transactions = [
    {
      id: '1',
      name: 'KFC - F-11 Branch',
      date: 'Today, 1:30 PM',
      amount: 1200,
      icon: '🍗',
    },
    {
      id: '2',
      name: 'Grocery Mart',
      date: 'Yesterday',
      amount: 4500,
      icon: '🛒',
    },
    { id: '3', name: 'Chai Spot', date: '2 days ago', amount: 450, icon: '☕' },
    {
      id: '4',
      name: 'Savour Foods',
      date: '3 days ago',
      amount: 2100,
      icon: '🍚',
    },
  ];

  return (
    <View style={styles.container}>
      <SimpleHeader
        title={categoryTitle}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CategoryDetailCard
          icon={categoryIcon}
          budgetAmount={50000}
          remainingAmount={12500}
          spentAmount={37500}
          percentageUsed={75}
        />

        <View style={styles.actionRow}>
          <ActionTile icon="📋" label="History" onPress={() => {}} />
          <ActionTile icon="✏️" label="Edit Limit" onPress={() => {}} />
          <ActionTile
            icon="✨"
            label="AI Tips"
            isAI
            hasNotification
            onPress={() => {}}
          />
        </View>

        <View style={styles.statsRow}>
          <StatCard icon="📅" label="Daily Avg" value="PKR 1,250" />
          <StatCard icon="📈" label="Projected" value="PKR 48,000" />
        </View>

        <View style={styles.sectionHeader}>
          <NativeText style={styles.sectionTitle}>Last 7 Days</NativeText>
          <TouchableOpacity>
            <NativeText style={styles.viewAll}>View All</NativeText>
          </TouchableOpacity>
        </View>

        {transactions.map(item => (
          <CompactTransactionItem
            key={item.id}
            icon={item.icon}
            name={item.name}
            date={item.date}
            amount={item.amount}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryDetail;
