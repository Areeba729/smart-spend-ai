import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  useSmartForm,
  FormProvider,
  SmartFormField,
} from 'react-native-fn-forms';
import styles from './style';

const CreateRFQForm = ({ onSubmit }) => {
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
      contactTitle: {
        type: 'text',
        required: true,
      },
      email: {
        type: 'email',
        required: true,
      },
      phone: {
        type: 'phone',
        required: false,
      },
      projectName: {
        type: 'text',
        required: true,
      },
      companyName: {
        type: 'text',
        required: true,
      },
      siteLocation: {
        type: 'text',
        required: true,
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
  };

  const renderLabel = (text, isRequired) => (
    <Text style={styles.label}>
      {text}
      {isRequired && <Text style={styles.requiredAsterisk}>*</Text>}
    </Text>
  );

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        <SmartFormField
          name="firstName"
          label={renderLabel('First Name', true)}
          placeholder="[firstname]"
          placeholderTextColor="#94A3B8"
          fieldStyle={styles.fieldContainer}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
        />
        <SmartFormField
          name="lastName"
          label={renderLabel('Last Name', true)}
          placeholder="[lastname]"
          placeholderTextColor="#94A3B8"
          fieldStyle={styles.fieldContainer}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
        />
        <SmartFormField
          name="contactTitle"
          label={renderLabel('Contact Title/Position', true)}
          placeholder="Contact Title/Position"
          placeholderTextColor="#94A3B8"
          fieldStyle={styles.fieldContainer}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
        />
        <SmartFormField
          name="email"
          label={renderLabel('Contact Email Address', true)}
          placeholder="[email]"
          placeholderTextColor="#94A3B8"
          fieldStyle={styles.fieldContainer}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <SmartFormField
          name="phone"
          label={renderLabel('Contact Phone Number', false)}
          placeholder="[phoneNo]"
          placeholderTextColor="#94A3B8"
          fieldStyle={styles.fieldContainer}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
          keyboardType="phone-pad"
        />
        <SmartFormField
          name="projectName"
          label={renderLabel('Project Name', true)}
          placeholder="Project Name"
          placeholderTextColor="#94A3B8"
          fieldStyle={styles.fieldContainer}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
        />
        <SmartFormField
          name="companyName"
          label={renderLabel('Company Name', true)}
          placeholder="[companyname]"
          placeholderTextColor="#94A3B8"
          fieldStyle={styles.fieldContainer}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
        />
        <SmartFormField
          name="siteLocation"
          label={renderLabel('Site Location', true)}
          placeholder="Site Location"
          placeholderTextColor="#94A3B8"
          fieldStyle={styles.fieldContainer}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create RFQ</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
};

export default CreateRFQForm;
