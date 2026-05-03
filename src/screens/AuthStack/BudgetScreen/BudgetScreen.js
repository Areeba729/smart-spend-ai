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
import { ScrollView, View, Text, Button } from 'react-native';
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
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';
import BudgetModal from '../../../components/BudgetModal';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const BudgetScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  // const monthlyBudget = Number(user?.monthlyBudget || 0);
  const [monthlyBudget, setMonthlyBudget] = useState(null); // null means not set
  const [totalSpent, setTotalSpent] = useState(0);
  const [todaySpent, setTodaySpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [newBudget, setNewBudget] = useState('');

  useFocusEffect(
    useCallback(() => {
      const fetchUserBudget = async () => {
        setLoading(true);
        try {
          const doc = await firestore().collection('users').doc(user.uid).get();
          if (doc.exists) {
            const data = doc.data();
            // budgets: { '2026-05': 1000, ... }
            const budgets = data.budgets || {};
            const now = new Date();
            const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
            if (budgets[currentMonth] !== undefined) {
              setMonthlyBudget(Number(budgets[currentMonth]));
            } else {
              setMonthlyBudget(null);
            }
          } else {
            setMonthlyBudget(null);
          }
        } catch (error) {
          console.log('Error fetching updated budget:', error);
          setMonthlyBudget(null);
        }
        setLoading(false);
      };
      fetchUserBudget();
    }, [user.uid]),
  );

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
    monthlyBudget: monthlyBudget || 0,
    totalSpent,
    todaySpent,
  });

  // Set budget for current month
  const handleSetBudget = async () => {
    if (!newBudget) return;
    setLoading(true);
    try {
      const docRef = firestore().collection('users').doc(user.uid);
      const doc = await docRef.get();
      let budgets = {};
      if (doc.exists) {
        const data = doc.data();
        budgets = data.budgets || {};
      }
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      budgets[currentMonth] = Number(newBudget);
      await docRef.update({ budgets });
      setMonthlyBudget(Number(newBudget));
      setShowBudgetModal(false);
      setNewBudget('');
    } catch (error) {
      console.log('Error setting budget:', error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <SimpleHeader title="Budget" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : monthlyBudget === null ? (
          <View style={{ alignItems: 'center', marginVertical: 24 }}>
            <Text>No budget set for this month.</Text>
            <PrimaryButton containerStyle={{backgroundColor: '#86AE12'}} title="Set Budget Now" onPress={() => setShowBudgetModal(true)} />
          </View>
        ) : (
          <MonthlyBudgetCard
            monthlyBudget={monthlyBudget}
            totalSpent={totalSpent}
          />
        )}

        {monthlyBudget !== null && <LimitCard dailyLimit={aiResult.dailyLimit} />}

        {/* <HealthCard
          status={aiResult.health}
          badge={aiResult.badge}
          description={aiResult.healthMessage}
        /> */}

        <ActionGrid navigation={navigation} />
        {/* 
        <InsightCard
          title={aiResult.insightTitle}
          description={aiResult.insightDescription}
        /> */}
      </ScrollView>
      <BudgetModal
        visible={showBudgetModal}
        value={newBudget}
        onChange={setNewBudget}
        onSave={handleSetBudget}
        onCancel={() => {
          setShowBudgetModal(false);
          setNewBudget('');
        }}
        loading={loading}
      />
    </View>
  );
};

export default BudgetScreen;
