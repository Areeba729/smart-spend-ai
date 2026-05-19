import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import Toast from 'react-native-toast-message';
import BudgetSlider from '../../../components/BudgetSlider/BudgetSlider';
import NativeText from '../../../components/NativeText/NativeText';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { selectUser } from '../../../redux/slices/userSlice';
import { styles } from './style';

const EditBudget = ({ navigation }) => {
  const user = useSelector(selectUser);
  console.log('User in EditBudget:', user);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch current month's budget from Firestore
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        if (userDoc.exists) {
          const data = userDoc.data();
          const budgets = data.budgets || {};
          const now = new Date();
          const currentMonth = `${now.getFullYear()}-${String(
            now.getMonth() + 1,
          ).padStart(2, '0')}`;
          setMonthlyBudget(Number(budgets[currentMonth]) || 0);
        }
      } catch (error) {
        console.error('Error fetching user budget:', error);
      }
    };
    fetchBudget();
  }, [user.uid]);

  const handleUpdateBudget = async () => {
    if (monthlyBudget <= 0) {
      Alert.alert('Invalid Budget', 'Please set a budget greater than 0.');
      return;
    }

    setIsUpdating(true);

    try {
      const docRef = firestore().collection('users').doc(user.uid);
      const doc = await docRef.get();
      let budgets = {};
      if (doc.exists) {
        const data = doc.data();
        budgets = data.budgets || {};
      }
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(
        now.getMonth() + 1,
      ).padStart(2, '0')}`;
      budgets[currentMonth] = Number(monthlyBudget);
      await docRef.update({ budgets });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Budget updated successfully!',
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error updating budget:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update budget',
      });
    } finally {
      setIsUpdating(false);
    }
  };

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
        {/* Budget Slider */}
        <BudgetSlider
          value={monthlyBudget}
          onValueChange={setMonthlyBudget}
          min={1000}
          max={100000}
          step={500}
        />

        {/* <RecommendationCard
          onApply={() => console.log('Recommendation applied')}
        /> */}

        {/* <View style={styles.sectionHeader}>
          <NativeText style={styles.sectionTitle}>Projected Impact</NativeText>
          <View style={styles.badge}>
            <NativeText style={styles.badgeText}>This Month</NativeText>
          </View>
        </View> */}

        {/* <View style={styles.impactRow}>
          <ImpactCard
            label="CURRENT"
            amount={`${monthlyBudget}`}
            fillPercentage={40}
          />
          <ImpactCard
            label="NEW GOAL"
            amount={`${monthlyBudget}`}
            isNewGoal
            fillPercentage={70}
          />
        </View> */}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateBudget}
          disabled={isUpdating}
        >
          <NativeText style={styles.updateButtonText}>
            {isUpdating ? 'Updating...' : 'Update Budget'}
          </NativeText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditBudget;
