import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  useSmartForm,
  FormProvider,
  SmartFormField,
} from 'react-native-fn-forms';
import { Theme } from '../../libs';
import styles from './style';

const ContactForm = ({ onSubmit }) => {
  const form = useSmartForm({
    fields: {
      firstName: {
        type: 'personName',
        required: true,
      },
      lastName: {
        type: 'personName',
        required: true,
      },
      email: {
        type: 'email',
        required: true,
      },
      phone: {
        type: 'phone',
        required: true,
      },
      message: {
        type: 'text',
        required: true,
        minLength: 10,
      },
    },
  });

  const handleSubmit = async () => {
    await form.submitForm();

    if (!form.isValid) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Form',
        text2: 'Please fill in all required fields correctly',
      });
      return;
    }

    if (onSubmit) {
      onSubmit(form.values);
    }

    Toast.show({
      type: 'success',
      text1: 'Message Sent',
      text2: 'Your feedback has been received.',
    });
  };

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        <SmartFormField
          name="firstName"
          label="First Name"
          placeholder="First Name"
          placeholderTextColor="#94A3B8"
          fieldStyle={styles.fieldContainer}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
        />
        <SmartFormField
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          placeholderTextColor="#94A3B8"
          fieldStyle={styles.fieldContainer}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
        />
        <SmartFormField
          name="email"
          label="Email Address"
          placeholder="Email Address"
          placeholderTextColor="#94A3B8"
          fieldStyle={styles.fieldContainer}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <SmartFormField
          name="phone"
          label="Phone"
          placeholder="Phone"
          placeholderTextColor="#94A3B8"
          fieldStyle={styles.fieldContainer}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
          keyboardType="phone-pad"
        />
        <SmartFormField
          name="message"
          label="Send Us A Message"
          placeholder="Your Message"
          placeholderTextColor="#94A3B8"
          fieldStyle={styles.fieldContainer}
          labelStyle={styles.label}
          style={[styles.input, styles.textArea]}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
          multiline={true}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
          <Text style={styles.sendButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
};

export default ContactForm;
