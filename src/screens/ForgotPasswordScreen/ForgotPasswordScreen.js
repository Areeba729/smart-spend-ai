import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { Theme } from '../../libs';
import styleGenerator from './style';
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';
import { lockIcon, arrowIcons } from '../../assets/icons';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const styles = styleGenerator(Theme.colors);

  const handleSendLink = values => {
    // Logic to send reset link
    console.log('Sending reset link to:', values.email);
    navigation.navigate('OtpScreen', { email: values.email });
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.black}
      />
      {/* <ScrollView contentContainerStyle={styles.container}> */}
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

      <View style={styles.contentContainer}>
        {/* Top Icon Placeholder */}
        {/* <View style={styles.iconContainer}>
            <SvgXml
              xml={lockIcon}
              width="28"
              height="28"
              color={Theme.colors.secondary}
            />
          </View> */}

        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Lost your password please enter your email address. You wil receive a
          link to create a new password email.
        </Text>

        {/* Form Component */}
        <ForgotPasswordForm onSubmit={handleSendLink} />
      </View>

      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>Remember password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </View> */}
      {/* </ScrollView> */}
    </View>
  );
};

export default ForgotPasswordScreen;
