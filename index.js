/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// 🔥 FCM Import
import messaging from '@react-native-firebase/messaging';

// 🔔 Background Message Handler (MANDATORY)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📩 Background Message:', remoteMessage);
});
const AppWrapper = () => {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
};
AppRegistry.registerComponent(appName, () => AppWrapper);
