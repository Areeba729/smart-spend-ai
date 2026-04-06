// import React from 'react';
// import { View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
// import { styles } from './style';
// import NativeText from '../../../components/NativeText/NativeText';
// import BudgetSlider from '../../../components/BudgetSlider/BudgetSlider';
// import RecommendationCard from '../../../components/RecommendationCard/RecommendationCard';
// import ImpactCard from '../../../components/ImpactCard/ImpactCard';
// import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';

// const EditBudget = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <SimpleHeader
//         title="Edit Budget"
//         showBack
//         onBackPress={() => navigation.goBack()}
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <BudgetSlider />

//         <RecommendationCard
//           onApply={() => console.log('Recommendation applied')}
//         />

//         <View style={styles.sectionHeader}>
//           <NativeText style={styles.sectionTitle}>Projected Impact</NativeText>
//           <View style={styles.badge}>
//             <NativeText style={styles.badgeText}>This Month</NativeText>
//           </View>
//         </View>

//         <View style={styles.impactRow}>
//           <ImpactCard label="CURRENT" amount="142k" fillPercentage={40} />
//           <ImpactCard
//             label="NEW GOAL"
//             amount="150k"
//             isNewGoal
//             fillPercentage={70}
//           />
//         </View>
//       </ScrollView>

//       <View style={styles.footer}>
//         <TouchableOpacity
//           style={styles.updateButton}
//           onPress={() => navigation.goBack()}
//         >
//           <NativeText style={styles.updateButtonText}>Update Budget</NativeText>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default EditBudget;

import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

import { styles } from './style';
import NativeText from '../../../components/NativeText/NativeText';
import BudgetSlider from '../../../components/BudgetSlider/BudgetSlider';
import RecommendationCard from '../../../components/RecommendationCard/RecommendationCard';
import ImpactCard from '../../../components/ImpactCard/ImpactCard';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { selectUser } from '../../../redux/slices/userSlice';

const EditBudget = ({ navigation }) => {
  const user = useSelector(selectUser);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch current budget from Firestore
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        if (userDoc.exists) {
          const data = userDoc.data();
          setMonthlyBudget(Number(data.monthlyBudget) || 0);
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
      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({ monthlyBudget: monthlyBudget.toString() });
      Alert.alert('Success', 'Monthly budget updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating budget:', error);
      Alert.alert('Error', 'Failed to update budget. Please try again.');
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
        </View>
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
