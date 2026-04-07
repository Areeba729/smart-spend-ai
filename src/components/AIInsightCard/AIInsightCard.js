import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import NativeText from '../NativeText/NativeText';
import { starIcon } from '../../assets/icons'; // Using starIcon for sparkle effect
import { styles } from './style';

const AIInsightCard = ({ insightText, onButtonPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <SvgXml xml={starIcon} width={20} height={20} color="#EAB308" />
        </View>
        <NativeText style={styles.labelText}>AI Insight</NativeText>
      </View>
      <NativeText style={styles.insightText}>{insightText}</NativeText>
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <NativeText style={styles.buttonText}>View Advice</NativeText>
        <NativeText style={styles.buttonText}>→</NativeText>
      </TouchableOpacity>
    </View>
  );
};

export default AIInsightCard;
