import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { styles } from './style';
import OtpInput from '../OtpInput/OtpInput';
import { clockIcon } from '../../assets/icons'; // Using clockIcon as timer icon

const OtpForm = ({ onSubmit, onResend }) => {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(59);

  // Simple timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleVerify = () => {
    if (code.length === 6) {
      onSubmit(code);
    } else {
      // Handle incomplete code or show error
      console.log('Code incomplete');
    }
  };

  const handleResend = () => {
    setTimeLeft(59);
    onResend && onResend();
  };

  return (
    <View style={styles.container}>
      <OtpInput onCodeFilled={code => setCode(code)} />

      <View style={styles.timerContainer}>
        <Text style={styles.resendText}>
          Didn’t receive code?{' '}
          <Text style={styles.resendLink} onPress={handleResend}>
            Resend Code
          </Text>
        </Text>

        {timeLeft > 0 && (
          <View style={styles.timerPill}>
            <SvgXml
              xml={clockIcon}
              width="14"
              height="14"
              color="#86AE12"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.timerText}>
              Resend in 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleVerify}
        disabled={code.length !== 6} // Optional: disable if not filled
      >
        <Text style={styles.verifyButtonText}>Verify Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpForm;
