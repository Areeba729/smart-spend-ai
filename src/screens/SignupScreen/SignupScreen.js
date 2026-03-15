// SignupScreen.js
import React, { useState } from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { images } from '../../assets/images';
import SignupForm from '../../components/SignupForm/SignupForm';
import ScreenLoader from '../../components/ScreenLoader/ScreenLoader';
import { Theme } from '../../libs';
import styleGenerator from './style';
import { SvgXml } from 'react-native-svg';
import { useDispatch } from 'react-redux';
import { Apple, Google } from '../../assets/icons';
import { login } from '../../redux/slices/userSlice';
import useAuth from '../../hooks/useAuth';
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
  const { signup } = useAuth();

  // const handleSignup = formValues => {
  //   // console.log('Signup Data:', formValues);

  //   // Simulated user data after successful signup
  //   const userData = {
  //     ...formValues,
  //     id: '124', // Unique ID for signup
  //     isProfileComplete: false,
  //   };
  //   console.log(userData);
  //   dispatch(login(userData));
  //   // console.log('User signed up and logged in:', userData);

  //   Toast.show({
  //     type: 'success',
  //     text1: 'Account Created',
  //     text2: 'Your account has been created successfully 👋',
  //   });
  //   // Navigate to next screen
  //   // navigation.navigate('Home');
  // };

  const handleSignup = async formValues => {
    try {
      const userData = await signup(formValues);

      dispatch(login(userData));

      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'Your account has been created successfully 👋',
      });

      // navigation.replace('Home');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error.message || 'Something went wrong',
      });
    }
  };
  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.black}
      />
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={images.logo} style={styles.logo} />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Track your spending, save more.</Text>
        </View>
      </View>

      <View style={localStyles.contentWrap}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={120}
          keyboardShouldPersistTaps="handled"
        >
          <SignupForm onSubmit={handleSignup} onLoadingChange={setLoading} />

          <View style={styles.socialSection}>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR SIGN UP WITH</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <SocialButton
                icon={<SvgXml xml={Google} width={20} height={20} />}
                onPress={() => {}}
                styles={styles}
              />
              {Platform.OS === 'ios' && (
                <SocialButton
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

export default SignupScreen;
