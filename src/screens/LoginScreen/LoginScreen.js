import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { images } from '../../assets/images';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Theme } from '../../libs';
import styleGenerator from './style';

const SocialButton = ({ icon, text, onPress, styles }) => (
  <TouchableOpacity style={styles.socialButton} onPress={onPress}>
    <Text style={[styles.socialButtonText, { color: Theme.colors.white }]}>
      {icon} {text}
    </Text>
  </TouchableOpacity>
);

const LoginScreen = ({ navigation }) => {
  const styles = styleGenerator(Theme.colors);

  const handleLogin = values => {
    // Here you can call your API or handle login logic
    // Example: navigate to Home screen after login
    // navigation.replace('Home');
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.black}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={images.Logo} style={styles.logo} />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Master your money with ease</Text>
        </View>

        <LoginForm onSubmit={handleLogin} navigation={navigation} />

        <View style={styles.socialSection}>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            {/* Using text for icons for now as verified assets didn't show apple/google icons */}
            <SocialButton
              text="Apple"
              icon="🍎"
              onPress={() => {}}
              styles={styles}
            />
            <SocialButton
              text="Google"
              icon="G"
              onPress={() => {}}
              styles={styles}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
