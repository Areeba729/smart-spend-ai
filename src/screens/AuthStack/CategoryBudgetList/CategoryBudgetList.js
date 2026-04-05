import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import NativeText from '../../../components/NativeText/NativeText';
import AIInsightCard from '../../../components/AIInsightCard/AIInsightCard';
import CategoryBudgetItem from '../../../components/CategoryBudgetItem/CategoryBudgetItem';
import { plusIcon } from '../../../assets/icons';
import { styles } from './style';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/userSlice';
import { getCategorizedExpensesFromFirestore } from '../../../hooks/ExpenseFunction';

const CategoryBudgetList = ({ navigation }) => {
  const user = useSelector(selectUser);
  const [categories, setCategories] = useState([]);
  const [insight, setInsight] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      const categorizedExpenses = await getCategorizedExpensesFromFirestore();

      const categoryNames = ['Food', 'Transport', 'Shopping', 'Medical'];
      const categoryIcons = ['🍴', '✈️', '🛍️', '💊'];
      const categoryColors = [
        'rgba(255, 149, 0, 0.15)',
        'rgba(0, 122, 255, 0.15)',
        'rgba(255, 45, 85, 0.15)',
        'rgba(88, 86, 214, 0.15)',
      ];

      const monthlyBudget = user?.monthlyBudget || 0;
      const currentDate = new Date();
      const budgetStartDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        4,
      ); // Budget starts on 4th January
      const daysPassed = Math.max(
        0,
        Math.ceil((currentDate - budgetStartDate) / (1000 * 60 * 60 * 24)),
      );
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
      ).getDate();
      const remainingDays = daysInMonth - currentDate.getDate();

      const categoryData = categoryNames.map((name, index) => {
        const categoryExpenses = categorizedExpenses[name] || [];
        const spent = categoryExpenses.reduce(
          (sum, expense) => sum + parseFloat(expense.amount),
          0,
        );
        const totalLimit = Math.round(monthlyBudget / categoryNames.length);
        const percentageUsed = Math.round((spent / totalLimit) * 100);
        const expectedUsage = Math.round(
          (totalLimit / daysInMonth) * daysPassed,
        );
        const isOnTrack = spent <= expectedUsage;
        const remaining = totalLimit - spent;

        return {
          id: `${index + 1}`,
          title: name,
          icon: categoryIcons[index],
          iconBg: categoryColors[index],
          spent,
          totalLimit,
          percentageUsed,
          expectedUsage,
          isOnTrack,
          remaining,
        };
      });

      setCategories(categoryData);

      // Generate insights for all categories
      const insights = categoryData.map(category => {
        if (!category.isOnTrack) {
          const suggestedReduction = Math.round(
            ((category.spent - category.expectedUsage) / remainingDays) *
              remainingDays,
          );
          return `The budget for ${category.title} is being overused. Reducing it by ${suggestedReduction} would be better to stay on track.`;
        }
        return `The budget for ${category.title} is on track.`;
      });

      setInsight(insights.join(' \n '));
    };

    fetchExpenses();
  }, [user]);

  const currentDate = new Date(); // Ensure currentDate is defined outside useEffect

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
        <View style={styles.budgetSummary}>
          <NativeText style={styles.summaryLabel}>
            Total Monthly Budget
          </NativeText>
          <NativeText style={styles.summaryAmount}>
            PKR {user?.monthlyBudget?.toLocaleString() || 0}
          </NativeText>
        </View>

        <AIInsightCard
          insightText={insight}
          onButtonPress={() =>
            navigation.navigate('AdviceScreen', {
              categories,
              remainingDays:
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  0,
                ).getDate() - currentDate.getDate(),
            })
          }
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
