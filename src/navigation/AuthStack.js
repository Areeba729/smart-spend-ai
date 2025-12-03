import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountDetail from '../screens/Profile/AccountDetail/AccountDetail';
import HelpCenter from '../screens/Profile/HelpCenter/HelpCenter';
import PrivacyPolicy from '../screens/Profile/PrivacyPolicy/PrivacyPolicy';
import TabNavigator from './TabNavigator';

function AuthStack() {
  const Stack = createNativeStackNavigator();

  const screens = {
    TabNavigator,
    AccountDetail,
    HelpCenter,
    PrivacyPolicy,
  };

  return (
    <Stack.Navigator
      initialRouteName="TabNavigator"
      screenOptions={{
        headerShown: false,
        statusBarAnimation: 'fade',
        animation: 'slide_from_right',
        orientation: 'default',
      }}
    >
      {Object.entries(screens).map(([name, component]) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
}

export default AuthStack;
