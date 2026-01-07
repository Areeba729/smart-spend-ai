import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import styles from './style';
import { Theme } from '../../../libs';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';

const HelpAndSupport = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <SimpleHeader title="Help & Support" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <Text style={styles.title}>How can we help you?</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help..."
            placeholderTextColor={Theme.colors.gray}
          />
        </View>

        {/* Contact Options */}
        <View style={styles.contactOptionsContainer}>
          <TouchableOpacity style={styles.contactOptionButton}>
            <Text style={styles.contactOptionText}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactOptionButton}>
            <Text style={styles.contactOptionText}>Report a Bug</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>
              How do I sync my bank account?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Can I export my data to CSV?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>
              How do I change currency to PKR?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Links Section */}
        <View style={styles.linksSection}>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>About App</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpAndSupport;
