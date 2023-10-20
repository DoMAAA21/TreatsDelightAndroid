import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import { GalioProvider, theme } from 'galio-framework';
import AppNavigator from './navigations/AppNavigator';
import { store, persistor } from './store'; // Import store and persistor

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> 
          <GalioProvider theme={theme}>
            <NavigationContainer>
              <AppNavigator />
              <Toast />
            </NavigationContainer>
            <StatusBar style="auto" />
          </GalioProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
