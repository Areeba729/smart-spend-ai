import React from 'react';
import { StyleSheet, View } from 'react-native';
import { OtpInput as OTP } from 'react-native-otp-entry';

export default function OtpInput({ onCodeFilled }) {
  return (
    <View style={styles.otpContainer}>
      <OTP
        numberOfDigits={6}
        onTextChange={onCodeFilled}
        theme={{
          containerStyle: styles.otpBoxContainer,
          pinCodeContainerStyle: styles.otpBox,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 16,
  },
  otpBoxContainer: {
    borderWidth: 0,
    marginHorizontal: 2,
  },
  otpBox: {
    width: 50,
    height: 65,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 24,
    color: '#000',
  },
});
