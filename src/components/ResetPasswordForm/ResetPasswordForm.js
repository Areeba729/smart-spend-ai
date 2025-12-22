import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  useSmartForm,
  FormProvider,
  SmartFormField,
} from 'react-native-fn-forms';
import { SvgXml } from 'react-native-svg';
import { styles } from './style';
import { lockIcon, eyeIcon, eyeOffIcon } from '../../assets/icons';

const ResetPasswordForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4

  const form = useSmartForm({
    fields: {
      password: {
        type: 'password',
        required: true,
        minLength: 6,
        onChange: value => calculateStrength(value),
      },
      confirmPassword: {
        type: 'password',
        required: true,
        validate: (value, fields) => value === fields.password.value,
      },
    },
  });

  const calculateStrength = pass => {
    let score = 0;
    if (!pass) {
      setPasswordStrength(0);
      return;
    }
    if (pass.length > 5) score += 1;
    if (pass.length > 7) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    setPasswordStrength(score);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return '#EC495D'; // Red
    if (passwordStrength === 2) return '#F2C94C'; // Yellow
    if (passwordStrength >= 3) return '#86AE12'; // Green
    return '#333';
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength === 2) return 'Medium strength';
    return 'Strong';
  };

  const handleSubmit = async () => {
    await form.submitForm();
    if (form.isValid) {
      onSubmit(form.values);
    }
  };

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        <Text style={styles.fieldLabel}>New Password</Text>
        <SmartFormField
          name="password"
          //   label="New Password"
          placeholder="Enter new password"
          placeholderTextColor="#666"
          secureTextEntry={!showPassword}
          fieldStyle={styles.field}
          labelStyle={styles.label}
          inputStyle={styles.input}
          errorStyle={styles.error}
          leftIcon={
            <View style={styles.inputIcon}>
              <SvgXml xml={lockIcon} width={20} height={20} />
            </View>
          }
          rightIcon={
            <SvgXml
              xml={showPassword ? eyeIcon : eyeOffIcon}
              width={20}
              height={20}
              color="#666"
            />
          }
          onRightIconPress={() => setShowPassword(!showPassword)}
          inputContainerStyle={styles.inputContainer}
        />

        {/* Strength Meter */}
        <View style={styles.strengthContainer}>
          <View style={styles.strengthBars}>
            {[1, 2, 3, 4].map(index => (
              <View
                key={index}
                style={[
                  styles.strengthBarItem,
                  {
                    backgroundColor:
                      index <= passwordStrength && passwordStrength > 0
                        ? getStrengthColor()
                        : '#333',
                  },
                ]}
              />
            ))}
          </View>
          <Text style={[styles.strengthLabel, { color: getStrengthColor() }]}>
            {getStrengthLabel()}
          </Text>
        </View>

        <Text style={styles.fieldLabel}>Confirm New Password</Text>
        <SmartFormField
          name="confirmPassword"
          //   label="Confirm New Password"
          placeholder="Re-enter new password"
          placeholderTextColor="#666"
          secureTextEntry={!showConfirmPassword}
          fieldStyle={styles.field}
          labelStyle={styles.label}
          inputStyle={styles.input}
          errorStyle={styles.error}
          leftIcon={
            <View style={styles.inputIcon}>
              <SvgXml xml={lockIcon} width={20} height={20} />
            </View>
          }
          rightIcon={
            <SvgXml
              xml={showConfirmPassword ? eyeIcon : eyeOffIcon}
              width={20}
              height={20}
              color="#666"
            />
          }
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          inputContainerStyle={styles.inputContainer}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Reset Password ➜</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
};

export default ResetPasswordForm;
