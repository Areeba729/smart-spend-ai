import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import Calendar from '../screens/Calendar/Calendar';
import DailyExpenses from '../screens/AuthStack/DailyExpenses/DailyExpenses';
import CategoryBudgetList from '../screens/AuthStack/CategoryBudgetList/CategoryBudgetList';
import CategoryDetail from '../screens/AuthStack/CategoryDetail/CategoryDetail';
import EditBudget from '../screens/AuthStack/EditBudget/EditBudget';
import AddEvents from '../screens/AuthStack/AddEvents/AddEvents';
function AuthStack() {
  const Stack = createNativeStackNavigator();

  const screens = {
    TabNavigator,
    Calendar,
    DailyExpenses,
    CategoryBudgetList,
    CategoryDetail,
    EditBudget,
    AddEvents,
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
