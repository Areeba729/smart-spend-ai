import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import ContactForm from '../../components/ContactForm/ContactForm';
import styles from './style';

const ContactUs = () => {
  const handleFormSubmit = formData => {
    console.log('Form Submitted:', formData);
    // Add submission logic here (e.g., API call)
  };

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Contact Us" showBack={true} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.descriptionText}>
          Your feedback is valuable to us. If you have any questions, please
          contact us.
        </Text>

        <ContactForm onSubmit={handleFormSubmit} />
      </ScrollView>
    </View>
  );
};

export default ContactUs;
