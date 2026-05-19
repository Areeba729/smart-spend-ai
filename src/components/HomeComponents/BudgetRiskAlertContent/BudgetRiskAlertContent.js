import React from 'react';
import { View } from 'react-native';
import NativeText from '../../NativeText/NativeText';
import styles from './BudgetRiskAlertContentStyles';

const TREND_COLORS = {
  dangerous: '#FF453A',
  warning: '#FF9F0A',
  safe: '#30D158',
};

const BudgetRiskAlertContent = ({ analysis, compact = false }) => {
  if (!analysis) {
    return null;
  }

  const {
    highestCategory,
    categoryPercentage,
    remainingBudget,
    predictionMessage,
    confidenceLevel,
    trend,
    riskScore,
    isBudgetRisk,
  } = analysis;

  const trendColor = TREND_COLORS[trend] || TREND_COLORS.warning;

  return (
    <View style={[styles.container, compact && styles.containerCompact]}>
      <View style={styles.headerRow}>
        <NativeText style={styles.title}>⚠️ Budget Alert</NativeText>
        {isBudgetRisk && (
          <View style={[styles.badge, { backgroundColor: trendColor }]}>
            <NativeText style={styles.badgeText}>
              {trend.toUpperCase()}
            </NativeText>
          </View>
        )}
      </View>

      <NativeText style={styles.subtitle}>
        You are at risk of exceeding your monthly budget.
      </NativeText>

      <View style={styles.scoreRow}>
        <NativeText style={styles.scoreLabel}>AI Risk Score</NativeText>
        <NativeText style={[styles.scoreValue, { color: trendColor }]}>
          {riskScore}/100
        </NativeText>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <NativeText style={styles.metricLabel}>Top Category</NativeText>
          <NativeText style={styles.metricValue}>{highestCategory}</NativeText>
        </View>
        <View style={styles.metricItem}>
          <NativeText style={styles.metricLabel}>Category Share</NativeText>
          <NativeText style={styles.metricValue}>{categoryPercentage}%</NativeText>
        </View>
        <View style={styles.metricItem}>
          <NativeText style={styles.metricLabel}>Remaining</NativeText>
          <NativeText style={styles.metricValue}>
            {Math.round(remainingBudget).toLocaleString()} PKR
          </NativeText>
        </View>
        <View style={styles.metricItem}>
          <NativeText style={styles.metricLabel}>Confidence</NativeText>
          <NativeText style={styles.metricValue}>{confidenceLevel}</NativeText>
        </View>
      </View>

      <View style={styles.predictionBox}>
        <NativeText style={styles.predictionLabel}>ML Prediction</NativeText>
        <NativeText style={styles.predictionText}>{predictionMessage}</NativeText>
      </View>

      <NativeText style={styles.suggestion}>
        If you reduce spending in {highestCategory}, you can stay within budget.
      </NativeText>
    </View>
  );
};

export default BudgetRiskAlertContent;
