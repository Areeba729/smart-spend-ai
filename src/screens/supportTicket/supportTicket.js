import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { wordpressLogo } from '../../assets/icons'; // Assuming I should add this or use placeholder
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import styles from './style';

const SupportScreen = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // WordPress Logo SVG
  const wpLogoSvg = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" stroke="#21759B" stroke-width="4"/>
      <path d="M50 4C24.6 4 4 24.6 4 50s20.6 46 46 46 46-20.6 46-46S75.4 4 50 4zm0 88c-18.4 0-33.9-12.4-38.6-29.2l20.4-56.1C36.8 21.6 43.1 19 50 19c5.1 0 9.8 1.4 13.9 3.8L40.7 87.3C43.7 89 46.7 90 50 90zm29.2-18.8l-15.6-45.2c3.4 3.7 5.4 8.7 5.4 14.1 0 7.4-3.8 12.5-3.8 18.9 0 4.1 2.4 8.1 2.4 8.1l11.6 4.1zm-32.9 4.1L27.5 25.1c4.5-5.2 11.1-8.5 18.5-8.5 2 0 3.9.2 5.7.7L31.1 79.1c-1.5-1.2-3.1-2.5-4.8-3.8zm11 1.4L71.5 35.1c.5 1.5.9 3.1.9 4.9 0 6.1-2 11.5-2 18.2 0 4.7 1.4 8.8 1.4 8.8l5.5 9.8c-10.1 7.2-22.5 7.2-32.6 0z" fill="#21759B"/>
    </svg>
  `;

  // Eye Icon SVG
  const eyeIcon = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#646970" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `;

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Create Support Ticket" showBack={true} />

      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <SvgXml xml={wpLogoSvg} width={100} height={100} />
        </View>

        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <SvgXml xml={eyeIcon} width={20} height={20} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SupportScreen;
