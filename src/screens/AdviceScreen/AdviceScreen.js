import React, { useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import NativeText from '../../components/NativeText/NativeText';
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import { Theme } from '../../libs';
import { scale } from 'react-native-size-matters';

const AdviceScreen = ({ route, navigation }) => {
  const { categories } = route.params;

  const advice = useMemo(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDate = today.getDate();

  return categories.map(category => {
    const remaining = category.remaining || 0;

    // days left in month including today
    const daysLeft = daysInMonth - todayDate + 1;

    const dailyBudget = daysLeft > 0
      ? Math.round(remaining / daysLeft)
      : remaining;

    return {
      title: category.title,
      advice: `You have PKR ${remaining.toLocaleString()} remaining for ${
        category.title
      } this month. To stay on track, you should spend no more than PKR ${dailyBudget.toLocaleString()} per day for the remaining ${daysLeft} days of this month.`,
    };
  });
}, [categories]);

  return (
    <View style={styles.container}>
      <SimpleHeader
        title="Budget Advice"
        showBack
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {advice.map((item, index) => (
          <View key={index} style={styles.adviceCard}>
            <NativeText style={styles.title}>{item.title}</NativeText>
            <NativeText style={styles.advice}>{item.advice}</NativeText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
  },
  scrollContent: {
    padding: 16,
  },
  adviceCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Theme.colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Theme.colors.text,
  },
  advice: {
    fontSize: scale(14),
    color: Theme.colors.text,
  },
});

export default AdviceScreen;
