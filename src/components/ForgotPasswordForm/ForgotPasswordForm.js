import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  useSmartForm,
  FormProvider,
  SmartFormField,
} from 'react-native-fn-forms';
import { SvgXml } from 'react-native-svg';
import { styles } from './style';
import { emailIcon } from '../../assets/icons';

const ForgotPasswordForm = ({ onSubmit, onLoadingChange }) => {
  const [loading, setLoading] = useState(false);
  const form = useSmartForm({
    fields: {
      email: {
        type: 'email',
        required: true,
      },
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    onLoadingChange?.(true);
    try {
      await form.submitForm();
      if (form.isValid) {
        await onSubmit(form.values);
      }
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  };

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        <SmartFormField
          name="email"
          label="Email Address"
          placeholder="example@email.com"
          placeholderTextColor="#666"
          keyboardType="email-address"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
          leftIcon={<SvgXml xml={emailIcon} width={20} height={20} />}
        />
        <TouchableOpacity
          style={[styles.submitButton, loading && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
