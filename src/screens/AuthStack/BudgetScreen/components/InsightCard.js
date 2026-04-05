import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import NativeText from '../../../../components/NativeText/NativeText';
import { styles } from '../style';

const InsightCard = ({ title, description }) => {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <NativeText style={styles.sectionTitle}>AI Insight</NativeText>
      </View>

      <View style={[styles.card, styles.insightCard]}>
        <View style={styles.insightImageWrapper}>
          <NativeText style={styles.largeIcon}>🤖</NativeText>
        </View>
        <View style={styles.insightContent}>
          <NativeText style={styles.insightTitle}>{title}</NativeText>
          <NativeText style={styles.insightDescription}>
            {description}
          </NativeText>
        </View>
      </View>
    </View>
  );
};

export default InsightCard;
