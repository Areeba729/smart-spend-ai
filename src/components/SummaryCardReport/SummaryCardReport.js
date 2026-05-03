// screens/Reports/components/SummaryCard/SummaryCard.js
import React from 'react';
import { View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import styles from './style';
import { expenseSvg, foodSvg } from '../../assets/icons';

// SVGs

const SummaryCard = ({ title, value, subtitle, type }) => {
  const isExpense = type === 'expense';

  const iconXml = isExpense ? expenseSvg : foodSvg;

  return (
    <View style={styles.container}>
      {/* ICON */}
      <View style={styles.svgContainer}>
        <View style={styles.iconWrapper}>
          <SvgXml xml={iconXml} width={20} height={20} />
        </View>

        {/* TITLE */}
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* VALUE */}
      <Text style={[styles.value, isExpense && styles.expenseValue]}>
        {value}
      </Text>

      {/* SUBTITLE */}
      <Text
        style={[
          styles.subtitle,
          isExpense ? styles.expenseSubtitle : styles.categorySubtitle,
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default SummaryCard;
