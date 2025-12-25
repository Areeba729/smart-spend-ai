import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { images } from '../../assets/images';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Theme } from '../../libs';
import styleGenerator from './style';
import { SvgXml } from 'react-native-svg';
import { useDispatch } from 'react-redux';
import { Apple, Google } from '../../assets/icons';
import { login } from '../../redux/slices/userSlice';

const SocialButton = ({ icon, text, onPress, styles }) => (
  <TouchableOpacity style={styles.socialButton} onPress={onPress}>
    <Text style={[styles.socialButtonText, { color: Theme.colors.white }]}>
      {icon} {text}
    </Text>
  </TouchableOpacity>
);

const LoginScreen = ({ navigation }) => {
  const styles = styleGenerator(Theme.colors);
  const dispatch = useDispatch();

  const handleLogin = values => {
    // Simulated user data after successful login
    const userData = {
      ...values,
      id: '123',
      name: 'User',
      isProfileComplete: true,
    };

    dispatch(login(userData));
    // console.log('User logged in:', userData);

    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: 'You have successfully logged in 👋',
    });
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
            <SocialButton
              // text="Google"
              icon={<SvgXml xml={Google} width={20} height={20} />}
              onPress={() => {}}
              styles={styles}
            />
            {Platform.OS === 'ios' && (
              <SocialButton
                // text="Apple"
                icon={<SvgXml xml={Apple} width={20} height={20} />}
                onPress={() => {}}
                styles={styles}
              />
            )}
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
