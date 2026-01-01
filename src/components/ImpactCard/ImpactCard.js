import React from 'react';
import { View } from 'react-native';
import NativeText from '../NativeText/NativeText';
import { styles } from './style';

const ImpactCard = ({
  label,
  amount,
  isNewGoal = false,
  fillPercentage = 70,
}) => {
  return (
    <View style={[styles.container, isNewGoal && styles.activeBorder]}>
      {isNewGoal && <View style={styles.dot} />}
      <NativeText style={[styles.label, !isNewGoal && styles.currentLabel]}>
        {label}
      </NativeText>

      <NativeText style={styles.amount}>{amount}</NativeText>

      <View style={styles.barContainer}>
        <View
          style={[
            styles.bar,
            !isNewGoal && styles.currentBar,
            { height: `${fillPercentage}%` },
          ]}
        />
      </View>
    </View>
  );
};

export default ImpactCard;
