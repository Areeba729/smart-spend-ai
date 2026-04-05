import React from 'react';
import { View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { styles } from './style';
import NativeText from '../../../components/NativeText/NativeText';
import BudgetSlider from '../../../components/BudgetSlider/BudgetSlider';
import RecommendationCard from '../../../components/RecommendationCard/RecommendationCard';
import ImpactCard from '../../../components/ImpactCard/ImpactCard';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';

const EditBudget = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SimpleHeader
        title="Edit Budget"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <BudgetSlider />

        <RecommendationCard
          onApply={() => console.log('Recommendation applied')}
        />

        <View style={styles.sectionHeader}>
          <NativeText style={styles.sectionTitle}>Projected Impact</NativeText>
          <View style={styles.badge}>
            <NativeText style={styles.badgeText}>This Month</NativeText>
          </View>
        </View>

        <View style={styles.impactRow}>
          <ImpactCard label="CURRENT" amount="142k" fillPercentage={40} />
          <ImpactCard
            label="NEW GOAL"
            amount="150k"
            isNewGoal
            fillPercentage={70}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.goBack()}
        >
          <NativeText style={styles.updateButtonText}>Update Budget</NativeText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditBudget;
