import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'auth', 
  storage: AsyncStorage, 
  whitelist: ['auth'], 
};

export default persistConfig;
