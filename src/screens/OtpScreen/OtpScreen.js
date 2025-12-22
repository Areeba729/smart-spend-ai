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
import OtpForm from '../../components/OtpForm/OtpForm';
import { arrowIcons } from '../../assets/icons';

const OtpScreen = () => {
  const navigation = useNavigation();
  const styles = styleGenerator(Theme.colors);

  // Example data - get this from route params or context in real app
  const email = 'ex***@gmail.com';

  const handleVerify = code => {
    console.log('Verifying code:', code);
    navigation.navigate('ResetPasswordScreen');
  };

  const handleResend = () => {
    console.log('Resending code...');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.black}
      />
      <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>
            Please enter the 6-digit code sent to your email address{' '}
            <Text style={styles.emailHighlight}>{email}</Text>.
          </Text>

          {/* Form Component */}
          <OtpForm onSubmit={handleVerify} onResend={handleResend} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Wrong email?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.changeLink}>Change it</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtpScreen;
