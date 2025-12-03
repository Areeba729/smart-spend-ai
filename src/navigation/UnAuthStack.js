import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import Onboarding from '../screens/OnboardingScreen/OnboardingScreen';
import { useOnboardingStatus } from '../hooks/useOnboardingStatus';

function UnAuthStack() {
  const Stack = createNativeStackNavigator();

  const { isOnboarded } = useOnboardingStatus();

  const screens = {
    LoginScreen,
    OnboardingScreen: Onboarding,
  };

  return (
    <Stack.Navigator
      // initialRouteName={false ? 'LoginScreen' : 'OnboardingScreen'}
      initialRouteName={'OnboardingScreen'}
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
