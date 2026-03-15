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
import {
  emailIcon,
  lockIcon,
  profileIcon,
  eyeIcon,
  eyeOffIcon,
  phoneIcon,
  termsAndConditions,
} from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';

const SignupForm = ({ onSubmit, onLoadingChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { signup } = useAuth();

  const dispatch = useDispatch();
  const form = useSmartForm({
    fields: {
      fullName: {
        type: 'personName',
        required: true,
        minLength: 2,
      },

      email: {
        type: 'email',
        required: true,
      },
      phone: {
        type: 'phone',
        required: true,
      },
      monthlyBudget: {
        type: 'number',
        required: true,
        validate: value => parseFloat(value) > 0,
      },
      password: {
        type: 'password',
        required: true,
        minLength: 8,
        maxLength: 10,
      },
      confirmPassword: {
        type: 'password',
        required: true,
        validate: (value, fields) => value === fields.password.value,
      },
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    onLoadingChange?.(true);
    try {
      // 1️⃣ Validate form
      await form.submitForm();

      if (!form.isValid) {
        Toast.show({
          type: 'error',
          text1: 'Form Invalid',
          text2: 'Please fix the errors in the form.',
        });
        return;
      }
      if (!agreeToTerms) {
        Toast.show({
          type: 'error',
          text1: 'Agreement Required',
          text2: 'Please agree to the Terms & Privacy.',
        });
        return;
      }
      // 2️⃣ Signup with validated values
      const userData = await signup(form.values);
      console.log('Redux Login Dispatched:', userData);

      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'Your account has been created successfully 👋',
      });
      dispatch(
        login({
          ...userData,
          isProfileComplete: true,
        }),
      );
    } catch (error) {
      console.log('Signup Error:', error);

      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  };

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        <SmartFormField
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          placeholderTextColor="#666"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          leftIcon={<SvgXml xml={profileIcon} width={20} height={20} />}
          inputContainerStyle={styles.inputContainer}
        />
        {/* <SmartFormField
          name="username"
          label="Username"
          placeholder="Choose a username"
          placeholderTextColor="#666"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          leftIcon={<SvgXml xml={profileIcon} width={20} height={20} />}
          inputContainerStyle={styles.inputContainer}
        /> */}
        <SmartFormField
          name="email"
          label="Email"
          placeholder="Enter your email address"
          placeholderTextColor="#666"
          keyboardType="email-address"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          leftIcon={<SvgXml xml={emailIcon} width={20} height={20} />}
          inputContainerStyle={styles.inputContainer}
        />
        <SmartFormField
          name="phone"
          label="Phone Number"
          placeholder="Enter your phone number"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
          leftIcon={<SvgXml xml={phoneIcon} width={20} height={20} />}
          // No specific phone icon in list, using generic or skipping leftIcon if preferred
        />
        <SmartFormField
          name="monthlyBudget"
          label="Monthly Budget"
          placeholder="Enter your monthly budget"
          placeholderTextColor="#666"
          keyboardType="numeric"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
          leftIcon={<SvgXml xml={termsAndConditions} width={20} height={20} />}
        />
        <SmartFormField
          name="password"
          label="Password"
          placeholder="Create a password"
          placeholderTextColor="#666"
          secureTextEntry={!showPassword}
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          leftIcon={<SvgXml xml={lockIcon} width={20} height={20} />}
          rightIcon={
            <SvgXml
              xml={showPassword ? eyeIcon : eyeOffIcon}
              width={20}
              height={20}
              color="#666"
            />
          }
          onRightIconPress={() => setShowPassword(!showPassword)}
          inputContainerStyle={styles.inputContainer}
        />
        <SmartFormField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter password"
          placeholderTextColor="#666"
          secureTextEntry={!showConfirmPassword}
          // inputContainer={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          leftIcon={<SvgXml xml={lockIcon} width={20} height={20} />}
          rightIcon={
            <SvgXml
              xml={showConfirmPassword ? eyeIcon : eyeOffIcon}
              width={20}
              height={20}
              color="#666"
            />
          }
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          inputContainerStyle={styles.inputContainer}
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            {agreeToTerms && <Text style={styles.checkboxCheckmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            I agree to the{' '}
            <Text style={styles.checkboxLink}>Terms & Privacy</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
};

export default SignupForm;
