import { Formik } from 'formik';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import * as Yup from 'yup';
import { SmartSpendAILogo } from '../../components/SmartSpendAILogo/SmartSpendAILogo';
import { DividerWithText } from '../../components/LoginComponents/DividerWithText';
import { PhoneInput } from '../../components/LoginComponents/PhoneInput';
import { SocialLoginButtons } from '../../components/LoginComponents/SocialLoginButtons';
import NativeText from '../../components/NativeText/NativeText';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { useOnboardingStatus } from '../../hooks/useOnboardingStatus';
import { Theme } from '../../libs';
import getStyles from './Style';

// Validation Schema
const loginSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Phone number is required'),
  // .matches(/^[0-9]{10,15}$/, 'login:error_invalid'),
});

export const LoginScreen = ({ navigation, onAppleLogin, onLinkedInLogin }) => {
  const { colors } = Theme;
  const styles = getStyles(colors);

  const [isLoading, setIsLoading] = useState(false);
  const { resetOnboarding } = useOnboardingStatus();

  const submitHandler = async (values, { setSubmitting, setFieldError }) => {
    try {
      console.log(values);
    } catch (error) {
      setFieldError('general', 'Login failed. Please try again.');
      console.log('Login error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <SmartSpendAILogo width={250} height={250} />

        <View style={styles.content}>
          <View style={styles.header}>
            <NativeText style={styles.title}>Welcome Back</NativeText>
            <NativeText style={styles.subtitle}>
              Sign in to continue to your account
            </NativeText>
          </View>

          <SocialLoginButtons
            onApplePress={() => resetOnboarding()}
            onLinkedInPress={onLinkedInLogin}
          />
          <DividerWithText text="Or continue with" />

          <Formik
            initialValues={{ phoneNumber: '' }}
            validationSchema={loginSchema}
            onSubmit={submitHandler}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
              setFieldTouched,
            }) => (
              <View style={styles.form}>
                <PhoneInput
                  value={values.phoneNumber}
                  onChangeText={text => {
                    handleChange('phoneNumber')(text);
                    // Clear error when user types
                    if (errors.phoneNumber) {
                      setFieldTouched('phoneNumber', false);
                    }
                  }}
                  onBlur={() => {
                    handleBlur('phoneNumber');
                    setFieldTouched('phoneNumber', true, true);
                  }}
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  maxLength={15}
                />
                <View style={styles.errorContainer}>
                  {touched.phoneNumber && errors.phoneNumber && (
                    <NativeText style={styles.errorText}>
                      {errors.phoneNumber}
                    </NativeText>
                  )}
                </View>

                {errors.general && (
                  <NativeText style={styles.errorText}>
                    {errors.general}
                  </NativeText>
                )}

                <PrimaryButton
                  disabled={isSubmitting || isLoading}
                  title="Continue"
                  containerStyle={{ marginTop: 24, width: '100%' }}
                  onPress={handleSubmit}
                  loading={isSubmitting || isLoading}
                />
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
