import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { Theme } from '../../libs';
import styleGenerator from './style';
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';
import ScreenLoader from '../../components/ScreenLoader/ScreenLoader';
import { lockIcon, arrowIcons } from '../../assets/icons';
import Toast from 'react-native-toast-message';
import useAuth from '../../hooks/useAuth';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const styles = styleGenerator(Theme.colors);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const handleSendLink = async values => {
    try {
      // ✅ Log start of function
      console.log('handleSendLink called', values.email);

      // 🔥 Call Firebase resetPassword
      await resetPassword(values.email);

      // ✅ Log after successful resetPassword call
      console.log('resetPassword finished');

      Toast.show({
        type: 'success',
        text1: 'Email Sent',
        text2:
          'If an account exists with this email, a reset link has been sent',
      });

      navigation.goBack(); // or LoginScreen
    } catch (error) {
      console.log('Caught error:', error.code, error.message);

      Toast.show({
        type: 'error',
        text1: 'Reset Failed',
        text2:
          error.code === 'auth/invalid-email'
            ? 'Please enter a valid email address'
            : 'Something went wrong. Try again later',
      });
    }
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.black}
      />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <SvgXml
            xml={arrowIcons}
            width="24"
            height="24"
            fill={Theme.colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={localStyles.contentWrap}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.iconContainer}>
              <SvgXml
                xml={lockIcon}
                width="28"
                height="28"
                color={Theme.colors.secondary}
              />
            </View>

            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Don’t worry! It happens. Please enter the email associated with
              your account to reset it.
            </Text>

            <ForgotPasswordForm
              onSubmit={handleSendLink}
              onLoadingChange={setLoading}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Remember password?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {loading && (
          <View style={localStyles.loaderOverlay}>
            <ScreenLoader color={Theme.colors.secondary} />
          </View>
        )}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  contentWrap: {
    flex: 1,
    position: 'relative',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgotPasswordScreen;
