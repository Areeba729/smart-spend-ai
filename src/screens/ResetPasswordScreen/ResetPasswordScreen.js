import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Theme } from '../../libs';
import styleGenerator from './style';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import { arrowIcons, clockIcon } from '../../assets/icons'; // Using clockIcon as placeholder for refresh icon if needed, or lockIcon

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const styles = styleGenerator(Theme.colors);

  const handleResetPassword = values => {
    console.log('Resetting password:', values.password);
    // Navigate to Login or Success screen
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.black}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={20}
        showsVerticalScrollIndicator={false}
      >
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
          {/* Top Icon Placeholder (using resize/refresh look alike) */}
          <View style={styles.iconContainer}>
            {/* Using clockIcon as it has a circular arrow shape similar to refresh/history */}
            <SvgXml xml={clockIcon} width="28" height="28" color="#86AE12" />
          </View>

          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Create a new password that is safe and easy to remember.
          </Text>

          {/* Form Component */}
          <ResetPasswordForm onSubmit={handleResetPassword} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ResetPasswordScreen;
