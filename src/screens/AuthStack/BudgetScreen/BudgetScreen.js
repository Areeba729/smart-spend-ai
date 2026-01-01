import React from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';
import { styles } from './style';
import MonthlyBudgetCard from './components/MonthlyBudgetCard';
import LimitCard from './components/LimitCard';
import HealthCard from './components/HealthCard';
import ActionGrid from './components/ActionGrid';
import InsightCard from './components/InsightCard';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';

const BudgetScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SimpleHeader title="Budget" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <MonthlyBudgetCard />
        <LimitCard />
        <HealthCard />
        <ActionGrid navigation={navigation} />
        <InsightCard />
      </ScrollView>
    </View>
  );
};

export default BudgetScreen;
