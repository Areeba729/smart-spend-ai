// BudgetGoalsScreen.js
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';

import styles from './style'; // We'll create this below
import CircularProgress from '../../../components/CircularProgress/CircularProgress';
const BudgetGoalScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1E0A" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget & Goals</Text>
        <TouchableOpacity>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* AI Smart Insight Card */}
        <View style={styles.insightCard}>
          <Text style={styles.insightIcon}>✨</Text>
          <Text style={styles.insightText}>
            Saving 20% of your income is recommended. Based on your current
            income, a target of <Text style={styles.boldText}>PKR 30,000</Text>{' '}
            would be ideal.
          </Text>
        </View>

        {/* Currency Selector */}

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CURRENCY</Text>
          <View style={styles.currencySelector}>
            <Text style={styles.currencyText}>PKR - Pakistani Rupee</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </View>

          <Text style={styles.sectionLabel}>MONTHLY INCOME (OPTIONAL)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="150,000"
              placeholderTextColor="#666"
              defaultValue="150,000"
            />
            <Text style={styles.currencySuffix}>PKR</Text>
          </View>
        </View>
        {/* </View> */}

        {/* Monthly Budget */}
        <View style={styles.section}>
          <View style={styles.budgetHeader}>
            <Text style={styles.budgetIcon}>📊</Text>
            <Text style={styles.sectionLabel}>Monthly Budget</Text>
            <Text style={styles.percentageText}>80% of Income</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputLarge}
              keyboardType="numeric"
              defaultValue="120,000"
            />
            <Text style={styles.currencySuffixLarge}>PKR</Text>
          </View>

          <Text style={styles.utilizationLabel}>Utilization</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.utilizationText}>120k/150k</Text>
        </View>

        {/* Savings Goal */}
        <View style={styles.section}>
          <View style={styles.savingsHeader}>
            <Text style={styles.savingsIcon}>💰</Text>
            <Text style={styles.sectionLabel}>Savings Goal</Text>
            <Text style={styles.targetText}>20% Target</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputLarge}
              keyboardType="numeric"
              defaultValue="30,000"
            />
            <Text style={styles.currencySuffixLarge}>PKR</Text>
          </View>

          <View style={styles.savingsProgressBar}>
            <View style={styles.savingsProgressFill} />
          </View>

          <View style={styles.progressLabels}>
            <Text style={styles.progressLabelLeft}>0%</Text>
            <Text style={styles.progressLabelCenter}>20% (Recommended)</Text>
            <Text style={styles.progressLabelRight}>50%</Text>
          </View>
        </View>

        {/* Savings Rate & Left to Budget */}
        <View style={styles.bottomCards}>
          <View style={styles.smallCard}>
            <CircularProgress progress={20} />
            <Text style={styles.smallCardLabel}>Savings Rate</Text>
          </View>

          <View style={styles.smallCard}>
            <Text style={styles.smallCardValue}>PKR 0</Text>
            <Text style={styles.smallCardLabel}>Left to Budget</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BudgetGoalScreen;
