import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import {
  useSmartForm,
  FormProvider,
  SmartFormField,
} from 'react-native-fn-forms';
import { styles } from './style';
import { SvgXml } from 'react-native-svg';
import {
  closeIcon,
  emailIcon,
  eyeIcon,
  eyeOffIcon,
  lockIcon,
} from '../../assets/icons';

const LoginForm = ({ onSubmit, navigation }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const form = useSmartForm({
    fields: {
      email: {
        type: 'email',
        required: true,
      },
      password: {
        type: 'password',
        required: true,
        minLength: 6,
      },
    },
  });

  const handleSubmit = async () => {
    await form.submitForm();
    if (form.isValid) {
      onSubmit(form.values);
    } else {
      // Alert.alert('Error', 'Please fix the errors in the form.');
    }
  };

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        <SmartFormField
          name="email"
          label="Email Address"
          placeholder="you@example.com"
          placeholderTextColor="#666"
          keyboardType="email-address"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          inputContainerStyle={styles.inputContainer}
          leftIcon={<SvgXml xml={emailIcon} />}
        />
        <SmartFormField
          name="password"
          label="Password"
          placeholder="Enter your password"
          placeholderTextColor="#666"
          secureTextEntry={!showPassword}
          fieldStyle={styles.field}
          labelStyle={styles.label}
          style={styles.input}
          errorStyle={styles.error}
          leftIcon={<SvgXml xml={lockIcon} />}
          inputContainerStyle={styles.inputContainer}
          rightIcon={
            <SvgXml
              xml={showPassword ? eyeIcon : eyeOffIcon}
              size={20}
              color="#666"
            />
          }
          onRightIconPress={() => setShowPassword(!showPassword)}
        />

        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Login ➜</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
};

export default LoginForm;
