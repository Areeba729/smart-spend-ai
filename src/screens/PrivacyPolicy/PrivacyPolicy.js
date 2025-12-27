import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import { Theme } from '../../libs';
import getStyles from './style';

const PrivacyPolicy = () => {
  const { colors } = Theme;
  const styles = getStyles(colors);

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Privacy Policy" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentArea}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lastUpdated}>Last Updated on 5/7/2024</Text>

        <Text style={styles.policyText}>
          NOTICE: Please read the Privacy Policy set forth below carefully, as
          it is designed to provide important information on how and why we
          collect, use, store and share your personal information. It also
          outlines the rights you can exercise regarding your personal
          information and how you can contact us if you have any questions or
          complaints.
        </Text>

        <Text style={styles.policyText}>
          The Privacy Policy set forth below is legally binding. By visiting,
          viewing or using this website and/or by using any program, product,
          course or service from us, you agree to be bound by this Privacy
          Policy.
        </Text>

        <Text style={styles.policyText}>
          Your privacy is important to SupplyQuoteGT, https://supplyquotegt.com
          (“website”), which is operated by Builder Supply Network LLC.
          (“Company”, “we”, “us”, or “our”).
        </Text>

        <Text style={styles.policyText}>
          We use the term “personal information” to refer to data we collect
          that may, directly or indirectly, identify, describe, relate to or be
          associated with you. This privacy policy (“Privacy Policy”) applies to
          personal information we collect when you interact with us through
          different means, including by visiting and using our website. The term
          “you” refers to any visitor, viewer or user of the website and/or any
          user of any Product. Please note that we cannot control the privacy
          practices of websites and services that we do not own.
        </Text>

        <Text style={styles.policyText}>
          Please read the entire Privacy Policy before you visit or use the
          website or perform any Actions (as defined below). By visiting the
          website or performing any Actions (as defined below), you consent to
          the terms of this Privacy Policy. This Privacy Policy was created with
          the help of Plug and Law and Privacy Policy Solutions.
        </Text>

        <Text style={styles.sectionTitle}>
          INFORMATION WE COLLECT AND HOW WE COLLECT IT
        </Text>

        <Text style={styles.policyText}>
          The following describes the categories of personal information we
          collect and how we collect such information.
        </Text>

        {/* Add more policy sections as needed */}
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;
