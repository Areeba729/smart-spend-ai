import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  useSmartForm,
  FormProvider,
  SmartFormField,
} from 'react-native-fn-forms';
import { styles } from './style';
import { SvgXml } from 'react-native-svg';
import { eyeIcon, eyeOffIcon } from '../../assets/icons';
import { Theme } from '../../libs';
import { useNavigation } from '@react-navigation/native';

const SignupForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();
  const form = useSmartForm({
    fields: {
      fullName: {
        type: 'personName',
        required: true,
        minLength: 2,
      },
      lastName: {
        type: 'personName',
        required: true,
        minLength: 2,
      },
      email: {
        type: 'email',
        required: true,
      },
      password: {
        type: 'password',
        required: true,
        minLength: 6,
      },
      confirmPassword: {
        type: 'password',
        required: true,
        validate: (value, fields) =>
          value === fields.password.value || 'Passwords do not match',
      },
    },
  });

  const handleSubmit = async () => {
    await form.submitForm();

    if (!form.isValid) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Form',
        text2: 'Please fix the errors',
      });
      return;
    }

    onSubmit(form.values);
    navigation.navigate('EssentialDetails', { userData: form.values });
  };

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        <SmartFormField
          name="fullName"
          label="Full Name"
          placeholder="Enter full name"
          placeholderTextColor={Theme.colors.grey}
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
        />

        <SmartFormField
          name="lastName"
          label="Last Name"
          placeholder="Enter last name"
          placeholderTextColor={Theme.colors.grey}
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
        />

        <SmartFormField
          name="email"
          label="Email"
          placeholder="Enter email"
          keyboardType="email-address"
          placeholderTextColor={Theme.colors.grey}
          autoCapitalize="none"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
        />

        <SmartFormField
          name="password"
          label="Password"
          placeholder="Create password"
          placeholderTextColor={Theme.colors.grey}
          secureTextEntry={!showPassword}
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          rightIcon={
            <SvgXml xml={showPassword ? eyeIcon : eyeOffIcon} width={20} />
          }
          onRightIconPress={() => setShowPassword(!showPassword)}
          inputContainerStyle={styles.inputContainer}
        />

        <SmartFormField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter password"
          placeholderTextColor={Theme.colors.grey}
          secureTextEntry={!showConfirmPassword}
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          rightIcon={
            <SvgXml
              xml={showConfirmPassword ? eyeIcon : eyeOffIcon}
              width={20}
            />
          }
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          inputContainerStyle={styles.inputContainer}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
          <Text style={styles.signupButtonText}>Sign Up And Continue</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </FormProvider>
  );
};

export default SignupForm;
