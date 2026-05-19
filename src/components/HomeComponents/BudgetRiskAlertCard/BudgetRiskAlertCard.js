import React from 'react';
import { View } from 'react-native';
import BudgetRiskAlertContent from '../BudgetRiskAlertContent/BudgetRiskAlertContent';
import styles from './BudgetRiskAlertCardStyles';

const BudgetRiskAlertCard = ({ analysis }) => {
  if (!analysis?.isBudgetRisk) {
    return null;
  }

  return (
    <View style={styles.cardWrapper}>
      <BudgetRiskAlertContent analysis={analysis} />
    </View>
  );
};

export default BudgetRiskAlertCard;
