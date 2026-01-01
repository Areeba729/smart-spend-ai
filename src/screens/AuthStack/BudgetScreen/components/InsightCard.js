import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import NativeText from '../../../../components/NativeText/NativeText';
import { styles } from '../style';

const InsightCard = () => {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <NativeText style={styles.sectionTitle}>Today's Insight</NativeText>
        <TouchableOpacity>
          <NativeText style={styles.seeReports}>See Reports</NativeText>
        </TouchableOpacity>
      </View>
      <View style={[styles.card, styles.insightCard]}>
        <View style={styles.insightImageWrapper}>
          <NativeText style={styles.largeIcon}>📈</NativeText>
        </View>
        <View style={styles.insightContent}>
          <NativeText style={styles.insightTitle}>Spending Pattern</NativeText>
          <NativeText style={styles.insightDescription}>
            Your spending is 12% lower than last Tuesday. Keep it up!
          </NativeText>
        </View>
      </View>
    </View>
  );
};

export default InsightCard;
