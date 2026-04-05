// import { useEffect, useState } from 'react';
// import Toast from 'react-native-toast-message';

// import NetInfo from '@react-native-community/netinfo';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

// // import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import InternetModal from './src/components/InternetModal/InternetModal';
// import AppNavigation from './src/navigation';
// import { persistedStore, store } from './src/redux/store';
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// export default function App() {
//   const [isConnectedModal, setIsConnectedModal] = useState(false);
//   const insets = useSafeAreaInsets();

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       if (!state.isConnected) {
//         setIsConnectedModal(true);
//       } else {
//         setIsConnectedModal(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const checkInternet = () => {
//     NetInfo.fetch().then(state => {
//       if (state.isConnected) {
//         setIsConnectedModal(false);
//       } else {
//         setIsConnectedModal(true);
//       }
//     });
//   };

//   return (
//     <SafeAreaView
//       style={{ flex: 1, backgroundColor: '#fff' }}
//       edges={['bottom', 'left', 'right']}
//     >
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistedStore}>
//           <GestureHandlerRootView style={{ flex: 1 }}>
//             {/* <BottomSheetModalProvider> */}
//             <AppNavigation />
//             {/* </BottomSheetModalProvider> */}
//           </GestureHandlerRootView>
//         </PersistGate>
//         {isConnectedModal && (
//           <InternetModal
//             isVisible={isConnectedModal}
//             handleRetry={() => checkInternet()}
//             title={'No Internet Connection'}
//             description={
//               "Oops! We can't load the content until the internet connection is restored."
//             }
//             shortDescription={'Please check your connection.'}
//             btnTxt={'Retry'}
//           />
//         )}
//         <Toast />
//       </Provider>
//     </SafeAreaView>
//   );
// }

import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import NetInfo from '@react-native-community/netinfo';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InternetModal from './src/components/InternetModal/InternetModal';
import AppNavigation from './src/navigation';
import { persistedStore, store } from './src/redux/store';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// 🔥 FCM Imports
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform, PermissionsAndroid } from 'react-native';

export default function App() {
  const [isConnectedModal, setIsConnectedModal] = useState(false);
  const insets = useSafeAreaInsets();

  // 🌐 Internet Check
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setIsConnectedModal(true);
      } else {
        setIsConnectedModal(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsConnectedModal(false);
      } else {
        setIsConnectedModal(true);
      }
    });
  };

  // 🔔 Request Permission
  async function requestUserPermission() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }

    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
    }
  }

  // 🔑 Get FCM Token
  async function getFcmToken() {
    try {
      const token = await messaging().getToken();
      console.log('🔥 FCM Token:', token);

      // 👉 TODO: Save token to Firestore / Backend
    } catch (error) {
      console.log('Token Error:', error);
    }
  }

  // 📩 Notification Handling
  useEffect(() => {
    requestUserPermission();

    // Foreground Notification
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification?.title || 'Notification',
        remoteMessage.notification?.body || '',
      );
    });

    // App opened from background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Opened from background:', remoteMessage);
    });

    // App opened from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Opened from quit state:', remoteMessage);
        }
      });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff' }}
      edges={['bottom', 'left', 'right']}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppNavigation />
          </GestureHandlerRootView>
        </PersistGate>

        {isConnectedModal && (
          <InternetModal
            isVisible={isConnectedModal}
            handleRetry={() => checkInternet()}
            title={'No Internet Connection'}
            description={
              "Oops! We can't load the content until the internet connection is restored."
            }
            shortDescription={'Please check your connection.'}
            btnTxt={'Retry'}
          />
        )}

        <Toast />
      </Provider>
    </SafeAreaView>
  );
}


// jr_live_ENQ1W7IzUCmI7gpFFY22VSmrpfCaoTeo