import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import NetInfo from '@react-native-community/netinfo';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InternetModal from './src/components/InternetModal/InternetModal';
import AppNavigation from './src/navigation';
import { persistedStore, store } from './src/redux/store';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function App() {
  const [isConnectedModal, setIsConnectedModal] = useState(false);
  const insets = useSafeAreaInsets();

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

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff' }}
      edges={['bottom', 'left', 'right']}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {/* <BottomSheetModalProvider> */}
            <AppNavigation />
            {/* </BottomSheetModalProvider> */}
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
