import { combineReducers } from '@reduxjs/toolkit';
import allUsersReducer from './user/allUsersSlice';
import newUserReducer from './user/newUserSlice';
import userReducer from './user/userSlice';
import userDetailsReducer from './user/userDetailsSlice';
import allStoresReducer from './store/allStoresSlice';
import newStoreReducer from './store/newStoreSlice';
import storeReducer from './store/storeSlice';
import storeDetailsReducer from './store/storeDetailsSlice';
import authenticationReducer from './auth/authenticationSlice';
// import storeDashboardSlice from './storeDashboard/storeDashboardSlice';
import allProductsReducer from './product/allProductsSlice';
import newProductReducer from './product/newProductSlice';

const rootReducer = combineReducers({
  allUsers: allUsersReducer,
  newUser: newUserReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  allStores: allStoresReducer,
  newStore: newStoreReducer,
  store: storeReducer,
  storeDetails: storeDetailsReducer,
  auth: authenticationReducer,
  allProducts : allProductsReducer,
  newProduct : newProductReducer
});

export default rootReducer