import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabs from '../components/BottomTabs/BottomTabs';
import Profile from '../screens/Profile/Profile';
import Complaints from '../screens/Complaints/Complaints';
import Home from '../screens/AuthStack/Home/Home';
import Budget from '../screens/Profile/Budget';
import Reports from '../screens/Profile/Reports';
import AddExpense from '../screens/AddExpense/AddExpense';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const tabs = {
    Home,
    Budget,
    AddExpense,
    Reports,
    Profile,
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
