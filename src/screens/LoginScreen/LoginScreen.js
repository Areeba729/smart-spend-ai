import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { images } from '../../assets/images';
import LoginForm from '../../components/LoginForm/LoginForm';
import ScreenLoader from '../../components/ScreenLoader/ScreenLoader';
import { Theme } from '../../libs';
import styleGenerator from './Style';
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

const LoginScreen = ({ navigation }) => {
  const styles = styleGenerator(Theme.colors);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { loginUser } = useAuth();

  // const handleLogin = values => {
  //   // Simulated user data after successful login
  //   const userData = {
  //     ...values,
  //     id: '123',
  //     name: 'User',
  //     isProfileComplete: true,
  //   };

  //   dispatch(login(userData));
  //   // console.log('User logged in:', userData);

  //   Toast.show({
  //     type: 'success',
  //     text1: 'Login Successful',
  //     text2: 'You have successfully logged in 👋',
  //   });
  //   // navigation.replace('Home');
  // };

  const handleLogin = async values => {
    try {
      const userData = await loginUser(values); // 🔥 Firebase login

      dispatch(login({ ...userData, isProfileComplete: true })); // ✅ Redux update

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'You have successfully logged in 👋',
      });

      // navigation handled by RootNavigator (recommended)
      // navigation.replace('Home');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message || 'Invalid email or password',
      });
    }
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.black}
      />
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={images.logo} style={styles.logo} />
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Master your money with ease</Text>
      </View>

      <View style={localStyles.contentWrap}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <LoginForm
            onSubmit={handleLogin}
            navigation={navigation}
            onLoadingChange={setLoading}
          />

          <View style={styles.socialSection}>
            {/* <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View> */}

            {/* <View style={styles.socialButtons}>
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
            </View> */}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupScreen')}
            >
              <Text style={styles.signupText}>Sign Up</Text>
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

export default LoginScreen;
