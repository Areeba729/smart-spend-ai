import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import {
  APP_NAME,
  APP_SUPPORT_EMAIL,
  APP_VERSION,
  HELP_ABOUT_TEXT,
  HELP_FEEDBACK_FAQ,
} from '../../../libs/constants';
import styles from './style';

const HelpAndSupport = ({ navigation }) => {
  const openSupportEmail = (subject) => {
    Linking.openURL(
      `mailto:${APP_SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}`,
    );
  };

  return (
    <View style={styles.container}>
      <SimpleHeader
        title="Help & Feedback"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.intro}>
          Find answers to common questions or reach out to our team with
          feedback and bug reports.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ABOUT</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>{APP_NAME}</Text>
            <Text style={styles.aboutBody}>{HELP_ABOUT_TEXT}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FREQUENTLY ASKED</Text>
          {HELP_FEEDBACK_FAQ.map(item => (
            <View key={item.question} style={styles.faqCard}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.body}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACT US</Text>
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => openSupportEmail(`${APP_NAME} Support`)}
          >
            <Text style={styles.contactLabel}>Contact Support</Text>
            <Text style={styles.contactHint}>
              Billing, account, or general questions
            </Text>
            <Text style={styles.contactValue}>{APP_SUPPORT_EMAIL}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => openSupportEmail(`${APP_NAME} Bug Report`)}
          >
            <Text style={styles.contactLabel}>Report a Bug</Text>
            <Text style={styles.contactHint}>
              Describe what happened and steps to reproduce
            </Text>
            <Text style={styles.contactValue}>Send feedback →</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => openSupportEmail(`${APP_NAME} Feature Request`)}
          >
            <Text style={styles.contactLabel}>Share Feedback</Text>
            <Text style={styles.contactHint}>
              Suggest improvements or new features
            </Text>
            <Text style={styles.contactValue}>Send feedback →</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>
          {APP_NAME} · Version {APP_VERSION}
        </Text>
      </ScrollView>
    </View>
  );
};

export default HelpAndSupport;
