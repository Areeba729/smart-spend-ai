import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import Onboarding from '../screens/OnboardingScreen/OnboardingScreen';
// import { useOnboardingStatus } from '../hooks/useOnboardingStatus';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import SignupScreen from '../screens/SignupScreen/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import OtpScreen from '../screens/OtpScreen/OtpScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen/ResetPasswordScreen';
import EssentialDetails from '../screens/EssentialDetails/EssentialDetails';
import PrivacyPolicy from '../screens/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '../screens/TermsAndConditions/TermsAndConditions';

function UnAuthStack() {
  const Stack = createNativeStackNavigator();

  // const { isOnboarded } = useOnboardingStatus();

  const screens = {
    LoginScreen,
    OnboardingScreen: Onboarding,
    SplashScreen,
    SignupScreen,
    ForgotPasswordScreen,
    OtpScreen,
    ResetPasswordScreen,
    EssentialDetails,
    PrivacyPolicy,
    TermsAndConditions,
  };

  return (
    <Stack.Navigator
      // initialRouteName={false ? 'LoginScreen' : 'OnboardingScreen'}
      initialRouteName={'SplashScreen'}
      screenOptions={{
        headerShown: false,
        statusBarAnimation: 'fade',
        animation: 'slide_from_bottom',
        orientation: 'default',
        freezeOnBlur: true,
      }}
    >
      {Object.entries(screens).map(([name, component]) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
}

export default UnAuthStack;
