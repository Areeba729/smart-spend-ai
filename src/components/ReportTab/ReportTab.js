// screens/Reports/components/ReportTabs/ReportTabs.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './style';

const tabs = ['Weekly', 'Monthly', 'Yearly'];

const ReportTabs = ({ activeTab, onChange }) => {
  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = activeTab === tab;

        return (
          <TouchableOpacity
            key={tab}
            onPress={() => onChange(tab)}
            style={[styles.tabButton, isActive && styles.activeTab]}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ReportTabs;
