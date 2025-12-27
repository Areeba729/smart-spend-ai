import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import { Theme } from '../../libs';
import getStyles from './style';

const TermsAndConditions = () => {
  const { colors } = Theme;
  const styles = getStyles(colors);

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Terms And Conditions" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentArea}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lastUpdated}>Last Updated on 5/7/2024</Text>

        <Text style={styles.policyText}>
          NOTICE: Please read the terms and conditions set forth below, which
          are legally binding. By visiting, viewing or using this website and/or
          by using any program, product, course or service from us, you agree to
          be bound by these Terms and Conditions and our Privacy Policy and
          Disclaimer.
        </Text>

        <Text style={styles.policyText}>
          PLEASE READ THE SECTIONS TITLED “BINDING ARBITRATION” AND “CLASS
          ACTION WAIVER” AS THEY AFFECT YOUR LEGAL RIGHTS.
        </Text>

        <Text style={styles.policyText}>
          SupplyQuoteGT, https://supplyquotegt.com (“website”), which is
          operated by Building Supply Network LLC (“Company”, “we”, “us”, or
          “our”) provides visitors information on the website subject to the
          following terms and conditions (“Terms and Conditions”). The term
          “you” refers to any visitor, viewer or user of the website and/or any
          user of any free or paid program, product, course or service of the
          Company (each, a “Product”).
        </Text>

        <Text style={styles.policyText}>
          By viewing, visiting or using the website and/or a Product, you
          indicate your acceptance and agreement to be bound by these Terms and
          Conditions and our Privacy Policy and Disclaimer, which are hereby
          incorporated by reference (collectively, this “Agreement”). If you do
          not accept the terms and conditions of this Agreement, then please do
          not use the website or any Products. These Terms and Conditions were
          created with the help of the Plug and Law and Privacy Policy
          Solutions.
        </Text>

        <Text style={styles.policyText}>
          We reserve the right to amend this Agreement at any time without
          notice to you. We will alert you to any changes by posting the
          effective date of the latest version at the top of this page, at which
          point any changes will become immediately effective. It is your
          responsibility to check for updates, as your continued use of the
          website or any Products after this Agreement is amended will
          constitute your acceptance and agreement to continue to be bound by
          this Agreement, as amended.
        </Text>

        {/* Add more terms sections as needed */}
      </ScrollView>
    </View>
  );
};

export default TermsAndConditions;
