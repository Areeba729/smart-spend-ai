import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { moderateScale } from 'react-native-size-matters';

const CircularProgress = ({ size = 100, strokeWidth = 8, progress = 20 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (circumference * progress) / 100;

  return (
    <View style={styles.wrapper}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#000000"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#93C523"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>

      {/* Center text */}
      <View style={styles.center}>
        <Text style={styles.percent}>{progress}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
  },
  percent: {
    fontSize: moderateScale(20),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  label: {
    fontSize: moderateScale(12),
    color: '#93C523',
    marginTop: 2,
  },
});

export default CircularProgress;
