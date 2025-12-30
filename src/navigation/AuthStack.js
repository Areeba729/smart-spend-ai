import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import Calendar from '../screens/Calendar/Calendar';
import DailyExpenses from '../screens/AuthStack/DailyExpenses/DailyExpenses';

function AuthStack() {
  const Stack = createNativeStackNavigator();

  const screens = {
    TabNavigator,
    Calendar,
    DailyExpenses,
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
