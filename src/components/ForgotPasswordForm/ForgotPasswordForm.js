import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  useSmartForm,
  FormProvider,
  SmartFormField,
} from 'react-native-fn-forms';
import { SvgXml } from 'react-native-svg';
import { styles } from './style';
import { emailIcon } from '../../assets/icons';

const ForgotPasswordForm = ({ onSubmit }) => {
  const form = useSmartForm({
    fields: {
      email: {
        type: 'email',
        required: true,
      },
    },
  });

  const handleSubmit = async () => {
    await form.submitForm();
    if (form.isValid) {
      onSubmit(form.values);
    } else {
      // Alert.alert('Error', 'Please fix the errors in the form.');
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
          // leftIcon={<SvgXml xml={emailIcon} width={20} height={20} />}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
