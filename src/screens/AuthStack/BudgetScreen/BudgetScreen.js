// import React from 'react';
// import { ScrollView, SafeAreaView, View } from 'react-native';
// import { styles } from './style';
// import MonthlyBudgetCard from './components/MonthlyBudgetCard';
// import LimitCard from './components/LimitCard';
// import HealthCard from './components/HealthCard';
// import ActionGrid from './components/ActionGrid';
// import InsightCard from './components/InsightCard';
// import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';

// const BudgetScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <SimpleHeader title="Budget" />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <MonthlyBudgetCard />
//         <LimitCard />
//         <HealthCard />
//         <ActionGrid navigation={navigation} />
//         <InsightCard />
//       </ScrollView>
//     </View>
//   );
// };

// export default BudgetScreen;
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './style';
import MonthlyBudgetCard from './components/MonthlyBudgetCard';
import LimitCard from './components/LimitCard';
import HealthCard from './components/HealthCard';
import ActionGrid from './components/ActionGrid';
import InsightCard from './components/InsightCard';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { aiAssistant } from '../../../utils/aiAssistant';
import { getExpensesFromFirestore } from '../../../hooks/ExpenseFunction';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/userSlice';

const BudgetScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const monthlyBudget = Number(user?.monthlyBudget || 0);

  const [totalSpent, setTotalSpent] = useState(0);
  const [todaySpent, setTodaySpent] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await getExpensesFromFirestore();
      const today = new Date();

      let total = 0;
      let todayTotal = 0;

      expenses.forEach(exp => {
        const amount = Number(exp.amount || 0);
        total += amount;

        const d = new Date(exp.date);
        if (
          d.getDate() === today.getDate() &&
          d.getMonth() === today.getMonth() &&
          d.getFullYear() === today.getFullYear()
        ) {
          todayTotal += amount;
        }
      });

      setTotalSpent(total);
      setTodaySpent(todayTotal);
    };

    fetchExpenses();
  }, []);

  // 🤖 AI uses REAL data
  const aiResult = aiAssistant({
    monthlyBudget,
    totalSpent,
    todaySpent,
  });

  return (
    <View style={styles.container}>
      <SimpleHeader title="Budget" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MonthlyBudgetCard
          monthlyBudget={monthlyBudget}
          totalSpent={totalSpent}
        />

        <LimitCard dailyLimit={aiResult.dailyLimit} />

        {/* <HealthCard
          status={aiResult.health}
          badge={aiResult.badge}
          description={aiResult.healthMessage}
        /> */}

        <ActionGrid navigation={navigation} />

        <InsightCard
          title={aiResult.insightTitle}
          description={aiResult.insightDescription}
        />
      </ScrollView>
    </View>
  );
};

export default BudgetScreen;
