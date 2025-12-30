// SignupScreen.js
import React from 'react';
import {
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { images } from '../../assets/images';
import SignupForm from '../../components/SignupForm/SignupForm';
import { Theme } from '../../libs';
import styleGenerator from './style';
import { SvgXml } from 'react-native-svg';
import { useDispatch } from 'react-redux';
import { Apple, Google } from '../../assets/icons';
import { login } from '../../redux/slices/userSlice';

const SocialButton = ({ icon, text, onPress, styles }) => (
  <TouchableOpacity style={styles.socialButton} onPress={onPress}>
    <Text style={[styles.socialButtonText, { color: Theme.colors.white }]}>
      {icon} {text}
    </Text>
  </TouchableOpacity>
);

const SignupScreen = ({ navigation }) => {
  const styles = styleGenerator(Theme.colors);
  const dispatch = useDispatch();

  const handleSignup = formValues => {
    // console.log('Signup Data:', formValues);

    // Simulated user data after successful signup
    const userData = {
      ...formValues,
      id: '124', // Unique ID for signup
      isProfileComplete: false, // Usually profile isn't complete right after basic signup
    };

    dispatch(login(userData));
    // console.log('User signed up and logged in:', userData);

    Toast.show({
      type: 'success',
      text1: 'Account Created',
      text2: 'Your account has been created successfully 👋',
    });
    // Navigate to next screen
    // navigation.navigate('Home');
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.black}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image source={images.Logo} style={styles.logo} />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Track your spending, save more.</Text>
          </View>
        </View>

        <SignupForm onSubmit={handleSignup} />

        <View style={styles.socialSection}>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR SIGN UP WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <SocialButton
              // text="Google"
              icon={<SvgXml xml={Google} width={20} height={20} />}
              onPress={() => {}}
              styles={styles}
            />
            {Platform.OS === 'ios' && (
              <SocialButton
                // text="Apple"
                icon={<SvgXml xml={Apple} width={20} height={20} />}
                onPress={() => {}}
                styles={styles}
              />
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignupScreen;
