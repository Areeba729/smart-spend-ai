import React from 'react';
import { StyleSheet, View } from 'react-native';
import { OtpInput as OTP } from 'react-native-otp-entry';
import { Theme } from '../../libs';

export default function OtpInput({ onCodeFilled }) {
  return (
    <View style={styles.otpContainer}>
      <OTP
        numberOfDigits={6}
        onTextChange={onCodeFilled}
        theme={{
          containerStyle: styles.otpBoxContainer,
          pinCodeContainerStyle: styles.otpBox,
          pinCodeTextStyle: styles.otpText,
          focusStickStyle: styles.focusStick,
          focusedPinCodeContainerStyle: styles.activeOtpBox,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  otpContainer: {
    marginBottom: 24,
    marginTop: 16,
    width: '100%',
  },
  otpBoxContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#1E1E1E',
  },
  activeOtpBox: {
    borderColor: Theme.colors.secondary,
  },
  otpText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  focusStick: {
    backgroundColor: Theme.colors.secondary,
  },
});
