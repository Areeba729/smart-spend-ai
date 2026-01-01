import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import NativeText from '../../../../components/NativeText/NativeText';
import { calendarIcon } from '../../../../assets/icons';
import { styles } from '../style';

const BudgetHeader = () => {
  const currentMonth = new Date().toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <NativeText style={styles.title}>Budget</NativeText>
        <NativeText style={styles.monthText}>{currentMonth}</NativeText>
      </View>
      <TouchableOpacity style={styles.calendarButton}>
        <SvgXml xml={calendarIcon} width={20} height={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default BudgetHeader;
