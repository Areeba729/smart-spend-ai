import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabs from '../components/BottomTabs/BottomTabs';

import supportTicket from '../screens/supportTicket/supportTicket';
import heartFile from '../screens/heartFile/heartFile';
import DashboardHome from '../screens/DashboardHome/DashboardHome';
import RFQDashboard from '../screens/RFQDashboard/RFQDashboard';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const tabs = {
    DashboardHome,
    RFQDashboard,
    supportTicket,
    heartFile,
  };

  return (
    <Tab.Navigator
      initialRouteName="DashboardHome"
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
