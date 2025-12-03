import { useEffect, useState } from 'react';

import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InternetModal from './src/components/InternetModal/InternetModal';
import UnAuthStack from './src/navigation/UnAuthStack';
import { persistedStore, store } from './src/redux/store';

export default function App() {
  const [isConnectedModal, setIsConnectedModal] = useState(false);

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* <BottomSheetModalProvider> */}
          <NavigationContainer>
            <UnAuthStack />
          </NavigationContainer>
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
    </Provider>
  );
}
