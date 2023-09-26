import { StatusBar } from 'expo-status-bar';
import { GalioProvider, theme } from "galio-framework";
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AppNavigator from './navigations/AppNavigator';
import store from './store';

export default function App() {
  return (
    <>
    
    <Provider store={store}>
      <GalioProvider theme={theme}>
      
        <NavigationContainer>
        
        <AppNavigator />
        <Toast />
        </NavigationContainer>
        
        <StatusBar style="auto" />
      </GalioProvider>
      </Provider>
      
    </>

  );
}
