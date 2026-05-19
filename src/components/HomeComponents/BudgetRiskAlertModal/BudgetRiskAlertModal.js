import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NativeText from '../../NativeText/NativeText';
import PrimaryButton from '../../PrimaryButton/PrimaryButton';
import styles from './BudgetRiskAlertModalStyles';

const TREND_CONFIG = {
  dangerous: {
    color: '#FF453A',
    gradient: ['#FF453A', '#FF6B35'],
    label: 'High Risk',
    emoji: '🔴',
  },
  warning: {
    color: '#FF9F0A',
    gradient: ['#FF9F0A', '#FFB340'],
    label: 'Elevated',
    emoji: '🟠',
  },
  safe: {
    color: '#30D158',
    gradient: ['#30D158', '#34C759'],
    label: 'Stable',
    emoji: '🟢',
  },
};

const CATEGORY_ICONS = {
  Food: '🍴',
  Transport: '🚗',
  Shopping: '🛍️',
  Medical: '💊',
  Others: '📦',
};

const MetricCard = ({ icon, label, value }) => (
  <View style={styles.metricCard}>
    <NativeText style={styles.metricIcon}>{icon}</NativeText>
    <NativeText style={styles.metricLabel}>{label}</NativeText>
    <NativeText style={styles.metricValue} numberOfLines={1}>
      {value}
    </NativeText>
  </View>
);

const BudgetRiskAlertModal = ({
  visible,
  analysis,
  onDismiss,
  onSnoozeToday,
}) => {
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
  } = analysis;

  const trendStyle = TREND_CONFIG[trend] || TREND_CONFIG.warning;
  const categoryIcon = CATEGORY_ICONS[highestCategory] || '💸';
  const scoreProgress = Math.min(Math.max(riskScore, 0), 100);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onDismiss} />

        <View style={styles.card}>
          <LinearGradient
            colors={trendStyle.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onDismiss}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityLabel="Close budget alert"
            >
              <NativeText style={styles.closeIcon}>✕</NativeText>
            </TouchableOpacity>

            <View style={styles.headerContent}>
              <View style={styles.alertIconCircle}>
                <NativeText style={styles.alertIcon}>⚠️</NativeText>
              </View>
              <NativeText style={styles.headerTitle}>Budget Alert</NativeText>
              <NativeText style={styles.headerSubtitle}>
                You're on track to exceed this month's budget
              </NativeText>
              <View style={styles.trendPill}>
                <NativeText style={styles.trendPillText}>
                  {trendStyle.emoji} {trendStyle.label}
                </NativeText>
              </View>
            </View>
          </LinearGradient>

          <ScrollView
            style={styles.bodyScroll}
            contentContainerStyle={styles.bodyContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.scoreSection}>
              <View
                style={[
                  styles.scoreRing,
                  {
                    borderColor: trendStyle.color,
                    opacity: 0.35 + scoreProgress / 200,
                  },
                ]}
              >
                <View style={styles.scoreInner}>
                  <NativeText style={[styles.scoreNumber, { color: trendStyle.color }]}>
                    {riskScore}
                  </NativeText>
                  <NativeText style={styles.scoreMax}>/ 100</NativeText>
                </View>
              </View>
              <View style={styles.scoreMeta}>
                <NativeText style={styles.scoreMetaLabel}>AI Risk Score</NativeText>
                <NativeText style={styles.scoreMetaHint}>
                  {confidenceLevel} confidence · Based on your spending pace
                </NativeText>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${scoreProgress}%`,
                        backgroundColor: trendStyle.color,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            <View style={styles.metricsRow}>
              <MetricCard
                icon={categoryIcon}
                label="Top category"
                value={highestCategory}
              />
              <MetricCard
                icon="📊"
                label="Category share"
                value={`${categoryPercentage}%`}
              />
            </View>

            <View style={styles.metricsRow}>
              <MetricCard
                icon="💰"
                label="Remaining"
                value={`${Math.round(remainingBudget).toLocaleString()} PKR`}
              />
              <MetricCard
                icon="🎯"
                label="Confidence"
                value={confidenceLevel}
              />
            </View>

            <View style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <View style={styles.insightBadge}>
                  <NativeText style={styles.insightBadgeText}>AI Insight</NativeText>
                </View>
              </View>
              <NativeText style={styles.insightText}>{predictionMessage}</NativeText>
            </View>

            <View style={styles.tipCard}>
              <NativeText style={styles.tipEmoji}>💡</NativeText>
              <NativeText style={styles.tipText}>
                Try cutting back on{' '}
                <NativeText style={styles.tipHighlight}>{highestCategory}</NativeText>
                {' '}this week to stay within your monthly budget.
              </NativeText>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.footerActions}>
              <PrimaryButton
                title="Got it, thanks"
                onPress={onDismiss}
                containerStyle={styles.primaryButton}
              />
            </View>
            <TouchableOpacity
              style={styles.snoozeButton}
              onPress={onSnoozeToday}
              activeOpacity={0.7}
            >
              <NativeText style={styles.snoozeText}>
                Don't remind me today
              </NativeText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BudgetRiskAlertModal;
