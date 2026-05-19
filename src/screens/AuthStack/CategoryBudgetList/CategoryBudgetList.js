import React, { useCallback, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import NativeText from '../../../components/NativeText/NativeText';
import AIInsightCard from '../../../components/AIInsightCard/AIInsightCard';
import CategoryBudgetItem from '../../../components/CategoryBudgetItem/CategoryBudgetItem';
import ScreenLoader from '../../../components/ScreenLoader/ScreenLoader';
import { styles } from './style';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { getCategorizedExpensesFromFirestore } from '../../../hooks/ExpenseFunction';

const getCurrentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const getCurrentMonthDateRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return { startDate: start, endDate: end };
};

const isDateInRange = (date, start, end) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const s = new Date(start);
  s.setHours(0, 0, 0, 0);
  const e = new Date(end);
  e.setHours(23, 59, 59, 999);
  return d >= s && d <= e;
};

const CategoryBudgetList = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [insight, setInsight] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCategoryBudgets = useCallback(async () => {
    setLoading(true);
    const firebaseUser = auth().currentUser;
    if (!firebaseUser?.uid) {
      setLoading(false);
      return;
    }

    let budgetAmount = 0;
    let startDate = null;
    let endDate = null;

    try {
      const userDoc = await firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        const currentMonth = getCurrentMonthKey();
        const budgets = userData.budgets || {};

        if (budgets[currentMonth] !== undefined) {
          budgetAmount = Number(budgets[currentMonth]);
        } else if (userData.monthlyBudget) {
          budgetAmount = Number(userData.monthlyBudget);
        }

        startDate = userData.startDate?._seconds
          ? new Date(userData.startDate._seconds * 1000)
          : null;
        endDate = userData.endDate?._seconds
          ? new Date(userData.endDate._seconds * 1000)
          : null;
      }

      setMonthlyBudget(budgetAmount);

      const today = new Date();
      const { startDate: monthStart, endDate: monthEnd } =
        getCurrentMonthDateRange();
      const budgetRange =
        startDate && endDate && isDateInRange(today, startDate, endDate)
          ? { startDate, endDate }
          : { startDate: monthStart, endDate: monthEnd };

      const categorizedExpenses = await getCategorizedExpensesFromFirestore(
        budgetRange,
      );

      const categoryNames = [
        'Food',
        'Transport',
        'Shopping',
        'Medical',
        'Others',
      ];
      const categoryIcons = ['🍴', '✈️', '🛍️', '💊', '📦'];
      const categoryColors = [
        'rgba(255, 149, 0, 0.15)',
        'rgba(0, 122, 255, 0.15)',
        'rgba(255, 45, 85, 0.15)',
        'rgba(88, 86, 214, 0.15)',
        'rgba(142, 142, 147, 0.15)',
      ];

      const currentDate = new Date();
      const budgetDuration = Math.max(
        1,
        Math.ceil(
          (budgetRange.endDate - budgetRange.startDate) / (1000 * 60 * 60 * 24),
        ) + 1,
      );
      const daysPassed = Math.max(
        0,
        Math.ceil(
          (currentDate - budgetRange.startDate) / (1000 * 60 * 60 * 24),
        ),
      );
      const categoryData = categoryNames.map((name, index) => {
        const categoryExpenses = categorizedExpenses[name] || [];
        const spent = categoryExpenses.reduce(
          (sum, expense) => sum + (parseFloat(expense.amount) || 0),
          0,
        );
        const totalLimit =
          budgetAmount > 0
            ? Math.round(budgetAmount / categoryNames.length)
            : 0;
        const percentageUsed =
          totalLimit > 0 ? Math.round((spent / totalLimit) * 100) : 0;
        const expectedUsage = Math.round(
          (totalLimit / budgetDuration) * daysPassed,
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

      const insights = categoryData.map(category => {
        if (!category.isOnTrack) {
          const suggestedReduction = Math.round(
            category.spent - category.expectedUsage,
          );
          return `The budget for ${category.title} is being overused. Reducing it by ${suggestedReduction} would be better to stay on track.`;
        }
        return `The budget for ${category.title} is on track.`;
      });

      setInsight(insights.join(' \n '));
    } catch (error) {
      console.error('Error fetching budget for category list:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCategoryBudgets();
    }, [loadCategoryBudgets]),
  );

  const currentDate = new Date();

  return (
    <View style={styles.container}>
      <SimpleHeader
        title="Category Budget List"
        showBack
        onBackPress={() => navigation.goBack()}
      />
      {loading ? (
        <ScreenLoader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.budgetSummary}>
            <NativeText style={styles.summaryLabel}>
              Total Monthly Budget
            </NativeText>
            <NativeText style={styles.summaryAmount}>
              PKR {monthlyBudget.toLocaleString()}
            </NativeText>
          </View>

          <AIInsightCard
            insightText={insight}
            onButtonPress={() =>
              navigation.navigate('AdviceScreen', {
                categories,
                remainingDays: Math.max(
                  0,
                  Math.ceil(
                    (new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() + 1,
                      0,
                    ) -
                      currentDate) /
                      (1000 * 60 * 60 * 24),
                  ),
                ),
              })
            }
          />

          <View style={styles.sectionHeader}>
            <NativeText style={styles.sectionTitle}>Categories</NativeText>
            <TouchableOpacity>
              {/* <NativeText style={styles.seeAll}>See All</NativeText> */}
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
      )}
    </View>
  );
};

export default CategoryBudgetList;
