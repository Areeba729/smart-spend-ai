import React from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import {
  APP_NAME,
  APP_SUPPORT_EMAIL,
  PRIVACY_SECURITY_SECTIONS,
} from '../../../libs/constants';
import styles from './style';

const PrivacySecurity = ({ navigation }) => {
  const openSupportEmail = () => {
    Linking.openURL(`mailto:${APP_SUPPORT_EMAIL}?subject=${APP_NAME} Privacy Request`);
  };

  return (
    <View style={styles.container}>
      <SimpleHeader
        title="Privacy & Security"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.intro}>
          Learn how {APP_NAME} protects your financial data and what you can do
          to keep your account secure.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OVERVIEW</Text>
          {PRIVACY_SECURITY_SECTIONS.map(section => (
            <View key={section.title} style={styles.card}>
              <Text style={styles.cardTitle}>{section.title}</Text>
              <Text style={styles.cardBody}>{section.body}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Questions about privacy? Email us at{' '}
            <Text style={styles.link} onPress={openSupportEmail}>
              {APP_SUPPORT_EMAIL}
            </Text>
            .
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacySecurity;
