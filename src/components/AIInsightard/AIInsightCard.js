// screens/Reports/components/AIInsightCard/AIInsightCard.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

const AIInsightCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI INSIGHT</Text>

      <Text style={styles.message}>
        Is month aap ka kharcha pichlay month se{' '}
        <Text style={styles.highlight}>12% kam</Text> hai.
      </Text>
    </View>
  );
};

export default AIInsightCard;
