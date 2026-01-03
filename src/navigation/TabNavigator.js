import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabs from '../components/BottomTabs/BottomTabs';

import Home from '../screens/AuthStack/Home/Home';
import Budget from '../screens/AuthStack/BudgetScreen/BudgetScreen';

import AddExpense from '../screens/AuthStack/AddExpense/AddExpense';
import Report from '../screens/AuthStack/Report/Report';
import ProfileScreen from '../screens/AuthStack/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const tabs = {
    Home,
    Budget,
    AddExpense,
    Report,
    ProfileScreen,
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => (
        <BottomTabs
          activeTab={props.state.routes[props.state.index].name}
          onTabPress={name => {
            props.navigation.navigate(name);
          }}
        />
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      {Object.entries(tabs).map(([name, component]) => (
        <Tab.Screen key={name} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
