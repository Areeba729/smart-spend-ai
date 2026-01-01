import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import NativeText from '../../../components/NativeText/NativeText';
import AIInsightCard from '../../../components/AIInsightCard/AIInsightCard';
import CategoryBudgetItem from '../../../components/CategoryBudgetItem/CategoryBudgetItem';
import { plusIcon } from '../../../assets/icons';
import { styles } from './style';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';

const CategoryBudgetList = ({ navigation }) => {
  const categories = [
    {
      id: '1',
      title: 'Food & Dining',
      icon: '🍴',
      iconBg: 'rgba(255, 149, 0, 0.15)',
      spent: 12000,
      totalLimit: 20000,
    },
    {
      id: '2',
      title: 'Travel',
      icon: '✈️',
      iconBg: 'rgba(0, 122, 255, 0.15)',
      spent: 2000,
      totalLimit: 15000,
    },
    {
      id: '3',
      title: 'Shopping',
      icon: '🛍️',
      iconBg: 'rgba(255, 45, 85, 0.15)',
      spent: 45000,
      totalLimit: 40000,
    },
    {
      id: '4',
      title: 'Utilities',
      icon: '⚡',
      iconBg: 'rgba(52, 199, 89, 0.15)',
      spent: 9000,
      totalLimit: 20000,
    },
  ];

  return (
    <View style={styles.container}>
      <SimpleHeader
        title="Category Budget List"
        showBack
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* <View style={styles.header}>
          <NativeText style={styles.screenTitle}>My Budgets</NativeText>
          <TouchableOpacity style={styles.addButton}>
            <SvgXml xml={plusIcon} width={20} height={20} color="#fff" />
          </TouchableOpacity>
        </View> */}

        <View style={styles.budgetSummary}>
          <NativeText style={styles.summaryLabel}>
            Total Monthly Budget
          </NativeText>
          <NativeText style={styles.summaryAmount}>PKR 150,000</NativeText>
        </View>

        <AIInsightCard
          insightText="Food budget thora high hai, 5% kam karna behtar hoga."
          onButtonPress={() => console.log('Advice pressed')}
        />

        <View style={styles.sectionHeader}>
          <NativeText style={styles.sectionTitle}>Categories</NativeText>
          <TouchableOpacity>
            <NativeText style={styles.seeAll}>See All</NativeText>
          </TouchableOpacity>
        </View>

        {categories.map(item => (
          <CategoryBudgetItem
            key={item.id}
            title={item.title}
            icon={item.icon}
            iconBg={item.iconBg}
            spent={item.spent}
            totalLimit={item.totalLimit}
            onEditPress={() => console.log('Edit pressed', item.title)}
            onPress={() =>
              navigation.navigate('CategoryDetail', {
                categoryTitle: item.title,
                categoryIcon: item.icon,
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryBudgetList;
