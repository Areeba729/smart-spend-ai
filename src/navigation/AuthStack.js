import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountDetail from '../screens/Profile/AccountDetail/AccountDetail';
import HelpCenter from '../screens/Profile/HelpCenter/HelpCenter';
import PrivacyPolicy from '../screens/Profile/PrivacyPolicy/PrivacyPolicy';
import RFQManagement from '../screens/RFQManagement/RFQManagement';
import Compare from '../screens/Compare/Compare';
import Filter from '../screens/Filter/Filter';
import Notification from '../screens/Notification/Notification';
import QuoteManager from '../screens/QuoteManager/QuoteManager';
import ImageDetail from '../screens/ImageDetail/ImageDetail';
import CreateRFQ from '../screens/CreateRFQ/CreateRFQ';
import supportTicket from '../screens/supportTicket/supportTicket';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import FavoriteSupplier from '../screens/favouriteSupplier/favouriteSupplier';
import DashboardHome from '../screens/DashboardHome/DashboardHome';
import RFQDashboard from '../screens/RFQDashboard/RFQDashboard';
import QuoteManagementTool from '../screens/QuoteManagementTool/QuoteManagementTool';
import QuoteInbox from '../screens/QuoteInbox/QuoteInbox';
import QuoteMsgInbox from '../screens/QuoteMsgInbox/QuoteMsgInbox';
import QuoteExpandedView from '../screens/QuoteExpandedView/QuoteExpandedView';
import TabNavigator from './TabNavigator';

function AuthStack() {
  const Stack = createNativeStackNavigator();

  const screens = {
    TabNavigator,
    AccountDetail,
    HelpCenter,
    PrivacyPolicy,
    Notification,
    QuoteManager,
    Filter,
    RFQManagement,
    Compare,
    ImageDetail,
    CreateRFQ,
    FavoriteSupplier,
    DashboardHome,
    RFQDashboard,
    QuoteManagementTool,
    QuoteInbox,
    QuoteMsgInbox,
    QuoteExpandedView,
    ProfileScreen,
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
