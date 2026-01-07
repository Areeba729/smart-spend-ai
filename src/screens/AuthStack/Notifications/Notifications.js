import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from './style';
import { Theme } from '../../../libs';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';

const Notifications = () => {
  const [dailyBudgetAlert, setDailyBudgetAlert] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [aiInsights, setAiInsights] = useState(true);
  const [appUpdates, setAppUpdates] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <SimpleHeader title="Notifications" />

      {/* System Notifications Disabled */}
      <View style={styles.systemNotificationBanner}>
        <Text style={styles.bannerText}>System Notifications Disabled</Text>
        <Text style={styles.bannerSubText}>
          Enable in Settings to ensure you receive budget alerts.
        </Text>
        <TouchableOpacity style={styles.openSettingsButton}>
          <Text style={styles.openSettingsText}>Open Settings</Text>
        </TouchableOpacity>
      </View>

      {/* General Alerts */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>GENERAL ALERTS</Text>
        <View style={styles.alertRow}>
          <Text style={styles.alertLabel}>Daily Budget Alert</Text>
          <Switch
            value={dailyBudgetAlert}
            onValueChange={setDailyBudgetAlert}
            trackColor={{
              false: Theme.colors.gray,
              true: Theme.colors.primary,
            }}
            thumbColor={
              dailyBudgetAlert ? Theme.colors.white : Theme.colors.secondary
            }
          />
        </View>
        <View style={styles.alertRow}>
          <Text style={styles.alertLabel}>Alert Time</Text>
          <Text style={styles.alertValue}>09:00 AM</Text>
        </View>
      </View>

      {/* Summaries & Insights */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>SUMMARIES & INSIGHTS</Text>
        <View style={styles.alertRow}>
          <Text style={styles.alertLabel}>Weekly Summary</Text>
          <Switch
            value={weeklySummary}
            onValueChange={setWeeklySummary}
            trackColor={{
              false: Theme.colors.gray,
              true: Theme.colors.primary,
            }}
            thumbColor={
              dailyBudgetAlert ? Theme.colors.white : Theme.colors.secondary
            }
          />
        </View>
        {/* <View style={styles.alertRow}>
          <Text style={styles.alertLabel}>AI Insights</Text>
          <Switch
            value={aiInsights}
            onValueChange={setAiInsights}
            trackColor={{
              false: Theme.colors.gray,
              true: Theme.colors.primary,
            }}
            thumbColor={aiInsights ? Theme.colors.primary : Theme.colors.white}
          />
        </View> */}
      </View>

      {/* System */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>SYSTEM</Text>
        <View style={styles.alertRow}>
          <Text style={styles.alertLabel}>App Updates</Text>
          <Switch
            value={appUpdates}
            onValueChange={setAppUpdates}
            trackColor={{
              false: Theme.colors.gray,
              true: Theme.colors.primary,
            }}
            thumbColor={
              appUpdates ? Theme.colors.white : Theme.colors.secondary
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Notifications;
