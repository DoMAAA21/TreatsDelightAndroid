import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react'; 
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import { GalioProvider, theme } from 'galio-framework';
import AppNavigator from './navigations/AppNavigator';
import { store, persistor } from './store'; 
import { toastConfig } from './toastConfig';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> 
          <GalioProvider theme={theme}>
            <NavigationContainer>
              <AppNavigator />
              <Toast  config={toastConfig}/>
            </NavigationContainer>
            <StatusBar style="auto" />
          </GalioProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
