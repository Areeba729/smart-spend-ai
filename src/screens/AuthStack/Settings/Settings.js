import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import Toggle from '../../../components/Toggle/Toggle';
import styles from './style';
const Settings = ({ navigation }) => {
  const [darkMode, setDarkMode] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);

  return (
    <View style={styles.container}>
      <SimpleHeader title="Settings" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* GENERAL Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GENERAL</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.icon}>💰</Text>
            <Text style={styles.label}>Currency</Text>
            <View style={styles.rightContent}>
              <Text style={styles.value}>PKR</Text>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.icon}>🌐</Text>
            <Text style={styles.label}>Language</Text>
            <View style={styles.rightContent}>
              <Text style={styles.value}>English</Text>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>

          <Toggle
            label="Dark Mode"
            value={darkMode}
            onValueChange={setDarkMode}
            icon="🌙"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>

          <Toggle
            label="Push Notifications"
            value={pushNotifications}
            onValueChange={setPushNotifications}
            icon="🔔"
          />

          {/* <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.icon}>📊</Text>
            <Text style={styles.label}>Daily AI Insight</Text>
            <View style={styles.rightContent}>
              <Text style={styles.value}>09:00 PM</Text>
              <Text style={styles.arrow}>›</Text>
            </View>
            <Text style={styles.subtitle}>Scheduled analysis</Text>
          </TouchableOpacity> */}
        </View>

        {/* SECURITY & SUPPORT Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SECURITY & SUPPORT</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.icon}>🔒</Text>
            <Text style={styles.label}>Privacy & Security</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.icon}>💬</Text>
            <Text style={styles.label}>Help & Feedback</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
