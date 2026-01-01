import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import NativeText from '../NativeText/NativeText';
import { styles } from './style';

const BudgetSlider = ({ initialValue = 150000, min = 50000, max = 300000 }) => {
  const [value, setValue] = useState(initialValue);

  const handleAdjust = delta => {
    const newValue = Math.min(Math.max(value + delta, min), max);
    setValue(newValue);
  };

  // Mock percentage for slider representation
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <View style={styles.container}>
      <NativeText style={styles.label}>Monthly Limit</NativeText>

      <View style={styles.amountRow}>
        <NativeText style={styles.currency}>PKR</NativeText>
        <NativeText style={styles.amount}>{value.toLocaleString()}</NativeText>
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.track}>
          <View style={[styles.activeTrack, { width: `${percentage}%` }]} />
          <View
            style={[
              styles.thumb,
              { left: `${percentage}%`, transform: [{ translateX: -12 }] },
            ]}
          />
        </View>
      </View>

      <View style={styles.sliderLabels}>
        <NativeText style={styles.limitLabel}>50k</NativeText>
        <NativeText style={styles.limitLabel}>300k</NativeText>
      </View>

      <View style={styles.adjustRow}>
        <TouchableOpacity
          style={styles.adjustButton}
          onPress={() => handleAdjust(-5000)}
        >
          <NativeText style={styles.buttonText}>−</NativeText>
        </TouchableOpacity>

        <NativeText style={styles.adjustText}>ADJUST</NativeText>

        <TouchableOpacity
          style={styles.adjustButton}
          onPress={() => handleAdjust(5000)}
        >
          <NativeText style={styles.buttonText}>+</NativeText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BudgetSlider;
